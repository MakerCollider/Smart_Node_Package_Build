//
//  screen.cpp
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

void *screenLoop = NULL;
uv_timer_t screenTimer;
int face = 0;
screenConfig ScreenConfig;

mraa::Gpio* SER;
mraa::Gpio* LATCH;
mraa::Gpio* SRCLK;
mraa::Gpio* SERG;
mraa::Gpio* LATCH_B;
mraa::Gpio* SRCLK_B;
mraa::Gpio* SER_B;

unsigned char tab[]={
    0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x7E,0x7E,0x40,0x40,0x00,0x00,
    0x00,0x00,0x00,0x00,0x00,0x00,0xF0,0x0F,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
    
    0x00,0x00,0x00,0x00,0x00,0x00,0x18,0x18,0x24,0x24,0x42,0x42,0x00,0x00,0x00,0x00,
    0x00,0x00,0x00,0x00,0x00,0x00,0x10,0x08,0xE0,0x07,0x00,0x00,0x00,0x00,0x00,0x00,
    
    0xFF,0xFF,0x01,0x80,0x01,0x80,0x01,0x80,0x01,0x80,0x7D,0xBE,0x41,0xA0,0x01,0x80,
    0x01,0x80,0x01,0x80,0x01,0x80,0xE1,0x8F,0x01,0x80,0x01,0x80,0x01,0x80,0xFF,0xFF,
    
    0xFF,0xFF,0x01,0x80,0x01,0x80,0x19,0x98,0x25,0xA4,0x43,0xC2,0x01,0x80,0x01,0x80,
    0x01,0x80,0x01,0x80,0x01,0x80,0x11,0x88,0xE1,0x87,0x01,0x80,0x01,0x80,0xFF,0xFF,
    
};

unsigned int seg[]=
{
    0x0001,0x0002,0x0004,0x0008,0x0010,0x0020,0x0040,0x0080,0x0100,0x0200,0x0400,0x0800,0x1000,0x2000,0x4000,0x8000
};

void SendByte(unsigned char dat)
{
    unsigned char i;
    
    for(i=0;i<8;i++)
    {
        SRCLK->write(0);
        SER->write(dat&0x80);
        dat<<=1;
        SRCLK->write(1);
    }
}

void SendByteG(unsigned char dat)
{
    unsigned char i;
    
    for(i=0;i<8;i++)
    {
        SRCLK->write(0);
        SERG->write(dat&0x80);
        dat<<=1;
        SRCLK->write(1);
    }
}

void SendByte1(unsigned char dat)
{
    unsigned char i;
    
    for(i=0;i<8;i++)
    {
        SRCLK_B->write(0);
        SER_B->write(dat&0x80);
        dat<<=1;
        SRCLK_B->write(1);
    }
}

void SendSer(unsigned char dat1,unsigned char dat2)
{
    SendByte(dat1);
    SendByte(dat2);
    LATCH->write(0);
    usleep(100);
    LATCH->write(1);
}

void SendSerG(unsigned char dat1,unsigned char dat2)
{
    SendByteG(dat1);
    SendByteG(dat2);
    LATCH->write(0);
    usleep(100);
    LATCH->write(1);
}

void SendSeg(unsigned int a)
{
    SendByte1(a>>8);
    SendByte1(a);
    
    LATCH_B->write(0);  
    usleep(100);
    LATCH_B->write(1);
}

void run_screen_uv_timer(uv_timer_t *req)
{
    int i = 0;
    for(i=0;i<16;i++)
    {
        SendSer(0xff,0xff);
        SendSeg(seg[i]);
        SendSer(~tab[32*face+2*i+1],~tab[32*face+2*i]);
        usleep(500);
    }
}

int screenInit(screenConfig config)
{
    ScreenConfig = config;
    
    SER = new mraa::Gpio(13);
    LATCH = new mraa::Gpio(12);
    SRCLK = new mraa::Gpio(11);
    SERG = new mraa::Gpio(10);
    LATCH_B = new mraa::Gpio(9);
    SRCLK_B = new mraa::Gpio(8);
    SER_B  = new mraa::Gpio(1);
    
    SER->dir(mraa::DIR_OUT);
    LATCH->dir(mraa::DIR_OUT);
    SRCLK->dir(mraa::DIR_OUT);
    SERG->dir(mraa::DIR_OUT);
    LATCH_B->dir(mraa::DIR_OUT);
    SRCLK_B->dir(mraa::DIR_OUT);
    SER_B->dir(mraa::DIR_OUT);
    
    printf("initialized screen\n");
    SendSerG(0xff,0xff);
    SendSer(0xff,0xff);
    // Initialize uv loop and timer
    uv_timer_stop(&screenTimer);
    
    if(screenLoop == NULL) {
        screenLoop = uv_default_loop();
    }
    uv_timer_init((uv_loop_t*)screenLoop, &screenTimer);
    screenTimer.data = NULL;
    
    uv_timer_start(&screenTimer, run_screen_uv_timer, 0, config.refreshFreq);
    
    return ERR_NONE;
}

int screenRelease()
{
    printf("turn off screen\n");
    uv_timer_stop(&screenTimer);
    
    SendSerG(0xff,0xff);
    SendSer(0xff,0xff);
    
    delete SER;
    delete LATCH;
    delete SRCLK;
    delete SERG;
    delete LATCH_B;
    delete SRCLK_B;
    delete SER_B;
    
    return ERR_NONE;
}

int screenOnData(int faceId)
{
    face = faceId;
    
    return ERR_NONE;
}

