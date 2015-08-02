cmake_minimum_required(VERSION 2.8)
project( grove )

SET(MRAA_INC /usr/include)
SET(MRAA_LIB /usr/lib)
SET(UPM_INC /usr/include)
SET(UPM_LIB /usr/lib)

set(Root "${CMAKE_CURRENT_SOURCE_DIR}")

include_directories(${MRAA_INC})
include_directories(${UPM_INC})
include_directories(${Root})

link_directories(${MRAA_LIB})
link_directories(${UPM_LIB})

add_library(grove STATIC
            lcd.cpp
            led.cpp
            rotary.cpp
            relay.cpp)

set_target_properties(                         
  grove                                     
  PROPERTIES                                   
  ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_CURRENT_LIST_DIR}/bin")
