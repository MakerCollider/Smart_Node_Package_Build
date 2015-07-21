#include <iostream>
#include <stdlib.h>
#include <unistd.h>
#include <string>
#include <uv.h>
#include "upm/th02.h"
#include "indoor_kit.h"

using namespace std;

/************************************************
 temperature and humidity
 ************************************************/

void *thLoop = NULL;
uv_timer_t thTimer;

static tempCb tCb = NULL;
static humiCb hCb = NULL;
static tempHumiCb thCb = NULL;
static tempThreCb tThreCb = NULL;
static humiThreCb hThreCb = NULL;
static tempHumiThreCb thThreCb = NULL;
tempHumiConfig thConfig;
upm::TH02 *th02;
int thInitStatus = 0;

void run_th_uv_timer(uv_timer_t *req)
{
    float temp = th02->getTemperature();
    float humi = th02->getHumidity();
    printf("temperature is %f, humidity is %f \n", temp, humi);
    tCb(temp);
    hCb(humi);
    thCb(temp, humi);
    if(temp > thConfig.temperatureThreshold)
    {
        tThreCb(1);
    }else
    {
        tThreCb(0);
    }
    if(humi > thConfig.humidityThreshold)
    {                
        tThreCb(1);  
    }else                                                                    
    {                                                                        
        tThreCb(0);                                                          
    }
    if(temp > thConfig.temperatureThreshold && humi > thConfig.humidityThreshold)                                    
    {                                                                        
        thThreCb(1);                                                          
    }else                                                                    
    {                                                                        
        thThreCb(0);                                                          
    } 
}

int tempHumiInit(tempHumiConfig config, tempCb cb1, humiCb cb2, tempHumiCb cb3, tempThreCb cb4, humiThreCb cb5, tempHumiThreCb cb6)
{
    if(cb1 != NULL)
        tCb = cb1;
    if(cb2 != NULL)                                                                                                                
        hCb = cb2;
    if(cb3 != NULL)                                                                                                                
        thCb = cb3;
    if(cb4 != NULL)                                                                                                                
        tThreCb = cb4;
    if(cb5 != NULL)                                                                                                                
        hThreCb = cb5;
    if(cb6 != NULL)                                                                                                                
        thThreCb = cb6;

    thConfig = config;
    if(thInitStatus == 1)
    {
        return ERR_NONE;
    }
    th02 = new upm::TH02();

    printf("initialized temperature & humidity in I2C\n");

    // Initialize uv loop and timer
    uv_timer_stop(&thTimer);

    if(thLoop == NULL) {
        thLoop = uv_default_loop();
    }
                                                                                                 
    uv_timer_init((uv_loop_t*)thLoop, &thTimer);                                                 
    thTimer.data = NULL;                                                                         
    uv_timer_start(&thTimer, run_th_uv_timer, 0, config.interval);                               
    thInitStatus = 1;                                                                                                

    return ERR_NONE;                                                                             
}                                                                                                
                                                                                                 
int tempHumiRelease()                                                                         
{                                                                                                
    if(thInitStatus == 0)                                                                                                          
    {                                                                                                                              
        return ERR_NONE;                                                                                                           
    }
    printf("turn off temperature & humidity\n");
    uv_timer_stop(&thTimer);
    delete th02;                                                                     
    thInitStatus = 0;    

    return ERR_NONE;                                                                             
}                                                                                                
                                                                                                 
int tempHumiOnData(int toggle)                                                                
{                                                                                                
    if(toggle) {                                                                                 
        tempHumiInit(thConfig, NULL, NULL, NULL, NULL, NULL, NULL);
    } else {                                                      
        tempHumiRelease();                                     
    }                                                             
                                                                  
    return ERR_NONE;                                              
}            
