//
//  servo.cpp
//  motor_node
//
//  Created by yy on 15/6/9.
//  Copyright (c) 2015 yy. All rights reserved.
//

#include <iostream>
#include "stdlib.h"
#include "mraa.hpp"
#include "stdio.h"
#include "uv.h"

#include "edi_robot.h"

using namespace std;

void *serLoop = NULL;
uv_timer_t serTimer;

static servoLoopCb serLoopCb = NULL;

servoLoopConfig serLoopConfig;
mraa::Pwm* Servo;
#define SERVO_SCALE					0.00053

int currentAngle = 0;
int offset = 5;

void run_servo_uv_timer(uv_timer_t *req)
{
    currentAngle += offset;
    Servo->write((float)currentAngle * SERVO_SCALE + 0.025);
    for(int c=1;c<=200;c++)
        usleep(700);
    
    //	cout << "Servo moved to ";
    //	cout << currentAng << endl;
    if(currentAngle == serLoopConfig.maxAngle)
    {
        offset = -5;
        cout << "Face move to Right limit!" << endl;
    }
    else if (currentAngle == serLoopConfig.minAngle)
    {
        offset = 5;
        cout << "Face move to Left limit!" << endl;
    }
    return;
}
int servoLoopInit(servoLoopConfig config, servoLoopCb cb)
{
    serLoopConfig = config;
    
    if(cb != NULL)
        serLoopCb = cb;
    
    Servo = new mraa::Pwm(6);
    Servo->period_ms(20);
    Servo->enable(true);
    
    printf("initialized servo with max angle %d, min angle %d\n", config.maxAngle, config.minAngle);
    currentAngle = 90;
    offset = 5;
    Servo->write(currentAngle * SERVO_SCALE + 0.025);
    
    // Initialize uv loop and timer
    uv_timer_stop(&serTimer);
    
    if(serLoop == NULL) {
        serLoop = uv_default_loop();
    }
    uv_timer_init((uv_loop_t*)serLoop, &serTimer);
    serTimer.data = NULL;
    
    uv_timer_start(&serTimer, run_servo_uv_timer, 0, 100);
    
    return ERR_NONE;
}

int servoLoopRelease()
{
    printf("turn off servo\n");
    uv_timer_stop(&serTimer);
    currentAngle = 90;
    offset = 5;
    Servo->write(currentAngle * SERVO_SCALE + 0.025);
    delete Servo;
    
    return ERR_NONE;
}

int servoLoopOnData(int toggle)
{
    if(toggle)
    {
        currentAngle = 90;                                                                              
        offset = 5;                                                                                     
        Servo->write(currentAngle * SERVO_SCALE + 0.025);         
        uv_timer_start(&serTimer, run_servo_uv_timer, 0, 100);
    }
    else
    {
        serLoopCb((currentAngle - 90)/5*5);
        uv_timer_stop(&serTimer);                        
        currentAngle = 90;                                   
        offset = 5;                                      
        Servo->write(currentAngle * SERVO_SCALE + 0.025);
    }
    return ERR_NONE;
}