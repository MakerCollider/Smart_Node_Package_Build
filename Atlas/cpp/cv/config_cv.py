
import os

INPUT_DIR = './'
INPUT_DECL_PATHS  = [
   INPUT_DIR + "/cv_atlas.h",
   INPUT_DIR + "/cv_tool.h"
]

INPUT_LIB_PATH = INPUT_DIR + '/bin/libatlas_cv.a'

ATLAS_PATH           = '../..'
NODERED_PATH         = ATLAS_PATH + '/atlas_nodes/cv' 
INSTALL_DIR          = NODERED_PATH + '/addon'
EXTRA_LIB            = os.popen('pkg-config --libs opencv').read().replace('\n', '')

AUTOGEN_TEST = 0

DEBUG = 1
