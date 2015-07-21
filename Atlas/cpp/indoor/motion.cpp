#include <iostream>
#include <stdlib.h>
#include <unistd.h>
#include <string>
#include <uv.h>
#include "upm/biss0001.h"
#include "indoor_kit.h"

using namespace std;

/************************************************
 motion
 ************************************************/

void *motLoop = NULL;
uv_timer_t motTimer;
upm::BISS0001* motion;
int motInitStatus = 0;

static motionCb motCb = NULL;
motionConfig motConfig;

void run_mot_uv_timer(uv_timer_t *req)
{
    int val = motion->value();
    if(val == 1)
    {
        motCb(1);
    } else {
        motCb(0);
    }
}

int motionInit(motionConfig config, motionCb cb)
{
    if(cb != NULL)
        motCb = cb;

    motConfig = config;

    if(motInitStatus == 1)
    {
        return ERR_NONE;
    }

    motion = new upm::BISS0001(config.pin);

    printf("initialized motionsensor in pin %d\n", config.pin);
    // Initialize uv loop and timer
    uv_timer_stop(&motTimer);

    if(motLoop == NULL) {
        motLoop = uv_default_loop();
    }
                                                                                                 
    uv_timer_init((uv_loop_t*)motLoop, &motTimer);                                                 
    motTimer.data = NULL;                                                                         
    uv_timer_start(&motTimer, run_mot_uv_timer, 0, 100);                               

    motInitStatus = 1;                                                                                                 
    return ERR_NONE;                                                                             
}                                                                                                
                                                                                                 
int motionRelease()                                                                         
{                     
    if(motInitStatus == 0)                      
    {                                           
        return ERR_NONE;                        
    }                                                                             
    printf("turn off motion sensor in pin %d\n", motConfig.pin);
    uv_timer_stop(&motTimer);
    delete motion;                                                                     

    motInitStatus = 0;                         
                                                                        
    return ERR_NONE;                                                                             
}                                                                                                
                                                                                                 
int motionOnData(int toggle)                                                                
{                          
    if(toggle)
    {
        motionInit(motConfig, NULL);
    }
    else
    {
        motionRelease();
    }                                                                      
    return ERR_NONE;                                              
}            
