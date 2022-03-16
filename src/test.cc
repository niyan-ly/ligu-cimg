#define cimg_use_cpp11 1
#define cimg_OS 0
#define cimg_use_png
#include <iostream>
#include "CImg.h"

using namespace cimg_library;

int main()
{
  CImg<unsigned char> img;
  img.assign(2,2, 2, 4, 255);
  img.fillC(0, 0, 1, 111);
  img.fillC(0, 0, 0, 128, 200, 128, 255);

  for (int i = 0; i < img.size(); i++)
  {
    printf("%d ", img.data()[i]);
  }

  std::cout << "done\n";

  return 0;
}
