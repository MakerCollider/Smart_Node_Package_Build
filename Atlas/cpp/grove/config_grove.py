import os

INPUT_DIR = './'
INPUT_DECL_PATHS  = [
   INPUT_DIR + "/grove_kit.h"
]

INPUT_LIB_PATH = INPUT_DIR + '/bin/libgrove.a'

ATLAS_PATH           = '../..'
NODERED_PATH         = ATLAS_PATH + '/atlas_nodes/grove' 
INSTALL_DIR          = NODERED_PATH + '/addon'
EXTRA_LIB            = '/usr/lib/libupm-i2clcd.so /usr/lib/libmraa.so /usr/lib/libupm-grove.so /usr/lib/libupm-buzzer.so /usr/lib/libupm-ttp223.so /usr/lib/libupm-mic.so'

AUTOGEN_TEST = 0

DEBUG = 1

