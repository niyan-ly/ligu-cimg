#ifndef __Ligu_CImg__
#define __Ligu_CImg__
#endif

#include <iostream>
#include <fstream>
#include <random>
#include "overriden.h"
#include "CImg.h"

static std::random_device rd;
static std::mt19937 random_f_name(rd());

struct ImgStat
{
public:
  void *buf;
  long long size;
};

ImgStat read_f_data(char *f_name);

template<typename T>
struct CImgWASM : cil::CImg<T>
{
public:
  CImgWASM() : cil::CImg<T>()
  {}
  
  void x_set_data(T value, unsigned int x, unsigned int y = 0, unsigned int z = 0, unsigned int c = 0)
  {
    (*this)(x, y, z, c) = value;
  }

  ImgStat exportPNG()
  {
    char f_name[15];
    sprintf(f_name, "%X", random_f_name());
    std::strcat(f_name, ".png");
    auto conn = std::fopen(f_name, "w+");
    
    this->save_png(conn);
    std::fclose(conn);

    ImgStat stat = read_f_data(f_name);
    std::remove(f_name);

    return stat;
  }
  
  ImgStat exportJPEG(unsigned char quality = 100)
  {
    char f_name[15];
    sprintf(f_name, "%X", random_f_name());
    std::strcat(f_name, ".jpeg");
    auto conn = std::fopen(f_name, "w+");
    this->save_jpeg(f_name, quality);

    ImgStat stat = read_f_data(f_name);
    std::remove(f_name);

    return stat;
  }
  
  void blur_symmetric(float sigma, unsigned int boundary_conditions=1, bool is_gaussian=true)
  {
    this->blur(sigma, boundary_conditions, is_gaussian);
  }
};

using CImgWASM8Bit = CImgWASM<unsigned char>;

using CImgWASM16Bit = CImgWASM<unsigned short>;

using CImgWASM32Bit = CImgWASM<unsigned int>;
