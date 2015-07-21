#ifndef GROVE_H
#define GROVE_H

#define ERR_NONE  0
#define ERR_UNKOWN -1

/************************************************
 Light sensor
 ************************************************/
#define lightSensorClass "grove"

struct lightSensorConfig {
    int pin;
    int interval;
    int threshold;
};

#define lightSensorConfig_pin           0
#define lightSensorConfig_interval      500
#define lightSensorConfig_threshold     400

typedef void(*lightSensorCb)(int);
typedef void(*lightSensorThreCb)(int);

extern int lightSensorInit(lightSensorConfig config, lightSensorCb cb, lightSensorThreCb threCb);
extern int lightSensorRelease();
extern int lightSensorOnData(int toggle);

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
 temperature
 ************************************************/

#define temperatureClass "grove"
struct temperatureConfig {
    int aioPin;
    int interval;
    int threshold;
};

#define temperatureConfig_aioPin           0
#define temperatureConfig_interval      500
#define temperatureConfig_threshold      25

typedef void(*temperatureCb)(int);
typedef void(*temperatureThreCb)(int);

extern int temperatureInit(temperatureConfig config, temperatureCb cb, temperatureThreCb threCb);
extern int temperatureRelease();
extern int temperatureOnData(int toggle);

/************************************************
 button
 ************************************************/

#define buttonClass "grove"
struct buttonConfig {
    int pin;
    int impulse;
};

#define buttonConfig_pin           0
#define buttonConfig_impulse      1000

typedef void(*buttonCb)(int);

extern int buttonInit(buttonConfig config, buttonCb cb);
extern int buttonRelease();
extern int buttonOnData();

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

/************************************************    
 buzzer                 
 ************************************************/   

#define buzzerClass "grove"
struct buzzerConfig {                                 
    int pin; 
    int tone;  //from 0 to 6                                       
};                                                   
                                                     
#define buzzerConfig_pin           0
#define buzzerConfig_tone	   0                  
                                                     
typedef void(*buzzerCb)(int);                         
                                                     
extern int buzzerInit(buzzerConfig config, buzzerCb cb);
extern int buzzerRelease();                                                              
extern int buzzerOnData(int toggle); 

/************************************************ 
 buzzer Loop                                           
 ************************************************/

#define buzzerLoopClass "grove"
struct buzzerLoopConfig {                                   
    int pin;                                            
    int tone;  //from 0 to 6
    int interval;                            
};                                                      
                                                        
#define buzzerLoopConfig_pin           0                    
#define buzzerLoopConfig_tone          0    
#define buzzerLoopConfig_interval      500                
                                                        
typedef void(*buzzerLoopCb)(int);                           
                                                        
extern int buzzerLoopInit(buzzerLoopConfig config, buzzerLoopCb cb);
extern int buzzerLoopRelease();                       
extern int buzzerLoopOnData(int toggle);
  
/************************************************                      
 touch                                                               
 ************************************************/                     
  
#define touchClass "grove"                                                                     
struct touchConfig {                                                  
    int pin;                                                           
    int impulse;                                                        
};                                                                     
                                                  
#define touchConfig_pin           0              
#define touchConfig_impulse      1000             
                                                  
typedef void(*touchCb)(int);                     
                                                  
extern int touchInit(touchConfig config, touchCb cb);
extern int touchRelease();                             
extern int touchOnData();           
 
/************************************************
 Mic
 ************************************************/

#define micClass "grove"
struct micConfig {
    int aioPin;
    int threshold;            
};

#define micConfig_aioPin           0
#define micConfig_threshold        400

typedef void(*micValCb)(int);
typedef void(*micThreCb)(int);

extern int micInit(micConfig config, micValCb valCb, micThreCb threCb);
extern int micRelease();
extern int micOnData(int toggle);

                                
#endif

