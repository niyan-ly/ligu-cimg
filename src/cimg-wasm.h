#pragma once
#include "overriden.h"
#include "CImg.h"

struct CImgWASM8Bit : cil::CImg<unsigned char>
{
public:
  CImgWASM8Bit() : cil::CImg<unsigned char>()
  {
  }

  CImgWASM8Bit(unsigned short x, unsigned short y = 1, unsigned short z = 1, unsigned short c = 1) : cil::CImg<unsigned char>(x, y, z, c)
  {
  }
  
  CImgWASM8Bit(const char *filename): cil::CImg<unsigned char>(filename)
  {
  }
  
  static CImgWASM8Bit fromFile(const char *filename)
  {
    CImgWASM8Bit ins(filename);
    
    return ins;
  }
};

using CImgWASM16Bit = cil::CImg<unsigned short>;

using CImgWASM32Bit = cil::CImg<unsigned int>;
