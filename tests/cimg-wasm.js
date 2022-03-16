const assert = require("assert");
const { createWriteStream } = require("fs");
const loadModule = require("../out/ligu-cimg");

loadModule().then((m) => {
  const img = new m.CImgWASM8Bit();
  img.assign(100, 100, 1, 4);
  img.draw_rectangle(10, 10, 40, 40, [255, 255, 0, 128]);
  img.blur(3, 1, 0);
  // img.draw_fill(40, 40, 0, [255, 255, 255, 255]);
  const stat = img.exportPNG();
  console.log(stat.buf, stat.size);
  const pngData = m.HEAPU8.slice(stat.buf, stat.buf + stat.size);
  createWriteStream("123.png").write(pngData);

  // assert(img.spectrum() == 3);
  // assert(img.width() == 1000);
});
