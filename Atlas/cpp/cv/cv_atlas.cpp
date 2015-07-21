#include <iostream>
#include <stdlib.h>
#include <unistd.h>
#include <opencv2/opencv.hpp>
#include <vector>
#include <string>
#include <b64/cencode.h>
#include <uv.h>
#include "cv_atlas.h"

#include <map>

using namespace std;
using namespace cv;

#define FACE_CASCADE "haarcascade_frontalface_alt.xml"

struct context{
    cameraConfig config;
    VideoCapture *cap;
    uv_timer_t   timer;
    cameraCb     capCb;
};

map<int, context*> id2context;

/************************************************
 Camera
 ************************************************/

void *camLoop = NULL;

//VideoCapture cap;
Mat frame;
CascadeClassifier faceCascade;

void run_uv_timer(uv_timer_t *req)
{
    context *ctx = (context*)(req->data);

    (*(ctx->cap)) >> frame;
    
    (ctx->capCb)((unsigned long)&frame);

    //waitKey(1);
}

int cameraInit(cameraConfig config, cameraCb cb)
{   
    struct context *ctx = new struct context;

    if(id2context.find(config.camId) != id2context.end()) {
        CV_PRINT("has already initialized camera %d\n", config.camId);
        return ERR_SINGLE_INSTANCE;
    }
    // init camera
    VideoCapture *cap = new VideoCapture();
    cap->open(config.camId);
    
    if(!cap->isOpened()) {
        CV_PRINT("can not init camera %d\n", config.camId);
        return ERR_NO_CAMERA;
    }
    
    
    cap->set(CAP_PROP_FRAME_WIDTH,  config.width);
    cap->set(CAP_PROP_FRAME_HEIGHT, config.height);
    
    CV_PRINT("initialized camera %d with res %d x %d\n", config.camId, config.width, config.height);
    
    // Initialize uv loop and timer
    
    if(camLoop == NULL) {
        camLoop = uv_default_loop();
    }
    
    uv_timer_init((uv_loop_t*)camLoop, &(ctx->timer));
    ctx->timer.data = (void*)ctx;

    ctx->cap    = cap;
    ctx->config = config;
    ctx->capCb  = cb;

    id2context[config.camId] = ctx;

    uv_timer_start(&(ctx->timer), run_uv_timer, 0, config.interval);
    CV_PRINT("start timer with interval %d ms\n", config.interval);

    return ERR_NONE;
}

int cameraRelease(cameraConfig config)
{
    CV_PRINT("turn off camera(%d)\n", config.camId);
    if(id2context.find(config.camId) == id2context.end()) {
        CV_PRINT("camera %d has been released, stop here\n", config.camId);
        return ERR_NONE;
    }

    context *ctx = id2context[config.camId];

    ctx->cap->release();
    uv_timer_stop(&(ctx->timer));
    
    delete(ctx);
    id2context.erase(config.camId);

    return ERR_NONE;
}

int cameraOnData(cameraConfig config, int toggle)
{
    printf("onData with camID: %d\n", config.camId); 
    context *ctx = id2context[config.camId];

    if(toggle) {
        if(!(ctx->cap->isOpened())) {
            cameraInit(config, NULL);
        }
    } else {
        if(ctx->cap->isOpened()) {
            cameraRelease(config);
        }
    }
    
    return ERR_NONE;
}

/************************************************
 Face Detection
 ************************************************/

static faceDetectNumCb  fdNumCb;
static faceDetectImgCb  fdImgCb;
static faceDetectAllCb  fdAllCb;

static faceDetectConfig fdConfig;

Mat fdImg;
bool fdInit = true;

int faceDetectInit(faceDetectConfig config, faceDetectNumCb ncb, faceDetectImgCb icb, faceDetectAllCb acb)
{
    if(!fdInit) {
        CV_PRINT("Error, only single faceDetect is allowed\n");        
        return ERR_SINGLE_INSTANCE;
    }

    fdInit = !fdInit;

    if(!faceCascade.load(FACE_CASCADE)) {
        CV_PRINT("can not find face cascade file: %s\n", FACE_CASCADE);
        return ERR_NO_FACE_CASCADE;
    }
    
    fdNumCb = ncb;
    fdImgCb = icb;
    fdAllCb = acb;
    
    fdConfig = config;
    
    CV_PRINT("initialized face detection with face size %d x %d\n", config.faceWidth, config.faceHeight);
    
    return ERR_NONE;
}

int faceDetectOnData(faceDetectConfig config, unsigned long imgHandle)
{
    Mat *mat = (Mat*)imgHandle;
    
    Mat gray;
    
    fdImg = mat->clone();

    resize(*mat, fdImg, Size(fdConfig.imgWidth, fdConfig.imgHeight));
    cvtColor(fdImg, gray, COLOR_BGR2GRAY);
    equalizeHist(gray, gray);
    
    std::vector<Rect> faces;
    faces.clear();
    
    faceCascade.detectMultiScale(gray, faces,
                                 1.1,
                                 2, 0|CASCADE_SCALE_IMAGE,
                                 Size(fdConfig.faceWidth, fdConfig.faceHeight));
    
    for(int i = 0; i < faces.size(); i++) {
        rectangle(fdImg, faces[i], Scalar(0, 255, 0));
    }
    
    fdNumCb(faces.size());
    fdImgCb((unsigned long) &fdImg);
    fdAllCb(faces.size(), (unsigned long) &fdImg);
    
    return ERR_NONE;
}

int faceDetectRelease()
{
    fdInit = true;
    return ERR_NONE;
}

/************************************************
 Img 2 Base64
 ************************************************/
img2Base64Cb i2bcb;
img2Base64Config i2bConfig;

bool i2bInit = true;
int img2Base64Init(img2Base64Config config,img2Base64Cb cb)
{
    if(!i2bInit) {
        CV_PRINT("Error, only single img2base64 is allowed\n");
        return ERR_SINGLE_INSTANCE;
    }

    i2bInit = !i2bInit;
    i2bcb = cb;
    i2bConfig = config;
    
    return ERR_NONE;
}

int img2Base64OnData(img2Base64Config config, unsigned long imgHandle)
{
    Mat src = *(Mat*)imgHandle;
    
    if(src.cols > i2bConfig.maxWidth || src.rows > i2bConfig.maxHeight)
        return ERR_OVER_SIZE;
    
    
    vector<uchar> buffer;
    vector<int> param;
    
    string str = ".";
    str += i2bConfig.imgType;
    
    if(str == ".jpg") {
        param.push_back(IMWRITE_JPEG_QUALITY);
        param.push_back(70);//default(95) 0-100
        imencode(str.c_str(), src, buffer, param);
    } else {
        imencode(str.c_str(), src, buffer);
    }
    int bufferLen = buffer.size();
    
    uchar *bufferStr = (uchar*) malloc(bufferLen * 2);
    
    copy(buffer.begin(), buffer.end(), bufferStr);
    bufferStr[bufferLen] = '\0';
    
    base64_encodestate es;
    base64_init_encodestate(&es);

    char *headFmt = "data:image/%s;base64,";
    char *str64 = (char*) malloc(bufferLen * 2 + strlen(headFmt) + strlen(i2bConfig.imgType) + 1);
    char *p = str64;
    
    p += sprintf(p, headFmt, i2bConfig.imgType);
    p += base64_encode_block((char*)bufferStr, bufferLen, p, &es);
    p += base64_encode_blockend(p, &es);
    *p = '\0';
    
    i2bcb(str64);
    
    free(str64);
    free(bufferStr);
    
    return ERR_NONE;
}

int img2Base64Release(img2Base64Config config)
{
    i2bInit = true;
    return ERR_NONE;   
}
