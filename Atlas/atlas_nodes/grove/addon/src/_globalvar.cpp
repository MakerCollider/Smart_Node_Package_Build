/* ----------------------------------------------------------------------------
 * This file was automatically generated by io-js-autogen Version 0.0.1
 *
 * Do not make changes to this file unless you know what you are doing--modify the
 * C header file instead.
 * ----------------------------------------------------------------------------- */
#include "_globalvar.h"
#include <map>
#include "stdlib.h"

Persistent<Function> cbArray[3];

std::map <void *, Persistent<Object> > CClassToJsObjMap;
std::map <void *, Persistent<Object> >::iterator iter;
Persistent<Object> JSObj;


void cbFunc0(float arg0) {
    HandleScope scope;
    const unsigned argc = 1;
    Local<Value> argv[argc];

    argv[0] = Number::New(arg0);
    
    cbArray[0]->Call(Context::GetCurrent()->Global(), argc, argv);
    
    

    return;
}

void cbFunc1(int arg0) {
    HandleScope scope;
    const unsigned argc = 1;
    Local<Value> argv[argc];

    argv[0] = Int32::New(arg0);
    
    cbArray[1]->Call(Context::GetCurrent()->Global(), argc, argv);
    
    

    return;
}

void cbFunc2(int arg0) {
    HandleScope scope;
    const unsigned argc = 1;
    Local<Value> argv[argc];

    argv[0] = Int32::New(arg0);
    
    cbArray[2]->Call(Context::GetCurrent()->Global(), argc, argv);
    
    

    return;
}
