#ifndef FACE_DETECTION_H
#define FACE_DETECTION_H

#define ERR_NONE  0
#define ERR_UNKOWN -1
#define ERR_NO_CAMERA -2
#define ERR_NO_FACE_CASCADE -3
#define ERR_OVER_SIZE -4
#define ERR_SINGLE_INSTANCE -5

#define CV_PRINT printf

/************************************************
 Camera
 ************************************************/

//extern void *camLoop;
#define cameraClass "CV"
struct cameraConfig {
    int interval;
    int camId;
    int width;
    int height;
};

#define cameraConfig_interval 500
#define cameraConfig_camId    -1
#define cameraConfig_width    160
#define cameraConfig_height   120

typedef void(*cameraCb)(unsigned long);

extern int cameraInit(cameraConfig config, cameraCb cb);
extern int cameraRelease(cameraConfig config);
extern int cameraOnData(cameraConfig config, int toggle);



/************************************************
 Face Detection
 ************************************************/
#define faceDetectClass "CV"
struct faceDetectConfig {
    int imgWidth;
    int imgHeight;
    int faceWidth;
    int faceHeight;
};

#define faceDetectConfig_imgWidth    128
#define faceDetectConfig_imgHeight   96
#define faceDetectConfig_faceWidth   30
#define faceDetectConfig_faceHeight  30

typedef void(*faceDetectNumCb)(int);
typedef void(*faceDetectImgCb)(unsigned long);
typedef void(*faceDetectAllCb)(int, unsigned long);

extern int faceDetectInit(faceDetectConfig config, faceDetectNumCb ncb, faceDetectImgCb icb, faceDetectAllCb acb);

extern int faceDetectOnData(faceDetectConfig config, unsigned long imgHandle);
extern int faceDetectRelease();

/************************************************
 Img to Base64
 ************************************************/
#define img2Base64Class "CV"
struct img2Base64Config {
    char *imgType;
    int quality;
    int maxWidth;
    int maxHeight;
};

#define img2Base64Config_imgType   "jpg"
#define img2Base64Config_quality   70
#define img2Base64Config_maxWidth  1280
#define img2Base64Config_maxHeight 720

typedef void(*img2Base64Cb)(char*);

extern int img2Base64Init(img2Base64Config config,img2Base64Cb cb);
extern int img2Base64OnData(img2Base64Config config, unsigned long imgHandle);
extern int img2Base64Release(img2Base64Config config);

#endif
