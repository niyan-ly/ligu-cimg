# CImg Web Assembly Binding

### What's this
This small utility is a `WASM` binding of the `CImg` cxx library. It exports a subset APIs from `CImg`, and adds
some handy utilities to better support Node.js. Currently supported formats includes `jpeg` & `png`. 
With `WASM` binding, this small library works just like native js module, without having to worry about network, c/c++ build environment and native libraries installation.

### Requirement
This library should be works consistently across any platforms that Node.js v12 and above support(aka wasm support).

### Setup
This package is published on `Github Packages`, so you will need a `github token` to access this package via `npm`.
Please refer to this [document](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package) to see how to install a package from github.

```shell
npm i @ninyan-ly/ligu-cimg # from github packages registry
```

### Build from source(working in progress)
That's another story to be accomplished.

### Load Ligu
After loading wasm module, there are three ways to initialize an instance, which includes `fromFile` `fromSize` and `fromBuffer`.
```ts
import { resolve } from 'path';
import { createWriteStream } from "fs";
import { loadLigu } from '@niyan-ly/ligu-cimg';

loadLigu().then(({ fromFile }) => {
  console.time("duration");
  const img = fromFile(resolve(__dirname, "./source-pic.jpg"));

  const foregroundRGBA = [85, 123, 131];
  // 0 alias as NULL pointer.
  const backgroudRGBA = 0;
  const opacity = 1;
  const fontSize = 64;
  const startPoint = { x: 40, y: 40 };
  img.drawText(
    startPoint.x,
    startPoint.y,
    "Oh hi!",
    foregroundRGBA,
    backgroudRGBA,
    opacity,
    fontSize
  );

  const pngBuffer = img.exportJPEG(40);

  console.timeEnd("duration");
  createWriteStream("lower-quality.jpeg").write(pngBuffer);
});
```

### fromFile(filename: string)
create an instance from a file.

### fromBuffer(buffer: Uint8Array, fileType: ".jpeg" | ".png")
create instace from in-memory buffer with specified file type.

### fromSize(width: number, height: number)
create an empty image with specific size.

### class: `Ligu`
Higher level apis to manipulate cimg binding.

#### Property: `width` readonly
image width
#### Property: `height` readonly
image height
#### Property: `channel` readonly
number of color channel
#### Property: `cimg`: CImgWASM8Bit
instance of `CImg` wasm binding. You can call `CImg` api directly from this instance.

#### Method: `exportPNG()`
export ligu instance data as an `png` image. Return a `Uint8Array` buffer.

#### Method: `exportJPEG(quality = 100)`
export ligu instance data as an `jpeg` image at specific `quality`. Return a `Uint8Array` buffer.

#### Method: `resizeXY(width, height)`
resize image to new dimension.
#### Method: `resizeHalfXY()`
resize image to half of origin size.

#### Method: `resizeDoubleXY()`
resize image to double of origin size.

#### Method: `fill(rgba: number[])`
fill image with `rgba` color.

#### Method: `assign(width: number, height: number)`
adjust image size and reset pixel value. Use `resize` instead to resize image size.

#### Method: `at(x: number: y: number)`
get `rgba` color value of pixel, as an integer array.

#### Method: `blur_symmetric(sigma: number, gaussion?: boolean)`
blur whole image symmetrically at specific intensity, with `gaussian blur` algorithm or not.

#### Method: `blur(sigmaHorizontal: number, sigmaVertical: number, gaussian?: boolean)`
blur whole image horizontally and vertically at specific intensity, with `gaussian blur` algorithm or not.

#### Method: `crop(x0: number, y0: number, x1: number, y1: number)`
crop image to new dimension.

#### Method: `drawImage(x: number, y: number, src: Ligu, opacity?: number)`
draw a `sprite` image on top of current instance.

#### Method: `drawPolygon(points: {x: number;y: number}[], color: number[])`
draw a filled polygon 

#### Method: `draw_circle(x0: number, y0: number, radius: number, color: number[])`
draw a filled circle

#### Method: `drawEllipse(x0: number, y0: number, r1: float, r2: float, angle: float, colour: number[], opacity?: float)`
draw ellipse

#### Method: `drawText(x0: number, y0: number, text: string, foreground_color: number[], background_color?: number[], opacity?: float, font_height?: number)`
draw text, passing `0` as NULL pointer if `background_color` should be omited.

#### Method: `drawLine(x0: number, y0: number, x1: number, y1: number, color: number[], opacity?: float, pattern?: number, init_hatch?: boolean)`
draw 2d line
#### Method: `drawAxes(x0: number, x1: number, y0: number, y1: number, colour: number[])`

#### Method: `drawArrow(x0: number, y0: number, x1: number, y1: number, colour: number[])`

#### Method: `drawRect(x0: number, y0: number, x1: number, y1: number, color: number[], opacity?: float)`

#### Method: `drawCircle(x0: number, y0: number, radius: number, color: number[])`

#### Method: `drawPlasma()`
draw `plasma` effect.