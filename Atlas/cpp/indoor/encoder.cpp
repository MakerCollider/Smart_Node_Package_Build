#include <iostream>
#include <stdlib.h>
#include <unistd.h>
#include <string>
#include <uv.h>
#include "upm/rotaryencoder.h"
#include "indoor_kit.h"

using namespace std;

/************************************************
 rotaryEncoder
 ************************************************/

void *rteLoop = NULL;
uv_timer_t rteTimer;

static rotaryEncoderDegreeCb rteDegCb = NULL;
static rotaryEncoderThreCb rteThreCb = NULL;
rotaryEncoderConfig rteConfig;
upm::RotaryEncoder* knob;
int rteInitStatus = 0;

void run_rte_uv_timer(uv_timer_t *req)
{
    float abs_deg = knob->position();     // Absolute degrees
    printf("current abs degree is %f degree!\n",abs_deg);
    rteDegCb(abs_deg);
    if(abs_deg > rteConfig.threshold)
    {
        rteThreCb(1);
    }else
    {
        rteThreCb(0);
    }
}

int rotaryEncoderInit(rotaryEncoderConfig config, rotaryEncoderDegreeCb degCb, rotaryEncoderThreCb threCb)
{
    if(degCb != NULL)
        rteDegCb = degCb;
    if(threCb != NULL)                                          
        rteThreCb = threCb;

    rteConfig = config;
 
    if(rteInitStatus == 1)
    {
        return ERR_NONE;
    }

    knob = new upm::RotaryEncoder(config.pinA, config.pinB);

    knob->initPosition();
    printf("initialized rotary Encoder in pin %d and pin %d with interval %d\n", config.pinA, config.pinB, config.interval);

    // Initialize uv loop and timer
    uv_timer_stop(&rteTimer);

    if(rteLoop == NULL) {
        rteLoop = uv_default_loop();
    }
                                                                                                 
    uv_timer_init((uv_loop_t*)rteLoop, &rteTimer);                                                 
    rteTimer.data = NULL;                                                                         
    uv_timer_start(&rteTimer, run_rte_uv_timer, 0, config.interval);                               
             
    rteInitStatus = 1;
                                                                                    
    return ERR_NONE;                                                                             
}                                                                                                
                                                                                                 
int rotaryEncoderRelease()                                                                         
{
    if(rteInitStatus == 0)                                                                                                  
    {                                                                                                                       
        return ERR_NONE;                                                                                                    
    }                                                                                                
    printf("turn off rotary Encoder in pin %d and pin %d\n", rteConfig.pinA, rteConfig.pinB);
    uv_timer_stop(&rteTimer);
    delete knob;         

    rteInitStatus = 0;                                                            
                                                                                                 
    return ERR_NONE;                                                                             
}                                                                                                
                                                                                                 
int rotaryEncoderOnData(int toggle)                                                                
{                                                                                                
    if(toggle) {                                                                                 
        rotaryEncoderInit(rteConfig, NULL, NULL);                          
    } else {                                                      
        rotaryEncoderRelease();                                     
    }                                                             
                                                                  
    return ERR_NONE;                                              
}            
