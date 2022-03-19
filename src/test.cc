#define cimg_use_cpp11 1
#define cimg_OS 0
#define cimg_use_png
#include <iostream>
#include "CImg.h"
//#include "ligu-cimg.h"

using namespace cimg_library;

int main()
{
//  CImgWASM img;
  CImg<unsigned char> img;
  CImg<unsigned char> points(5, 2);

  img.crop(10, 10);
  img.assign(40, 36, 1, 3);
  img.draw_fill(0, 0, (unsigned char[]){200,200,0});
  unsigned char thePoints[] = {40,40,40,200,100,180,120,100,100,40};
  unsigned char *ptr = thePoints;
  cimg_forY(points, i)
  {
    points(0, i) = *(ptr++);
    points(1, i) = *(ptr++);
  }
//  img.draw_polygon(points, (unsigned char[]){255, 0, 0, 255}, 1, 100);

  img.save_jpeg("img.jpeg");
  std::cout << "done\n";

  return 0;
}
