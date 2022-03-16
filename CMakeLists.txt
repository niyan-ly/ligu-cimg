cmake_minimum_required(VERSION 3.20)
project(ligu-cimg VERSION 1.0.0)

set(CMAKE_CXX_STANDARD 11)

include_directories(/Users/branson/devtools/emsdk/upstream/emscripten/system/include)

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

add_library(ligu-cimg
  src/ligu-cimg.cc
)
target_link_libraries(ligu-cimg ${SYSTEM_LIBS})

add_executable(test
  src/test.cc
)
target_link_libraries(test ${SYSTEM_LIBS})