cmake_minimum_required(VERSION 3.20)
project(cimg-wasm VERSION 1.0.0)

set(CMAKE_CXX_STANDARD 11)

find_package(PNG)
find_package(JPEG)

if(JPEG_FOUND)

  link_directories(${JPEG_LIB_DIRS})
  include_directories(${JPEG_INCLUDE_DIR})
  SET(SYSTEM_LIBS ${SYSTEM_LIBS} ${JPEG_LIBRARIES})
endif()

if(PNG_FOUND)

  link_directories(${PNG_LIB_DIRS})
  include_directories(${PNG_INCLUDE_DIR})
  SET(SYSTEM_LIBS ${SYSTEM_LIBS} ${PNG_LIBRARIES})
endif()
include_directories(include)

add_library(cimg-wasm
  src/cimg-wasm.cc
)
target_link_libraries(cimg-wasm ${SYSTEM_LIBS})

add_executable(basic
  src/test.cc
)