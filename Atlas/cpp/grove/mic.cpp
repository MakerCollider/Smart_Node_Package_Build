#include <iostream>
#include <stdlib.h>
#include <unistd.h>
#include <string>
#include <uv.h>
#include "mraa/aio.h"
#include "grove_kit.h"

using namespace std;

/************************************************
 Mic
 ************************************************/

void *micLoop = NULL;
uv_timer_t micTimer;

static micValCb MicValCb = NULL;
static micThreCb MicThreCb = NULL;
micConfig MicConfig;
mraa_aio_context micIo;
static int smooth_count = 0;       
int micStatus = 0; 

void run_mic_uv_timer(uv_timer_t *req)
{
    int val = mraa_aio_read(micIo);
    //hard code the interval to 100ms, count the configed times to trigger the button
    if(val >= MicConfig.threshold)                                                                     
    {                                                                                
        if(smooth_count >= 1)                                             
        {                                                                            
            if(micStatus == 0)                                                          
            {                           
                printf("sound beyond threshold!\n");
                MicThreCb(1);                     
                micStatus = 1;                  
            }                                
        }                                    
        smooth_count++;                             
    } else {               
        smooth_count = 0;         
        if(micStatus == 1)
        {              
            micStatus = 0;
            printf("sound below threshold\n");
            MicThreCb(0);                  
        }                             
    }                  
    //printf("sensor: =========> %d\n", val);
    MicValCb(val);
}

int micInit(micConfig config, micValCb valCb, micThreCb threCb)
{
    if(valCb != NULL)
        MicValCb = valCb;
    if(threCb != NULL)                                          
        MicThreCb = threCb;
    
    MicConfig = config;
    
    micIo = mraa_aio_init(MicConfig.aioPin); 
    
    printf("initialized Mic in pin AIO %d with threshold %d\n", config.aioPin, config.threshold);
    
    // Initialize uv loop and timer
    uv_timer_stop(&micTimer);
    
    if(micLoop == NULL) {
        micLoop = uv_default_loop();
    }
    
    uv_timer_init((uv_loop_t*)micLoop, &micTimer);
    micTimer.data = NULL;
    uv_timer_start(&micTimer, run_mic_uv_timer, 0, 100);
    
    return ERR_NONE;
}

int micRelease()
{
    printf("turn off mic in aioPin %d\n", MicConfig.aioPin);
    mraa_aio_close(micIo);
    uv_timer_stop(&micTimer);
    
    return ERR_NONE;
}

int micOnData(int toggle)
{
    if(toggle) {
        micInit(MicConfig, NULL, NULL);
    } else {
        micRelease();
    }
    
    return ERR_NONE;
}

