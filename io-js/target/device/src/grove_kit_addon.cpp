/* ----------------------------------------------------------------------------
 * This file was automatically generated by io-js-autogen Version 0.0.1
 *
 * Do not make changes to this file unless you know what you are doing--modify the
 * C header file instead.
 * ----------------------------------------------------------------------------- */
#include "grove_kit_addon.h"
#include "stdlib.h"
#include "string.h"
#include "_globalvar.h"

using namespace v8;


// 29: extern int lcdInit ( lcdConfig config , lcdCb cb ) ;
Handle<Value> lcdInitV8(const Arguments &args) {
    HandleScope scope;
    
    // Convert V8 parameters to C++
    
    V8_ASSERT(args[0]->IsObject(), "args[0] parameters error!");
    Local<Value> args0_colorr = args[0]->ToObject()->Get(String::New("colorr"));
    V8_ASSERT(!args0_colorr->IsNull() && args0_colorr->IsInt32(), "arg0.colorr parameter error");
    int arg0_colorr = (int)args0_colorr->IntegerValue();
    
    Local<Value> args0_colorg = args[0]->ToObject()->Get(String::New("colorg"));
    V8_ASSERT(!args0_colorg->IsNull() && args0_colorg->IsInt32(), "arg0.colorg parameter error");
    int arg0_colorg = (int)args0_colorg->IntegerValue();
    
    Local<Value> args0_colorb = args[0]->ToObject()->Get(String::New("colorb"));
    V8_ASSERT(!args0_colorb->IsNull() && args0_colorb->IsInt32(), "arg0.colorb parameter error");
    int arg0_colorb = (int)args0_colorb->IntegerValue();
    
    lcdConfig arg0;
    arg0.colorr = arg0_colorr;
    arg0.colorg = arg0_colorg;
    arg0.colorb = arg0_colorb;
    
    
    V8_ASSERT(args[1]->IsFunction(), "args[1] parameters error!");
    cbArray[0] = Persistent<Function>::New(Local<Function>::Cast(args[1]));
    lcdCb arg1;;
    arg1 = cbFunc0;
    
        
    // Call C++ function
    int ret = (int)lcdInit(arg0, arg1);
    
    
    
    // Convert C++ return value to V8
    Handle<Value> retV8 = Int32::New(ret);
    
    return scope.Close(retV8);
    
}
// 30: extern int lcdRelease ( ) ;
Handle<Value> lcdReleaseV8(const Arguments &args) {
    HandleScope scope;
        
    // Call C++ function
    int ret = (int)lcdRelease();
    
    
    
    // Convert C++ return value to V8
    Handle<Value> retV8 = Int32::New(ret);
    
    return scope.Close(retV8);
    
}
// 31: extern int lcdOnData ( char * str ) ;
Handle<Value> lcdOnDataV8(const Arguments &args) {
    HandleScope scope;
    
    // Convert V8 parameters to C++
    
    V8_ASSERT((args[0]->IsString() || args[0]->IsObject()), "args[0] parameters error!");
    char *arg0;
    int idx0;
    int len0;
    if (args[0]->IsString()) {
        v8::String::AsciiValue args0_at(args[0]->ToString());
        len0 = strlen(*args0_at) + 1;
        arg0 = new char[len0];
        strcpy(arg0, *args0_at);
    } else {
        Local<Array> args0_at = Local<Array>::Cast(args[0]);
        len0 = args0_at->Length() + 1;
        arg0 = new char[len0];
        for (idx0 = 0; idx0 < len0 - 1; idx0++) {
            Local<Value> args0_a = args0_at->Get(idx0);
            V8_ASSERT(!args0_a->IsNull() && args0_a->IsInt32(), "arg0[%d] parameter error", idx0);
            arg0[idx0] = (char)args0_a->IntegerValue();
        }
        arg0[idx0] = 0;
    }
    
        
    // Call C++ function
    int ret = (int)lcdOnData(arg0);
    
    // Convert C++ parameters passed by pointer to V8
    
    int idx0_r;
    int len0_r;
    if (args[0]->IsString()) {
        v8::String::AsciiValue args0_ar(args[0]->ToString());
        const char *oldStr = *args0_ar;
        len0_r = strlen(*args0_ar) + 1;
    
        for (idx0_r = 0; idx0_r < len0_r; idx0_r++) {
            if (oldStr[idx0_r] != arg0[idx0_r])
                V8_ASSERT(false, "String arg0 is Changed in C function, \
                          Please Use Buffer or Integer Array to map 'char *' in JS");
        }
    } else {
        Local<Array> args0_ar = Local<Array>::Cast(args[0]);
        len0_r = args0_ar->Length() + 1;
        for (idx0_r = 0; idx0_r < len0_r; idx0_r++) {
            args0_ar->Set(idx0_r, Int32::New(arg0[idx0_r]));
        }
    }
    
    if (arg0) delete [] arg0;
    
    
    // Convert C++ return value to V8
    Handle<Value> retV8 = Int32::New(ret);
    
    return scope.Close(retV8);
    
}
// 46: extern int ledInit ( ledConfig config , ledCb cb ) ;
Handle<Value> ledInitV8(const Arguments &args) {
    HandleScope scope;
    
    // Convert V8 parameters to C++
    
    V8_ASSERT(args[0]->IsObject(), "args[0] parameters error!");
    Local<Value> args0_pin = args[0]->ToObject()->Get(String::New("pin"));
    V8_ASSERT(!args0_pin->IsNull() && args0_pin->IsInt32(), "arg0.pin parameter error");
    int arg0_pin = (int)args0_pin->IntegerValue();
    
    ledConfig arg0;
    arg0.pin = arg0_pin;
    
    
    V8_ASSERT(args[1]->IsFunction(), "args[1] parameters error!");
    cbArray[1] = Persistent<Function>::New(Local<Function>::Cast(args[1]));
    ledCb arg1;;
    arg1 = cbFunc1;
    
        
    // Call C++ function
    int ret = (int)ledInit(arg0, arg1);
    
    
    
    // Convert C++ return value to V8
    Handle<Value> retV8 = Int32::New(ret);
    
    return scope.Close(retV8);
    
}
// 47: extern int ledRelease ( ) ;
Handle<Value> ledReleaseV8(const Arguments &args) {
    HandleScope scope;
        
    // Call C++ function
    int ret = (int)ledRelease();
    
    
    
    // Convert C++ return value to V8
    Handle<Value> retV8 = Int32::New(ret);
    
    return scope.Close(retV8);
    
}
// 48: extern int ledOnData ( int val ) ;
Handle<Value> ledOnDataV8(const Arguments &args) {
    HandleScope scope;
    
    // Convert V8 parameters to C++
    
    V8_ASSERT(args[0]->IsInt32(), "args[0] parameters error!");
    int arg0 = (int)args[0]->IntegerValue();
    
        
    // Call C++ function
    int ret = (int)ledOnData(arg0);
    
    
    
    // Convert C++ return value to V8
    Handle<Value> retV8 = Int32::New(ret);
    
    return scope.Close(retV8);
    
}
// 68: extern int rotaryInit ( rotaryConfig config , rotaryDegreeCb degCb , rotaryThreCb threCb ) ;
Handle<Value> rotaryInitV8(const Arguments &args) {
    HandleScope scope;
    
    // Convert V8 parameters to C++
    
    V8_ASSERT(args[0]->IsObject(), "args[0] parameters error!");
    Local<Value> args0_aioPin = args[0]->ToObject()->Get(String::New("aioPin"));
    V8_ASSERT(!args0_aioPin->IsNull() && args0_aioPin->IsInt32(), "arg0.aioPin parameter error");
    int arg0_aioPin = (int)args0_aioPin->IntegerValue();
    
    Local<Value> args0_interval = args[0]->ToObject()->Get(String::New("interval"));
    V8_ASSERT(!args0_interval->IsNull() && args0_interval->IsInt32(), "arg0.interval parameter error");
    int arg0_interval = (int)args0_interval->IntegerValue();
    
    Local<Value> args0_threshold = args[0]->ToObject()->Get(String::New("threshold"));
    V8_ASSERT(!args0_threshold->IsNull() && args0_threshold->IsInt32(), "arg0.threshold parameter error");
    int arg0_threshold = (int)args0_threshold->IntegerValue();
    
    rotaryConfig arg0;
    arg0.aioPin = arg0_aioPin;
    arg0.interval = arg0_interval;
    arg0.threshold = arg0_threshold;
    
    
    V8_ASSERT(args[1]->IsFunction(), "args[1] parameters error!");
    cbArray[2] = Persistent<Function>::New(Local<Function>::Cast(args[1]));
    rotaryDegreeCb arg1;;
    arg1 = cbFunc2;
    
    
    V8_ASSERT(args[2]->IsFunction(), "args[2] parameters error!");
    cbArray[3] = Persistent<Function>::New(Local<Function>::Cast(args[2]));
    rotaryThreCb arg2;;
    arg2 = cbFunc3;
    
        
    // Call C++ function
    int ret = (int)rotaryInit(arg0, arg1, arg2);
    
    
    
    // Convert C++ return value to V8
    Handle<Value> retV8 = Int32::New(ret);
    
    return scope.Close(retV8);
    
}
// 69: extern int rotaryRelease ( ) ;
Handle<Value> rotaryReleaseV8(const Arguments &args) {
    HandleScope scope;
        
    // Call C++ function
    int ret = (int)rotaryRelease();
    
    
    
    // Convert C++ return value to V8
    Handle<Value> retV8 = Int32::New(ret);
    
    return scope.Close(retV8);
    
}
// 70: extern int rotaryOnData ( int toggle ) ;
Handle<Value> rotaryOnDataV8(const Arguments &args) {
    HandleScope scope;
    
    // Convert V8 parameters to C++
    
    V8_ASSERT(args[0]->IsInt32(), "args[0] parameters error!");
    int arg0 = (int)args[0]->IntegerValue();
    
        
    // Call C++ function
    int ret = (int)rotaryOnData(arg0);
    
    
    
    // Convert C++ return value to V8
    Handle<Value> retV8 = Int32::New(ret);
    
    return scope.Close(retV8);
    
}
// 85: extern int relayInit ( relayConfig config , relayCb cb ) ;
Handle<Value> relayInitV8(const Arguments &args) {
    HandleScope scope;
    
    // Convert V8 parameters to C++
    
    V8_ASSERT(args[0]->IsObject(), "args[0] parameters error!");
    Local<Value> args0_pin = args[0]->ToObject()->Get(String::New("pin"));
    V8_ASSERT(!args0_pin->IsNull() && args0_pin->IsInt32(), "arg0.pin parameter error");
    int arg0_pin = (int)args0_pin->IntegerValue();
    
    relayConfig arg0;
    arg0.pin = arg0_pin;
    
    
    V8_ASSERT(args[1]->IsFunction(), "args[1] parameters error!");
    cbArray[4] = Persistent<Function>::New(Local<Function>::Cast(args[1]));
    relayCb arg1;;
    arg1 = cbFunc4;
    
        
    // Call C++ function
    int ret = (int)relayInit(arg0, arg1);
    
    
    
    // Convert C++ return value to V8
    Handle<Value> retV8 = Int32::New(ret);
    
    return scope.Close(retV8);
    
}
// 86: extern int relayRelease ( ) ;
Handle<Value> relayReleaseV8(const Arguments &args) {
    HandleScope scope;
        
    // Call C++ function
    int ret = (int)relayRelease();
    
    
    
    // Convert C++ return value to V8
    Handle<Value> retV8 = Int32::New(ret);
    
    return scope.Close(retV8);
    
}
// 87: extern int relayOnData ( int toggle ) ;
Handle<Value> relayOnDataV8(const Arguments &args) {
    HandleScope scope;
    
    // Convert V8 parameters to C++
    
    V8_ASSERT(args[0]->IsInt32(), "args[0] parameters error!");
    int arg0 = (int)args[0]->IntegerValue();
    
        
    // Call C++ function
    int ret = (int)relayOnData(arg0);
    
    
    
    // Convert C++ return value to V8
    Handle<Value> retV8 = Int32::New(ret);
    
    return scope.Close(retV8);
    
}
static void SetMemberFunc(Handle<Object> obj) {
    obj->Set(v8::String::NewSymbol("lcdInit"),
           FunctionTemplate::New(lcdInitV8)->GetFunction());

    obj->Set(v8::String::NewSymbol("lcdRelease"),
           FunctionTemplate::New(lcdReleaseV8)->GetFunction());

    obj->Set(v8::String::NewSymbol("lcdOnData"),
           FunctionTemplate::New(lcdOnDataV8)->GetFunction());

    obj->Set(v8::String::NewSymbol("ledInit"),
           FunctionTemplate::New(ledInitV8)->GetFunction());

    obj->Set(v8::String::NewSymbol("ledRelease"),
           FunctionTemplate::New(ledReleaseV8)->GetFunction());

    obj->Set(v8::String::NewSymbol("ledOnData"),
           FunctionTemplate::New(ledOnDataV8)->GetFunction());

    obj->Set(v8::String::NewSymbol("rotaryInit"),
           FunctionTemplate::New(rotaryInitV8)->GetFunction());

    obj->Set(v8::String::NewSymbol("rotaryRelease"),
           FunctionTemplate::New(rotaryReleaseV8)->GetFunction());

    obj->Set(v8::String::NewSymbol("rotaryOnData"),
           FunctionTemplate::New(rotaryOnDataV8)->GetFunction());

    obj->Set(v8::String::NewSymbol("relayInit"),
           FunctionTemplate::New(relayInitV8)->GetFunction());

    obj->Set(v8::String::NewSymbol("relayRelease"),
           FunctionTemplate::New(relayReleaseV8)->GetFunction());

    obj->Set(v8::String::NewSymbol("relayOnData"),
           FunctionTemplate::New(relayOnDataV8)->GetFunction());
}


// Const defined by macros
static void SetConst(Handle<Object> obj) {

    obj->Set(v8::String::NewSymbol("ERR_NONE"),
             Int32::New(0));

    obj->Set(v8::String::NewSymbol("ERR_UNKOWN"),
             Int32::New(-1));

    obj->Set(v8::String::NewSymbol("lcdHelp"),
             v8::String::New("this is the node for RGB Lcd in Grove starter kit plus. \
 input: string to display. \
 output: \
 1. LCD color red. \
 2. LCD color green. \
 3. LCD color blue."));

    obj->Set(v8::String::NewSymbol("lcdClass"),
             v8::String::New("grove"));

    obj->Set(v8::String::NewSymbol("lcdConfig_colorr"),
             Int32::New(254));

    obj->Set(v8::String::NewSymbol("lcdConfig_colorg"),
             Int32::New(254));

    obj->Set(v8::String::NewSymbol("lcdConfig_colorb"),
             Int32::New(254));

    obj->Set(v8::String::NewSymbol("ledClass"),
             v8::String::New("grove"));

    obj->Set(v8::String::NewSymbol("ledConfig_pin"),
             Int32::New(0));

    obj->Set(v8::String::NewSymbol("rotaryClass"),
             v8::String::New("grove"));

    obj->Set(v8::String::NewSymbol("rotaryConfig_aioPin"),
             Int32::New(0));

    obj->Set(v8::String::NewSymbol("rotaryConfig_interval"),
             Int32::New(300));

    obj->Set(v8::String::NewSymbol("rotaryConfig_threshold"),
             Int32::New(150));

    obj->Set(v8::String::NewSymbol("relayClass"),
             v8::String::New("grove"));

    obj->Set(v8::String::NewSymbol("relayConfig_pin"),
             Int32::New(0));

}

// Const defined by enumeration
static void SetEnumConst(Handle<Object> obj) {

}
static void SetGlobalVarFunc(Handle<Object> obj) {
}

void Initgrove_kit(Handle<Object> exports) {

    SetMemberFunc(exports);

    SetConst(exports);

    SetEnumConst(exports);

    SetGlobalVarFunc(exports);
}
