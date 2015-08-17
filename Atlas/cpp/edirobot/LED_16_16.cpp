#include <stdlib.h>
#include <unistd.h>
#include <iostream>
#include <sys/time.h>
#include "LED_16_16.h" 

using namespace std;

LED_16_16::LED_16_16(char nSPI, char nEN, char nA, char nB, char nC, char nD)
{
	cout << "Init LED......";

    SPI = new mraa::Spi(nSPI);

    //75hc138 pin
    PIN_EN = new mraa::Gpio(nEN);
    PIN_A = new mraa::Gpio(nA);
    PIN_B = new mraa::Gpio(nB);
    PIN_C = new mraa::Gpio(nC);
    PIN_D = new mraa::Gpio(nD);
    
    PIN_A->dir(mraa::DIR_OUT);
    PIN_B->dir(mraa::DIR_OUT);
    PIN_C->dir(mraa::DIR_OUT);
    PIN_D->dir(mraa::DIR_OUT);
    PIN_EN->dir(mraa::DIR_OUT);

    usleep(10);

    cout << "OK!" << endl;
}

LED_16_16::~LED_16_16()
{
	cout << "Release LED_16_16......";
	blank();
	delete SPI;
	delete PIN_A;
	delete PIN_B;
	delete PIN_C;
	delete PIN_D;
	delete PIN_EN;
	cout << "Down!" << endl;
}

void LED_16_16::flash(unsigned char tab[][32], unsigned char n)
{
	//计算每个周期的时长
	//static struct timeval watch_dog;
	//static double timeStart, timeRecord;

	//gettimeofday(&watch_dog, NULL);
   	// timeStart = watch_dog.tv_sec + (double)(watch_dog.tv_usec / 1000) / 1000;

	//循环扫描16行
	static int row;
	for(row=0;row<16;row++)
	{
		//关闭显示
		PIN_EN->write(1);
		//换行
		hc138scan(15-row);

		//通过硬件SPI发送行信息
		SPI->writeByte(~(tab[n][row*2+1]));    
		SPI->writeByte(~(tab[n][row*2]));

		//开启显示
		//usleep(10);
		PIN_EN->write(0);  
		usleep(10);
	}

	//gettimeofday(&watch_dog, NULL);
	//timeRecord = watch_dog.tv_sec + (double)(watch_dog.tv_usec / 1000)/1000-timeStart;
	//if(timeRecord > 0.019)
		//cout << timeRecord << endl;
}

void LED_16_16::blank()
{
	PIN_EN->write(1);
}

void LED_16_16::hc138scan(unsigned char r)
{
    PIN_A->write(r & 0x01);
    PIN_B->write(r & 0x02);
    PIN_C->write(r & 0x04);
    PIN_D->write(r & 0x08);
}