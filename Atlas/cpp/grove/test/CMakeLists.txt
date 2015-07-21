cmake_minimum_required(VERSION 2.8)
project( LCDDisplay )

set(Root "${CMAKE_CURRENT_SOURCE_DIR}/..")
SET(UV_INC /usr/include)
SET(UV_LIB /usr/lib)

include_directories(${Root})
include_directories(${UV_INC}) 

link_directories(${UV_LIB})
link_directories(${Root}/bin)

add_executable( LCDDisplay run.cpp)

target_link_libraries( LCDDisplay uv grove )

