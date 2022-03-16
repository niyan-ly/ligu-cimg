#include <iostream>
#include <fstream>
#include <random>
#include <sys/stat.h>
#include "ligu-cimg.h"

std::random_device rd;
std::mt19937 random_f_name(rd());

ImgStat read_f_data(char *f_name)
{
  // get file size
  struct stat st;
  stat(f_name, &st);

  // allocate buf
  char *buf = new char[st.st_size];
  std::ifstream fs{f_name, std::fstream::binary};
  fs.read(buf, st.st_size);

  return ImgStat{
      .buf = buf,
      .size = st.st_size};
}

void CImgWASM8Bit::blur_symmetric(float sigma, unsigned int boundary_conditions, bool is_gaussian)
{
  blur(sigma, boundary_conditions, is_gaussian);
}

ImgStat CImgWASM8Bit::exportPNG()
{
  char f_name[15];
  sprintf(f_name, "%X", random_f_name());
  std::strcat(f_name, ".png");
  auto conn = std::fopen(f_name, "w+");
  save_png(conn);
  std::fclose(conn);

  ImgStat stat = read_f_data(f_name);
  std::remove(f_name);

  return stat;
}

ImgStat CImgWASM8Bit::exportJPEG(unsigned char quality)
{
  char f_name[15];
  sprintf(f_name, "%X", random_f_name());
  std::strcat(f_name, ".jpeg");
  auto conn = std::fopen(f_name, "w+");
  save_jpeg(f_name, quality);

  ImgStat stat = read_f_data(f_name);
  std::remove(f_name);

  return stat;
}
