#include <stdio.h>
#include <string.h>
#include "upm/jhd1313m1.h"
#include "uv.h"
#include "grove_kit.h"

using namespace std;

/************************************************
 lcd
 ************************************************/


static lcdCb LcdCb = NULL;
lcdConfig LcdConfig;
static char dispStr[2][16] = {0};
upm::Jhd1313m1 *lcd;
int lcdInitStatus = 0;

int lcdInit(lcdConfig config, lcdCb cb)
{                                                              
    if(cb != NULL)                                             
        LcdCb = cb;                                             
                                                               
    LcdConfig = config;                                         
    memset(dispStr, 0, 32); 
    
    if(lcdInitStatus == 1)
    {
         return ERR_NONE;
    }    
  
    lcd = new upm::Jhd1313m1(0, 0x3E, 0x62);
    printf("set LCD color to (%d, %d, %d)\n", config.colorr, config.colorg, config.colorb);
    if(LcdConfig.colorr >= 255)
        LcdConfig.colorr = 254;
    if(LcdConfig.colorg >= 255)                                
        LcdConfig.colorg = 254;
    if(LcdConfig.colorb >= 255)                                
        LcdConfig.colorb = 254;
    if(LcdConfig.colorr <= 0)                                
        LcdConfig.colorr = 1;
    if(LcdConfig.colorg <= 0)                                  
        LcdConfig.colorg = 1; 
    if(LcdConfig.colorb <= 0)                                  
        LcdConfig.colorb = 1; 
    lcd->setColor((char)config.colorr, (char)config.colorg, (char)config.colorb);
    lcd->setCursor(0,0);
    lcd->write("MC Node-red LCD");
    lcd->setCursor(0,1);
    lcd->write("Hello World");
                                                           
    printf("initialized LCD\n");
    lcdInitStatus = 1;                                                                                                 
    return ERR_NONE;                    
}

int lcdRelease()                                                                         
{
    if(lcdInitStatus == 0)             
    {                      
         return ERR_NONE;  
    }                                                                                                 
    printf("turn off LCD\n"); 
    lcd->clear();                                  
    delete lcd;
    lcdInitStatus = 0;                                                                                             
    return ERR_NONE;                                                                             
}                                                                                                
                                                                                                 
int lcdOnData(char *str)                                                                
{ 
    lcd->clear();
    memset(dispStr, 0, 32); 
    if(strlen(str) > 32)
    {
        memcpy(dispStr, str, 32);                                                            
    } else
    {
        memcpy(dispStr, str,strlen(str));                                                            
    }
    lcd->setCursor(0, 0);
    lcd->write(dispStr[0]);
    lcd->setCursor(1, 0);
    lcd->write(dispStr[1]);
    char temp[32] = {0};
    sprintf(temp, "%s, %s", dispStr[0], dispStr[1]);
    //printf("====> %s\n ", temp);
    LcdCb(temp);
    return ERR_NONE;                                             
}               
