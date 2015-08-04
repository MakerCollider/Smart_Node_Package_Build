cmake_minimum_required(VERSION 2.8)
project( edirobot )

SET(MRAA_INC /usr/include)
SET(MRAA_LIB /usr/lib)

set(Root "${CMAKE_CURRENT_SOURCE_DIR}")

include_directories(${MRAA_INC})
include_directories(${Root})

link_directories(${MRAA_LIB})

add_library(edirobot STATIC
            screen.cpp)

set_target_properties(                         
  edirobot
  PROPERTIES                                   
  ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_CURRENT_LIST_DIR}/bin")
