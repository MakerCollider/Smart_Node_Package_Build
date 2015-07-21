#ifndef INDOOR_H
#define INDOOR_H

#define ERR_NONE  0
#define ERR_UNKOWN -1

/************************************************
 UV sensor
 ************************************************/
#define uvSensorClass "indoor"
struct uvSensorConfig {
    int aioPin;
    int interval;
    int threshold;
};

#define uvSensorConfig_aioPin           0
#define uvSensorConfig_interval      500
#define uvSensorConfig_threshold     10

#define GUVAS12D_AREF 5.0
#define SAMPLES_PER_QUERY 32

typedef void(*uvSensorCb)(int);
typedef void(*uvSensorThreCb)(int);

extern int uvSensorInit(uvSensorConfig config, uvSensorCb cb, uvSensorThreCb threCb);
extern int uvSensorRelease();
extern int uvSensorOnData(int toggle);

/************************************************
 rotary Encoder
 ************************************************/
#define rotaryEncoderClass "indoor"                                               
struct rotaryEncoderConfig {             
    int pinA;
    int pinB;                       
    int interval;
    int threshold;                                                                               
};                              
                                                  
#define rotaryEncoderConfig_pinA           2
#define rotaryEncoderConfig_pinB           3
#define rotaryEncoderConfig_interval       300          
#define rotaryEncoderConfig_threshold       150
                                                  
typedef void(*rotaryEncoderDegreeCb)(float);                                            
typedef void(*rotaryEncoderThreCb)(int);                
                                 
extern int rotaryEncoderInit(rotaryEncoderConfig config, rotaryEncoderDegreeCb degCb, rotaryEncoderThreCb threCb);
extern int rotaryEncoderRelease();                
extern int rotaryEncoderOnData(int toggle);   

/************************************************
 moisture
 ************************************************/
#define moistureClass "indoor"
struct moistureConfig {
    int aioPin;
    int interval;
    int threshold;
};

#define moistureConfig_aioPin           0
#define moistureConfig_interval      500
#define moistureConfig_threshold     500

typedef void(*moistureCb)(int);
typedef void(*moistureThreCb)(int);

extern int moistureInit(moistureConfig config, moistureCb cb, moistureThreCb threCb);
extern int moistureRelease();
extern int moistureOnData(int toggle);

/************************************************                                    
 temperature & humidity                                                                            
 ************************************************/                                   
#define tempHumiClass "indoor"                                                                                     
struct tempHumiConfig {                                                              
    int interval;                                                                    
    int temperatureThreshold;                                                                   
    int humidityThreshold;                                                                   
};                                                                                   
                                                                                     
#define tempHumiConfig_interval      500                                             
#define tempHumiConfig_temperatureThreshold     30                                             
#define tempHumiConfig_humidityThreshold     30                                             
                                                                                     
typedef void(*tempCb)(int);
typedef void(*humiCb)(int);
typedef void(*tempHumiCb)(int, int);
typedef void(*tempThreCb)(int);
typedef void(*humiThreCb)(int);
typedef void(*tempHumiThreCb)(int);
                                                                                     
extern int tempHumiInit(tempHumiConfig config, tempCb cb1, humiCb cb2, tempHumiCb cb3, tempThreCb cb4, humiThreCb cb5, tempHumiThreCb cb6);
extern int tempHumiRelease();         
extern int tempHumiOnData(int toggle);

/************************************************
 motion
 ************************************************/
#define motionClass "indoor"
struct motionConfig {
    int pin;
};

#define motionConfig_pin           2

typedef void(*motionCb)(int);

extern int motionInit(motionConfig config, motionCb cb);
extern int motionRelease();
extern int motionOnData(int toggle);

#endif

