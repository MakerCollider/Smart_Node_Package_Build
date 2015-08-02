#ifndef FAKE_CAMERA_H
#define FAKE_CAMERA_H

#include "cv_atlas.h"

/************************************************
 FakeCamera
 ************************************************/

//extern void *camLoop;
#define fakeCameraClass "CV"
struct fakeCameraConfig {
    int interval;
    char* imgFile;
    int width;
    int height;
};

#define fakeCameraConfig_interval 1000
#define fakeCameraConfig_imgFile  "static.jpg"
#define fakeCameraConfig_width    160
#define fakeCameraConfig_height   120

typedef void(*fakeCameraCb)(unsigned long);

extern int fakeCameraInit(fakeCameraConfig config, fakeCameraCb cb);
//extern int fakeCameraRelease();
extern int cleanFakeCamera();
extern int fakeCameraOnData(int toggle);

#endif
