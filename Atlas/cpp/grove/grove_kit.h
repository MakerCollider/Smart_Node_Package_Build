#ifndef GROVE_H
#define GROVE_H

#define ERR_NONE  0
#define ERR_UNKOWN -1

/************************************************
 LCD
 ************************************************/
#define lcdHelp "this is the node for RGB Lcd in Grove starter kit plus.	\
                 input: string to display. 	\
                 output: 	\
                 1. LCD color red.	\
                 2. LCD color green.	\
                 3. LCD color blue."	
#define lcdClass "grove"
struct lcdConfig {
    int colorr;
    int colorg;
    int colorb;
};

#define lcdConfig_colorr	254
#define lcdConfig_colorg	254
#define lcdConfig_colorb	254

typedef void(*lcdCb)(char*);

extern int lcdInit(lcdConfig config, lcdCb cb);
extern int lcdRelease();
extern int lcdOnData(char* str);

/************************************************
 LED
 ************************************************/
#define ledClass "grove"

struct ledConfig {
    int pin;
};

#define ledConfig_pin  		0

typedef void(*ledCb)(int);

extern int ledInit(ledConfig config, ledCb cb);
extern int ledRelease();
extern int ledOnData(int val);

/************************************************ 
 rotary                               
 ************************************************/

#define rotaryClass "grove"                                                  
struct rotaryConfig {                        
    int aioPin;                                   
    int interval;                                 
    int threshold;
};                                                
                                                  
#define rotaryConfig_aioPin           0      
#define rotaryConfig_interval       300       
#define rotaryConfig_threshold       150
                                                  
typedef void(*rotaryDegreeCb)(float);                
typedef void(*rotaryThreCb)(int);                
                                                  
extern int rotaryInit(rotaryConfig config, rotaryDegreeCb degCb, rotaryThreCb threCb);
extern int rotaryRelease();                                       
extern int rotaryOnData(int toggle);     

/************************************************                      
 Relay                                                                   
 ************************************************/

#define relayClass "grove"
struct relayConfig {                                
    int pin;                                      
};                                                
                                                  
#define relayConfig_pin           0                 
                                                  
typedef void(*relayCb)(int);                        
                                                  
extern int relayInit(relayConfig config, relayCb cb);                        
extern int relayRelease();                                               
extern int relayOnData(int toggle);   

#endif

