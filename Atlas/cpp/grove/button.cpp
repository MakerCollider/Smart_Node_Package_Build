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

void *btLoop = NULL;
uv_timer_t btTimer;

static buttonCb btCb = NULL;
buttonConfig btConfig;
upm::GroveButton* button;
static int count = 0;
int status = 0;

void run_bt_uv_timer(uv_timer_t *req)
{
    int val = button->value();
    //hard code the interval to 100ms, count the configed times to trigger the button
    if(val == 1)
    {
        if(count >= btConfig.impulse/100)
        {
            if(status == 0)
            {
                printf("button triggered\n");
                btCb(1);
                status = 1;
            }
        }
        count++;
    } else {
        count = 0;
        if(status == 1)
        {
            status = 0;
            printf("button opened\n");
            btCb(0);
        }
    }
}

int buttonInit(buttonConfig config, buttonCb cb)
{
    if(cb != NULL)
        btCb = cb;

    btConfig = config;

    button = new upm::GroveButton(config.pin);

    printf("initialized button in pin %d with impulse %d\n", config.pin, config.impulse);
    status = 0; //init status
    // Initialize uv loop and timer
    uv_timer_stop(&btTimer);

    if(btLoop == NULL) {
        btLoop = uv_default_loop();
    }
                                                                                                 
    uv_timer_init((uv_loop_t*)btLoop, &btTimer);                                                 
    btTimer.data = NULL;                                                                         
    uv_timer_start(&btTimer, run_bt_uv_timer, 0, 100);                               
                                                                                                 
    return ERR_NONE;                                                                             
}                                                                                                
                                                                                                 
int buttonRelease()                                                                         
{                                                                                                
    printf("turn off button in pin %d\n", btConfig.pin);
    uv_timer_stop(&btTimer);
    delete button;                                                                     
                                                                                                 
    return ERR_NONE;                                                                             
}                                                                                                
                                                                                                 
int buttonOnData()                                                                
{                                                                                                
    return ERR_NONE;                                              
}            
