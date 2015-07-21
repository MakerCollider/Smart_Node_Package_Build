#include <stdio.h>
#include <string.h>
#include "upm/grove.h"
#include "grove_kit.h"

using namespace std;

/************************************************
 relay
 ************************************************/


static relayCb RelayCb = NULL;
relayConfig RelayConfig;
upm::GroveRelay* relay;

int relayInit(relayConfig config, relayCb cb)
{                                                              
    if(cb != NULL)                                             
        RelayCb = cb;                                             
                                                               
    RelayConfig = config;                                         
    relay = new upm::GroveRelay(config.pin);                                                           

    printf("initialized Relay\n");
                                                                                                 
    return ERR_NONE;                    
}

int relayRelease()                                                                         
{                                                                                                
    printf("switch off relay\n"); 
    relay->off();                                  
    delete relay;
                                                                                                 
    return ERR_NONE;                                                                             
}                                                                                                
                                                                                                 
int relayOnData(int toggle)                                                                
{ 
    if(toggle)
    {
        if(relay->isOff())
        {
            relay->on();
        }
    }
    else
    {
        if(relay->isOn())
        {                 
            relay->off();  
        }
    }
    RelayCb(toggle);
    return ERR_NONE;                                             
}               
