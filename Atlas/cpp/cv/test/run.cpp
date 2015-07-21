#include <cv_atlas.h>
#include <cv_tool.h>
#include <opencv2/opencv.hpp>
#include <uv.h>
#include <stdio.h>

using namespace cv;

static fakeCameraConfig fakeCamConfig = {
    fakeCameraConfig_interval,
    fakeCameraConfig_imgFile,
    fakeCameraConfig_width,
    fakeCameraConfig_height
};

static cameraConfig camConfig = {
    cameraConfig_interval,
    cameraConfig_camId,
    cameraConfig_width,
    cameraConfig_height
};

static faceDetectConfig fdConfig = {
    faceDetectConfig_imgWidth,
    faceDetectConfig_imgHeight,
    faceDetectConfig_faceWidth,
    faceDetectConfig_faceHeight
};

static img2Base64Config i2bConfig = {
    img2Base64Config_imgType,
    img2Base64Config_quality,
    img2Base64Config_maxWidth,
    img2Base64Config_maxHeight
};

void fakeCaptured(unsigned long matHandle)
{
    Mat *mat = (Mat*)matHandle;
    //imshow("fakeCamera", *mat);
    faceDetectOnData(matHandle);
}

void captured(unsigned long matHandle)
{
    Mat *mat = (Mat*) matHandle;
    //imshow("camera", *mat);
    faceDetectOnData(matHandle);
}

void fdNum(int num) 
{
    printf("found %d faces\n", num);
}

void fdImg(unsigned long matHandle)
{
    Mat *mat = (Mat*)matHandle;
    //imshow("faces", *mat);
    img2Base64OnData(matHandle);
}

void fdAll(int num, unsigned long matHandle) 
{
}

void getBase64(char *base64)
{
    printf("%s\n", base64);
}

int main( int argc, char** argv )
{
    //namedWindow("camera");
    //namedWindow("fakeCamera");
    //namedWindow("faces");

    fakeCameraInit(fakeCamConfig, fakeCaptured);
    //cameraInit(camConfig, captured);
    faceDetectInit(fdConfig, fdNum, fdImg, fdAll);
    img2Base64Init(i2bConfig, getBase64);
 
    uv_loop_t *loop = (uv_loop_t*)uv_default_loop();
    uv_run(loop, UV_RUN_DEFAULT);  
 
}
