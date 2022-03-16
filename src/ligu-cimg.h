#pragma once
#include "overriden.h"
#include "CImg.h"

struct ImgStat
{
public:
  void *buf;
  long long size;
};

struct CImgWASM8Bit : cil::CImg<unsigned char>
{
public:
  CImgWASM8Bit() : cil::CImg<unsigned char>()
  {}

  ImgStat exportPNG();
  ImgStat exportJPEG(unsigned char = 100);
  void blur_symmetric(float sigma, unsigned int boundary_conditions=1, bool is_gaussian=true);
};

using CImgWASM16Bit = cil::CImg<unsigned short>;

using CImgWASM32Bit = cil::CImg<unsigned int>;
