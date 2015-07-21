import os

INPUT_DIR = './'
INPUT_DECL_PATHS  = [
   INPUT_DIR + "/indoor_kit.h"
]

INPUT_LIB_PATH = INPUT_DIR + '/bin/libindoor.a'

ATLAS_PATH           = '../..'
NODERED_PATH         = ATLAS_PATH + '/atlas_nodes/indoor' 
INSTALL_DIR          = NODERED_PATH + '/addon'
EXTRA_LIB            = '/usr/lib/libupm-guvas12d.so /usr/lib/libmraa.so /usr/lib/libupm-rotaryencoder.so /usr/lib/libupm-grovemoisture.so /usr/lib/libupm-th02.so /usr/lib/libupm-biss0001.so'

AUTOGEN_TEST = 0

DEBUG = 1

