#include "ligu-cimg.h"

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
