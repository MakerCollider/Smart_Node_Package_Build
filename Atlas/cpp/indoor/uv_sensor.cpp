#include <iostream>
#include <stdlib.h>
#include <unistd.h>
#include <string>
#include <uv.h>
#include "upm/guvas12d.h"
#include "indoor_kit.h"

using namespace std;

/************************************************
 UV sensor
 ************************************************/

void *uvsLoop = NULL;
uv_timer_t uvsTimer;

static uvSensorCb uvsCb = NULL;
static uvSensorThreCb uvsThreCb = NULL;
uvSensorConfig uvsConfig;
upm::GUVAS12D *volts;

int uvsInitStatus = 0;

void run_uvs_uv_timer(uv_timer_t *req)
{
    float val = volts->value(GUVAS12D_AREF, SAMPLES_PER_QUERY); 
    uvsCb(val);
    if(val > uvsConfig.threshold)
    {
        uvsThreCb(1);
    }else
    {
        uvsThreCb(0);
    }
}

int uvSensorInit(uvSensorConfig config, uvSensorCb Cb, uvSensorThreCb threCb)
{
    if(Cb != NULL)
        uvsCb = Cb;
    if(threCb != NULL)                                          
        uvsThreCb = threCb;

    uvsConfig = config;

    if(uvsInitStatus == 1)
    {
        return ERR_NONE;
    }
    volts = new upm::GUVAS12D(config.aioPin);

    printf("initialized UV Sensor in pin AIO %d with interval %d\n", config.aioPin, config.interval);

    // Initialize uv loop and timer
    uv_timer_stop(&uvsTimer);

    if(uvsLoop == NULL) {
        uvsLoop = uv_default_loop();
    }
                                                                                                 
    uv_timer_init((uv_loop_t*)uvsLoop, &uvsTimer);                                                 
    uvsTimer.data = NULL;                                                                         
    uv_timer_start(&uvsTimer, run_uvs_uv_timer, 0, config.interval);                               

    uvsInitStatus = 1;                                                                                                 
    return ERR_NONE;                                                                             
}                                                                                                
                                                                                                 
int uvSensorRelease()                                                                         
{                     
    if(uvsInitStatus == 0)                                                   
    {                                                                        
        return ERR_NONE;                                                     
    }                                                                            
    printf("turn off UV Sensor in pin AIO %d\n", uvsConfig.aioPin);
    uv_timer_stop(&uvsTimer);
    delete volts;                                                                     
                         
    uvsInitStatus = 0;                                                                        
    return ERR_NONE;                                                                             
}                                                                                                
                                                                                                 
int uvSensorOnData(int toggle)                                                                
{                                                                                                
    if(toggle) {                                                                                 
        uvSensorInit(uvsConfig, NULL, NULL);                          
    } else {                                                      
        uvSensorRelease();                                     
    }                                                             
                                                                  
    return ERR_NONE;                                              
}            
