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

  return 0;
}