//
//  motor.cpp
//  edi_robot
//
//  Created by yy on 15/6/8.
//  Copyright (c) 2015 yy. All rights reserved.
//

#include <iostream>
#include "stdlib.h"
#include "mraa.hpp"
#include "stdio.h"
#include "uv.h"

#include "edi_robot.h"

using namespace std;

void *motorLoop = NULL;
uv_timer_t motor1Timer;
uv_timer_t motor2Timer; 

mraa::Pwm* E1 = NULL;
mraa::Gpio* M1 = NULL;
mraa::Pwm* E2 = NULL;
mraa::Gpio* M2 = NULL;

motorConfig Motor1Config;
motorConfig Motor2Config; 

void run_motor_uv_timer(uv_timer_t *req)
{
    if (E1 != NULL && M1 != NULL)
    {
        uv_timer_stop(&motor1Timer);
        E1->write(0);   //PWM
    }
    else if(E2 != NULL && M2 != NULL)
    {
        uv_timer_stop(&motor2Timer);                           
        E2->write(0);   //PWM 
    }
}

int motorInit(motorConfig config)
{
    if(config.motorId == 0)
    {
        Motor1Config = config;
    }
    else if (config.motorId == 1)
    {
        Motor2Config = config;
    }
    if(config.motorId == 0)
    {
        E1 = new mraa::Pwm(5);
        M1 = new mraa::Gpio(4);
        printf("initialized motor %d\n ", config.motorId);  
        // Initialize uv loop and timer                   
        uv_timer_stop(&motor1Timer);                       
                                                      
        if(motorLoop == NULL) {                           
            motorLoop = uv_default_loop();                
        }                                                     
        uv_timer_init((uv_loop_t*)motorLoop, &motor1Timer);    
        motor1Timer.data = NULL; 
    }
    else if(config.motorId == 1)
    {
        E2 = new mraa::Pwm(3);
        M2 = new mraa::Gpio(2);
        printf("initialized motor %d\n ", config.motorId);      
        // Initialize uv loop and timer                       
        uv_timer_stop(&motor2Timer);                           
                                                          
        if(motorLoop == NULL) {                               
            motorLoop = uv_default_loop();                    
        }                                                     
        uv_timer_init((uv_loop_t*)motorLoop, &motor2Timer);    
        motor2Timer.data = NULL; 
    }
    
    return ERR_NONE;
}

int motorRelease()
{
    if(E1 != NULL && M1 != NULL) 
    {
        printf("turn off motor ID %d\n", Motor1Config.motorId);
        uv_timer_stop(&motor1Timer);
        delete E1;
        delete M1;
    }
    else if (E2 != NULL && M2 != NULL)
    {                                                     
        printf("turn off motor ID %d\n", Motor2Config.motorId);
        uv_timer_stop(&motor2Timer);                       
        delete E2;                                        
        delete M2;                                        
    }  
    
    return ERR_NONE;
}

int motorOnData(int dirAndTime)
{
    if(E1 != NULL && M1 != NULL)                           
    {                         
        if(dirAndTime > 0)
        {
            M1->write(1);
            E1->write(1);
        }
        else if(dirAndTime < 0)
        {
            M1->write(0);
            E1->write(1);
        }
        else
        {
            //do nothing
        }
        uv_timer_start(&motor1Timer, run_motor_uv_timer, 0, abs(dirAndTime));
        printf("motor %d move %d ms\n", Motor1Config.motorId, dirAndTime);
    }
    else if(E2 != NULL && M2 != NULL)
    {
        if(dirAndTime > 0)                                    
        {                                                     
            M2->write(1);                                     
            E2->write(1);                                     
        }                                                     
        else if(dirAndTime < 0)                               
        {                                                     
            M2->write(0);                                     
            E2->write(1);                                     
        }                                                     
        else                                                  
        {                                                     
            //do nothing                                      
        }                                                     
        uv_timer_start(&motor2Timer, run_motor_uv_timer, 0, abs(dirAndTime));
        printf("motor %d move %d ms\n", Motor2Config.motorId, dirAndTime);  
    }
    return ERR_NONE;
}

