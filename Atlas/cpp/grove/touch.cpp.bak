#include <iostream>
#include <stdlib.h>
#include <unistd.h>
#include <string>
#include <uv.h>
#include "upm/ttp223.h"
#include "grove_kit.h"

using namespace std;

/************************************************
 touch sensor
 ************************************************/

void *tcLoop = NULL;
uv_timer_t tcTimer;
upm::TTP223* touch;

static touchCb tcCb = NULL;
touchConfig tcConfig;
int onOffStatus = 0;
int count = 0;
int buttonDelay(int inputValue )
{
    if(inputValue == 0)
    {
        count = 0;
        return 0;
    }
    else if(inputValue == 1 )  
    {
        count ++ ;     
    }
    if(count == 10)
        return 1;
    else
        return 0;
}

void run_tc_uv_timer(uv_timer_t *req)
{
    int val = buttonDelay(touch->value());

    //hard code the interval to 100ms, count the configed times to trigger the button
    if(val == 1)
    {
        if(onOffStatus == 0)
        {
            onOffStatus = 1;
            tcCb(1);
        }
        else
        {
            onOffStatus = 0;                                                         
            tcCb(0); 
        }                                                         
    }
}

int touchInit(touchConfig config, touchCb cb)
{
    if(cb != NULL)
        tcCb = cb;

    tcConfig = config;

    touch = new upm::TTP223(config.pin);
    onOffStatus = 0;
    printf("initialized touch sensor in pin %d with impulse %d\n", config.pin, config.impulse);
    // Initialize uv loop and timer
    uv_timer_stop(&tcTimer);

    if(tcLoop == NULL) {
        tcLoop = uv_default_loop();
    }
                                                                                                 
    uv_timer_init((uv_loop_t*)tcLoop, &tcTimer);                                                 
    tcTimer.data = NULL;                                                                         
    uv_timer_start(&tcTimer, run_tc_uv_timer, 0, 100);                               
                                                                                                 
    return ERR_NONE;                                                                             
}                                                                                                
                                                                                                 
int touchRelease()                                                                         
{                                                                                                
    printf("turn off touch sensor in pin %d\n", tcConfig.pin);
    uv_timer_stop(&tcTimer);
    delete touch;                                                                     
                                                                                                 
    return ERR_NONE;                                                                             
}                                                                                                
                                                                                                 
int touchOnData()                                                                
{                                                                                                
    return ERR_NONE;                                              
}            
