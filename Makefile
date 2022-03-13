zlib_path = ./deps/libpng/deps/zlib-1.2.11
zlib_build_path = $(zlib_path)/build

jpeg_path = ./deps/jpeg-9e
jpeg_build_path = $(jpeg_path)/.libs

png_path = ./deps/libpng
png_build_path = $(png_path)/build

source_files = src/basic.cc

emcc_opt = -s ALLOW_MEMORY_GROWTH=1

default_target: all

all: build-jpeg build-zlib build-png

clean: clean-png clean-zlib clean-jpeg

declare-jconfig:
	cp ./include/jconfig.h ./deps/jpeg-9e

link-lib:
	emcc $(emcc_opt) -o basic.html -lpng -ljpeg -lz -L$(zlib_build_path) -L$(jpeg_build_path) -L$(png_build_path) basic.o

build-lib-obj:
	emcc -c -I$(zlib_path) -Iinclude -I$(zlib_build_path) -I$(jpeg_path) -I$(png_path) -I$(png_build_path) $(source_files)

build-jpeg:
	cd ./deps/jpeg-9e && \
	emconfigure ./configure --disable-dependency-tracking && \
	dos2unix -f ./libtool && \
	emmake make

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

clean-jpeg:
	cd ./deps/jpeg-9e && make clean

clean-zlib:
	rm -rf ./deps/libpng/deps/zlib/build

clean-png:
	rm -rf ./deps/libpng/build
	