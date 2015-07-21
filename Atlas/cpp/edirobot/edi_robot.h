//
//  edi_robot.h
//  edu_robot_node
//
//  Created by yy on 15/6/8.
//  Copyright (c) 2015 yy. All rights reserved.
//

#ifndef EDI_ROBOT_H
#define EDI_ROBOT_H

#define ERR_NONE  0
#define ERR_UNKOWN -1

/************************************************
 motor
 ************************************************/
#define motorClass "edi_robot"
struct motorConfig {
    int motorId;
};

#define motorConfig_motorId           0

extern int motorInit(motorConfig config);
extern int motorRelease();
extern int motorOnData(int dirAndTime);

/************************************************
 SPI screen
 ************************************************/
#define screenClass "edi_robot"
struct screenConfig {
    int refreshFreq;
};

#define screenConfig_refreshFreq           10

extern int screenInit(screenConfig config);
extern int screenRelease();
extern int screenOnData(int faceId);

/************************************************
 servo Loop
 ************************************************/
#define servoLoopClass "edi_robot"
struct servoLoopConfig {
    int maxAngle;
    int minAngle;
};

#define servoLoopConfig_maxAngle           160
#define servoLoopConfig_minAngle           20

typedef void(*servoLoopCb)(int);

extern int servoLoopInit(servoLoopConfig config, servoLoopCb cb);
extern int servoLoopRelease();
extern int servoLoopOnData(int toggle);

#endif /* defined(__motor_node__motor__) */
