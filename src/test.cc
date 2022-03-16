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
  //  img.fillC(20, 20, 0, 0, 255, 0, 255);
  //  CImg<unsigned char> img2(100, 100, 1, 3);
  //
  //
  //  unsigned char purple[] = {255, 0, 255};
  //
  //  img2.fill(128);
  //  img2.draw_rectangle(20, 20, 60, 60, (unsigned char[]){255,0,0});
  //
  //
  //  CImg<> img3(img2);
  //
  //  img2.resize(-60, -60);
  //  // img.load("/Users/branson/Desktop/lab/cimg-lab/emoji.jpg");
  //  img.draw_text(100, 100, "hello my", purple, NULL, 1, 40);
  //  img.draw_image(100, 100, img3);
  //  img.draw_image(0, 0, img2);
  // img.save_png("lala.png");
  //  std::cout << "width: " << img.width() << "height: " << img.height() << "\n";
  //
  std::cout << "done\n";

  return 0;
}
