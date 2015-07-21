#include <iostream>
#include <stdlib.h>
#include <unistd.h>
#include <opencv2/opencv.hpp>
#include <vector>
#include <string>
#include <b64/cencode.h>
#include <uv.h>

#include "cv_tool.h"

using namespace std;
using namespace cv;

/************************************************
 Fake Camera
 ************************************************/

void *fakeCamLoop = NULL;
uv_timer_t fakeCamTimer;

Mat fakeCamFrame;

static fakeCameraCb fakeCamCb = NULL;
static fakeCameraConfig fakeCamConfig;

void fake_cam_run_uv_timer(uv_timer_t *req)
{
    fakeCamCb((unsigned long)&fakeCamFrame);
    
    //waitKey(1);
}


int fakeCameraInit(fakeCameraConfig config, fakeCameraCb cb)
{
    if(cb != NULL)
        fakeCamCb = cb;
    
    fakeCamConfig = config;
    
    Mat img = imread(config.imgFile);
    
    if(img.empty()) {
        CV_PRINT("Can not initial fake camera with %s\n", config.imgFile);
        return ERR_UNKOWN;
    }
    
    resize(img, fakeCamFrame, Size(config.width, config.height));
    
    CV_PRINT("fake camera (%s) of res(%d x %d)\n", config.imgFile, config.width, config.height);
    
    // Initialize uv loop and timer
    uv_timer_stop(&fakeCamTimer);
    
    if(fakeCamLoop == NULL) {
        fakeCamLoop = uv_default_loop();
    }
    
    uv_timer_init((uv_loop_t*)fakeCamLoop, &fakeCamTimer);
    fakeCamTimer.data = NULL;
    uv_timer_start(&fakeCamTimer, fake_cam_run_uv_timer, 0, config.interval);
    CV_PRINT("start timer with interval %d ms\n", config.interval);
    
    return ERR_NONE;
}

int fakeCameraRelease()
{
    CV_PRINT("turn off fakeCamera(%s)\n", fakeCamConfig.imgFile);
    uv_timer_stop(&fakeCamTimer);
    return ERR_NONE;
}

int fakeCameraOnData(int toggle)
{
    
    if(toggle) {
        fakeCameraInit(fakeCamConfig, NULL);
    } else {
        fakeCameraRelease();
    }
    
    return ERR_NONE;
}

