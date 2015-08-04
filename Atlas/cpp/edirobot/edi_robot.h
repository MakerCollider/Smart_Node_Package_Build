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

#endif /* defined(__motor_node__motor__) */
