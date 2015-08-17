#include "mraa.hpp"

class LED_16_16{
private:
	//LED阵列接口
	mraa::Spi* 	SPI;
	mraa::Gpio* PIN_A;
	mraa::Gpio* PIN_B;
	mraa::Gpio* PIN_C;
	mraa::Gpio* PIN_D;
	mraa::Gpio* PIN_EN;

public:
	LED_16_16(char nSPI, char nA, char nB, char nC, char nD, char nEN);
	~LED_16_16();
	void flash(unsigned char tab[][32], unsigned char n);	//LED阵列刷新函数
	void blank();
private:
	void hc138scan(unsigned char r);
};