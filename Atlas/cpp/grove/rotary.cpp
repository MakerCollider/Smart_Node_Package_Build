#include <iostream>
#include <stdlib.h>
#include <unistd.h>
#include <string>
#include <uv.h>
#include "upm/grove.h"
#include "grove_kit.h"

using namespace std;

/************************************************
 rotary
 ************************************************/

void *rtLoop = NULL;
uv_timer_t rtTimer;

static rotaryDegreeCb rtDegCb = NULL;
static rotaryThreCb rtThreCb = NULL;
rotaryConfig rtConfig;
upm::GroveRotary* knob;
int rtInitStatus = 0;

void run_rt_uv_timer(uv_timer_t *req)
{
    float abs_deg = knob->abs_deg();     // Absolute degrees
    printf("current abs degree is %f degree!\n",abs_deg);
    rtDegCb(abs_deg);
    if(abs_deg > rtConfig.threshold)
    {
        rtThreCb(1);
    }else
    {
        rtThreCb(0);
    }
}

int rotaryInit(rotaryConfig config, rotaryDegreeCb degCb, rotaryThreCb threCb)
{
    if(degCb != NULL)
        rtDegCb = degCb;
    if(threCb != NULL)                                          
        rtThreCb = threCb;

    rtConfig = config;
    if(rtInitStatus == 1)
    {
        return ERR_NONE;
    }

    knob = new upm::GroveRotary(config.aioPin);

    printf("initialized temperature in pin AIO %d with interval %d\n", config.aioPin, config.interval);

    // Initialize uv loop and timer
    uv_timer_stop(&rtTimer);

    if(rtLoop == NULL) {
        rtLoop = uv_default_loop();
    }
                                                                                                 
    uv_timer_init((uv_loop_t*)rtLoop, &rtTimer);                                                 
    rtTimer.data = NULL;                                                                         
    uv_timer_start(&rtTimer, run_rt_uv_timer, 0, config.interval);                               
    rtInitStatus = 1;
                                                                                                 
    return ERR_NONE;                                                                             
}                                                                                                
                                                                                                 
int rotaryRelease()                                                                         
{                    
    if(rtInitStatus == 0)                                                                              
    {                                                                                                  
        return ERR_NONE;                                                                               
    }                                                                              
    printf("turn off rotary in pin AIO %d\n", rtConfig.aioPin);
    uv_timer_stop(&rtTimer);
    delete knob;                                                                     
    rtInitStatus = 0;                        
                                                                         
    return ERR_NONE;                                                                             
}                                                                                                
                                                                                                 
int rotaryOnData(int toggle)                                                                
{                                                                                                
    if(toggle) {                                                                                 
        rotaryInit(rtConfig, NULL, NULL);                          
    } else {                                                      
        rotaryRelease();                                     
    }                                                             
                                                                  
    return ERR_NONE;                                              
}            
