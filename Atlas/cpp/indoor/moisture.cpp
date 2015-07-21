#include <iostream>
#include <stdlib.h>
#include <unistd.h>
#include <string>
#include <uv.h>
#include "upm/grovemoisture.h"
#include "indoor_kit.h"

using namespace std;

/************************************************
 moisture
 ************************************************/

void *moiLoop = NULL;
uv_timer_t moiTimer;

static moistureCb moiCb = NULL;
static moistureThreCb moiThreCb = NULL;
moistureConfig moiConfig;
upm::GroveMoisture* moisture;
int moiInitStatus = 0;

void run_moi_uv_timer(uv_timer_t *req)
{
    int val = moisture->value();
    printf("moisture is %d \n",val);
    moiCb(val);
    if(val > moiConfig.threshold)
    {
        moiThreCb(1);
    }else
    {
        moiThreCb(0);
    }
}

int moistureInit(moistureConfig config, moistureCb cb, moistureThreCb threCb)
{
    if(cb != NULL)
        moiCb = cb;
    if(threCb != NULL)                                                                                     
        moiThreCb = threCb;

    moiConfig = config;

    if(moiInitStatus == 1)
    {
        return ERR_NONE;
    }
    moisture = new upm::GroveMoisture(config.aioPin);

    printf("initialized moisture in pin AIO %d with interval %d\n", config.aioPin, config.interval);

    // Initialize uv loop and timer
    uv_timer_stop(&moiTimer);

    if(moiLoop == NULL) {
        moiLoop = uv_default_loop();
    }
                                                                                                 
    uv_timer_init((uv_loop_t*)moiLoop, &moiTimer);                                                 
    moiTimer.data = NULL;                                                                         
    uv_timer_start(&moiTimer, run_moi_uv_timer, 0, config.interval);                               

    moiInitStatus = 1;                                                                                                 
    return ERR_NONE;                                                                             
}                                                                                                
                                                                                                 
int moistureRelease()                                                                         
{                     
    if(moiInitStatus == 0)
    {                                                                                               
        return ERR_NONE;                                                                            
    }                                                                            
    printf("turn off moisture in pin AIO %d\n", moiConfig.aioPin);
    uv_timer_stop(&moiTimer);
    delete moisture;                                                                     
    moiInitStatus = 0;                                                                       

    return ERR_NONE;                                                                             
}                                                                                                
                                                                                                 
int moistureOnData(int toggle)                                                                
{                                                                                                
    if(toggle) {                                                                                 
        moistureInit(moiConfig, NULL, NULL);
    } else {                                                      
        moistureRelease();                                     
    }                                                             
                                                                  
    return ERR_NONE;                                              
}            
