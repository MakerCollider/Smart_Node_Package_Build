cmake_minimum_required(VERSION 2.8)
project( face_detection )
find_package( OpenCV REQUIRED )
message(STATUS "INC ${OpenCV_INCLUDE_DIRS} OK")

find_package(PkgConfig)
pkg_check_modules(LIBUV REQUIRED libuv)
message(STATUS " ${LIBUV_LIBRARY_DIRS} OK")

set(Root "${CMAKE_CURRENT_SOURCE_DIR}")
set(Base64 ${Root}/lib/libb64/src)

include_directories(${OpenCV_INCLUDE_DIRS})
include_directories(${Root})
include_directories(${Root}/lib/libb64/include) 
include_directories(${LIBUV_INCLUDE_DIRS}) 

link_directories(${LIBUV_LIBRARY_DIRS})

add_library(atlas_cv STATIC 
            cv_atlas.cpp
            cv_atlas.h
            cv_tool.h
            cv_tool.cpp 
            ${Base64}/cencode.c)

set_target_properties(
  atlas_cv
  PROPERTIES
  ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_CURRENT_LIST_DIR}/bin")
