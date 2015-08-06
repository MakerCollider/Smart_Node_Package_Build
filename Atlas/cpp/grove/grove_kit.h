#ifndef GROVE_H
#define GROVE_H

#define ERR_NONE  0
#define ERR_UNKOWN -1

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

