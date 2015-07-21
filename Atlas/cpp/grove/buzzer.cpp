#include <stdio.h>
#include <string.h>
#include <uv.h>
#include "upm/buzzer.h"
#include "grove_kit.h"

using namespace std;

/************************************************
 buzzer
 ************************************************/


static buzzerCb bzCb = NULL;
buzzerConfig bzConfig;
upm::Buzzer* sound;
int bzInitStatus = 0;
int chord[] = { DO, RE, MI, FA, SOL, LA, SI };

int buzzerInit(buzzerConfig config, buzzerCb cb)
{                                                              
    if(cb != NULL)                                             
        bzCb = cb;                                             
                                                               
    bzConfig = config;  
    if(bzInitStatus == 1)
    {
        return ERR_NONE;
    }                                       
    sound = new upm::Buzzer(config.pin);

    printf("initialized Buzzer\n");
    //sound->playSound(chord[bzConfig.tone], 0);
    //bzCb(bzConfig.tone);       
    bzInitStatus = 1;                                                                                             
    return ERR_NONE;                    
}

int buzzerRelease()                                                                         
{  
    if(bzInitStatus == 0)               
    {                                   
        return ERR_NONE;                
    }                                                                                                
    printf("turn off buzzer\n"); 
    sound->stopSound();                                  
    delete sound;
                 
    bzInitStatus = 0;                                                                                
    return ERR_NONE;                                                                             
}                                                                                                
                                                                                                 
int buzzerOnData(int toggle)                                                                
{ 
    if(toggle)
    {
        sound->playSound(chord[bzConfig.tone], 0);
        bzCb(bzConfig.tone);
    }
    else
    {
        sound->stopSound();
        bzCb(-1);
    }
    return ERR_NONE;                                             
}    


/************************************************
 buzzer repeat                                   
 ************************************************/
                                                  
void *bzlLoop = NULL;                              
uv_timer_t bzlTimer;                               
                                                  
static buzzerLoopCb bzlCb = NULL;                 
buzzerLoopConfig bzlConfig;                       
upm::Buzzer* soundLoop;
int soundStatus = 0;
int bzlInitStatus = 0;
                                                  
void run_bzl_uv_timer(uv_timer_t *req)             
{              
    if(soundStatus == 0)
    {
        soundLoop->playSound(chord[bzlConfig.tone], 0);
        soundStatus = 1;
        bzlCb(bzlConfig.tone);
    }
    else
    {
        soundLoop->stopSound();
        soundStatus = 0;
        bzlCb(-1);
    }                      
}                                            
                                             
int buzzerLoopInit(buzzerLoopConfig config, buzzerLoopCb cb)
{                                                              
    if(cb != NULL)                                             
        bzlCb = cb;                                             
                                                               
    bzlConfig = config;                                         
    
    if(bzlInitStatus == 1)
    {
        return ERR_NONE;
    }                                                               
    soundLoop = new upm::Buzzer(config.pin);                                                          
    printf("initialized buzzer loop in pin %d with interval %d\n", config.pin, config.interval);
                                                                                                 
    // Initialize uv loop and timer                                                              
    uv_timer_stop(&bzlTimer);                                                                     
                                                                                                 
    if(bzlLoop == NULL) {                                                                         
        bzlLoop = uv_default_loop();                                                              
    }                                                                                            
                                                                                                 
    uv_timer_init((uv_loop_t*)bzlLoop, &bzlTimer);                                                 
    bzlTimer.data = NULL;                                                                         
    uv_timer_start(&bzlTimer, run_bzl_uv_timer, 0, config.interval);
    printf("start timer with interval %d ms\n", config.interval); 
                        
    bzlInitStatus = 1;                                          
                                                                  
    return ERR_NONE;  
}

int buzzerLoopRelease()                                                                         
{
    if(bzlInitStatus == 0)                                                                      
    {                                                                                           
        return ERR_NONE;                                                                        
    }                                                                                                   
    printf("turn off buzzer loop in pin %d\n", bzlConfig.pin);                                   
    uv_timer_stop(&bzlTimer);
    delete soundLoop;                                                                     
                         
    bzlInitStatus = 0;                                                                        
    return ERR_NONE;                                                                             
}                                                                                                
                                                                                                 
int buzzerLoopOnData(int toggle)                                                                
{                                                                                                
    if(toggle) {                                                                                 
        buzzerLoopInit(bzlConfig, NULL);                          
    } else {                                                      
        buzzerLoopRelease();                                     
    }                                                             
                                                                  
    return ERR_NONE;                                              
}                   
