#include <iostream>
#include <fstream>
#include <sys/stat.h>

using namespace std;

int main()
{
  char arr[14];
  sprintf(arr, "%X", 83131);
  strcat(arr, ".jpeg");

  printf("%s", arr);
  // struct stat st;
  // stat("from-wasm.png", &st);

  // char *buf = new char[st.st_size];
  // ifstream f1{"from-wasm.png", fstream::binary};
  // ofstream f2{"copied.png", fstream::binary};

  // f1.read(buf, st.st_size);
  // f2.write(buf, st.st_size);
  // printf("%lld\n", st.st_size);

  // for (int i = 4000; i < 4040; i++)
  // {
  //   printf("%d ", buf[i]);
  // }

  // delete[] buf;

  return 0;
}