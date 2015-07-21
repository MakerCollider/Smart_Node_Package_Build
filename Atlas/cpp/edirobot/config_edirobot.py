import os

INPUT_DIR = './'
INPUT_DECL_PATHS  = [
   INPUT_DIR + "/edi_robot.h"
]

INPUT_LIB_PATH = INPUT_DIR + '/bin/libedirobot.a'

ATLAS_PATH           = '../..'
NODERED_PATH         = ATLAS_PATH + '/atlas_nodes/edirobot'
INSTALL_DIR          = NODERED_PATH + '/addon'
EXTRA_LIB            = '/usr/lib/libmraa.so'

AUTOGEN_TEST = 0

DEBUG = 1

