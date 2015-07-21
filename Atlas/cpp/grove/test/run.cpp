#include <grove.h>
#include <uv.h>
#include <stdio.h>
#include "upm/jhd1313m1.h"

using namespace std;

static lcdConfig LcdConfig = {
    lcdConfig_freq,
};

void LCDDisp(char *str)                
{                                           
    printf("%s\n", str);                 
} 

int main( int argc, char** argv )
{
    //namedWindow("camera");
    //namedWindow("fakeCamera");
    //namedWindow("faces");

    lcdInit(LcdConfig, LCDDisp);
    lcdOnData("Hello World!");
    uv_loop_t *loop = (uv_loop_t*)uv_default_loop();
    uv_run(loop, UV_RUN_DEFAULT);  
 
}
