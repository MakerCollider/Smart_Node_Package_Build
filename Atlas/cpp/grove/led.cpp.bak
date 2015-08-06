#include <stdio.h>
#include <string.h>
#include "upm/grove.h"
#include "grove_kit.h"

using namespace std;

/************************************************
 lcd
 ************************************************/


static ledCb LedCb = NULL;
ledConfig LedConfig;
upm::GroveLed* led;
int ledInitStatus = 0;

int ledInit(ledConfig config, ledCb cb)
{                                                              
    if(cb != NULL)                                             
        LedCb = cb;                                             
                                                               
    LedConfig = config;  
    if(ledInitStatus == 1)
    {
        return ERR_NONE;
    }    
              
    led = new upm::GroveLed(config.pin);
                                                           
    printf("initialized LED\n");
    ledInitStatus = 1;
                                                                                        
    return ERR_NONE;                    
}

int ledRelease()                                                                         
{   
    if(ledInitStatus == 0)              
    {                                   
        return ERR_NONE;                
    }                                                                                               
    printf("turn off LED\n"); 
    led->off();                                  
    delete led;
               
    ledInitStatus = 0;                                                                                  
    return ERR_NONE;                                                                             
}                                                                                                
                                                                                                 
int ledOnData(int val)                                                                
{ 
    if(val)
    {
        led->on();
    }
    else
    {
        led->off();
    }
    LedCb(val);
    return ERR_NONE;                                             
}               
