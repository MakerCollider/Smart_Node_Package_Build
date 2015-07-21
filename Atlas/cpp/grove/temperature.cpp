#include <iostream>
#include <stdlib.h>
#include <unistd.h>
#include <string>
#include <uv.h>
#include "upm/grove.h"
#include "grove_kit.h"

using namespace std;

/************************************************
 temperature
 ************************************************/

void *tmLoop = NULL;
uv_timer_t tmTimer;

static temperatureCb tmCb = NULL;
static temperatureThreCb tmThreCb = NULL;
temperatureConfig tmConfig;
upm::GroveTemp* temp;
int tempInitStatus = 0;

void run_tm_uv_timer(uv_timer_t *req)
{
    int celsius = temp->value();
    printf("Temperature is %d degree\n",celsius);
    tmCb(celsius);
    if(celsius > tmConfig.threshold)
    {
        tmThreCb(1);
    }else
    {
        tmThreCb(0);
    }
}

int temperatureInit(temperatureConfig config, temperatureCb cb, temperatureThreCb threCb)
{
    if(cb != NULL)
        tmCb = cb;
    if(threCb != NULL)                                                                                     
        tmThreCb = threCb;

    tmConfig = config;

    if(tempInitStatus == 1)
    {
        return ERR_NONE;
    }

    temp = new upm::GroveTemp(config.aioPin);
    printf("initialized temperature in pin AIO %d with interval %d\n", config.aioPin, config.interval);

    // Initialize uv loop and timer
    uv_timer_stop(&tmTimer);

    if(tmLoop == NULL) {
        tmLoop = uv_default_loop();
    }
                                                                                                 
    uv_timer_init((uv_loop_t*)tmLoop, &tmTimer);                                                 
    tmTimer.data = NULL;                                                                         
    uv_timer_start(&tmTimer, run_tm_uv_timer, 0, config.interval);                               
    tempInitStatus = 1;
                                                                                                 
    return ERR_NONE;                                                                             
}                                                                                                
                                                                                                 
int temperatureRelease()                                                                         
{ 
    if(tempInitStatus == 0)                  
    {                                                                                    
        return ERR_NONE;                                                                 
    }                                                                                                
    printf("turn off temperature in pin AIO %d\n", tmConfig.aioPin);
    uv_timer_stop(&tmTimer);
    delete temp;                                                                     
    tempInitStatus = 0;                          
                                                                       
    return ERR_NONE;                                                                             
}                                                                                                
                                                                                                 
int temperatureOnData(int toggle)                                                                
{                                                                                                
    if(toggle) {                                                                                 
        temperatureInit(tmConfig, NULL, NULL);
    } else {                                                      
        temperatureRelease();                                     
    }                                                             
                                                                  
    return ERR_NONE;                                              
}            
