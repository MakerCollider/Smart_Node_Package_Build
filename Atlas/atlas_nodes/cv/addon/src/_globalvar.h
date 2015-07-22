/* ----------------------------------------------------------------------------
 * This file was automatically generated by io-js-autogen Version 0.0.1
 *
 * Do not make changes to this file unless you know what you are doing--modify the
 * C header file instead.
 * ----------------------------------------------------------------------------- */
#ifndef _GLOBALVAR_H
#define _GLOBALVAR_H

#include <string.h>
#include <map>
#include <node.h>
#include <v8.h>

#include "cv_tool.h"
#include "cv_atlas.h"
using namespace v8;

#ifndef V8_EXCEPTION
#define V8_EXCEPTION(info) { \
    v8::ThrowException(Exception::Error(v8::String::New(info))); \
    }
#endif

#ifndef V8_ASSERT
#define V8_ASSERT(cond, ...) \
    if(!(cond)) {  \
        char buffer[512]; \
        sprintf(buffer, __VA_ARGS__); \
        V8_EXCEPTION(buffer); \
    }
#endif

extern Persistent<Function> cbArray[6];

extern std::map <void *, Persistent<Object> > CClassToJsObjMap;
extern std::map <void *, Persistent<Object> >::iterator iter;
extern Persistent<Object> JSObj;

extern void cbFunc0(unsigned long arg0);
extern void cbFunc1(unsigned long arg0);
extern void cbFunc2(int arg0);
extern void cbFunc3(unsigned long arg0);
extern void cbFunc4(int arg0, unsigned long arg1);
extern void cbFunc5(char * arg0);

#endif