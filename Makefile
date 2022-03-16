lib_name = ligu-cimg

zlib_path = ./deps/libpng/deps/zlib-1.2.11
zlib_build_path = $(zlib_path)/build

jpeg_path = ./deps/jpeg-9e
jpeg_build_path = $(jpeg_path)/.libs

png_path = ./deps/libpng
png_build_path = $(png_path)/build

source_files = src/$(lib_name).cc src/idl-wrapper.cc

js_exported = _malloc

emcc_opt = -s MODULARIZE=1 -s EXPORTED_RUNTIME_METHODS=FS -s ALLOW_MEMORY_GROWTH=1 -s EXPORTED_FUNCTIONS=$(js_exported) --post-js idl/connect.js --js-library src/extern.js

cxx_link = -lpng -ljpeg -lz -L$(zlib_build_path) -L$(jpeg_build_path) -L$(png_build_path)

default_target: all

all: build-jpeg build-zlib build-png idl-gen build-lib

clean: clean-png clean-zlib clean-jpeg clean-idl

declare-jconfig:
	cp ./include/jconfig.h ./deps/jpeg-9e

build-lib:
	emcc -o out/$(lib_name).js $(emcc_opt) $(cxx_link) -I$(zlib_path) -Iinclude -Iidl -I$(zlib_build_path) -I$(jpeg_path) -I$(png_path) -I$(png_build_path) $(source_files)

build-jpeg-lib:
	cd ./deps/jpeg-9e && \
	emconfigure ./configure --disable-dependency-tracking && \
	dos2unix -f ./libtool && \
	emmake make

build-jpeg: build-jpeg-lib declare-jconfig

build-png:
	cd  ./deps/libpng && \
	mkdir -p build && cd build && \
	emcmake cmake .. && \
	emmake make

build-zlib:
	cd ./deps/libpng/deps/zlib-1.2.11 && \
	mkdir -p build && cd build && \
	emcmake cmake .. && \
	emmake make

idl-gen:
	cd ./idl && \
	webidl_binder $(lib_name).idl connect

clean-idl:
	cd ./idl && \
	rm *.cpp *.js

clean-jpeg:
	cd ./deps/jpeg-9e && make clean

clean-zlib:
	rm -rf ./deps/libpng/deps/zlib/build

clean-png:
	rm -rf ./deps/libpng/build
	