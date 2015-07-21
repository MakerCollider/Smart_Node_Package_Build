cmake_minimum_required(VERSION 2.8)
project( indoor )

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

add_library(indoor STATIC
            uv_sensor.cpp
            encoder.cpp
            moisture.cpp
            temp_humi.cpp
            motion.cpp)

set_target_properties(                         
  indoor                                    
  PROPERTIES                                   
  ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_CURRENT_LIST_DIR}/bin")
