/**
 * Target independent implementation.
 * for Browser & Node.js
 */
import assert from "assert";
import { CImgWASM8Bit, WasmModule } from "../type";

export class Ligu {
  drawRect: CImgWASM8Bit["draw_rectangle"];
  drawArrow: CImgWASM8Bit["draw_arrow"];
  drawAxes: CImgWASM8Bit["draw_axes"];
  drawLine: CImgWASM8Bit["draw_line"];
  drawText: CImgWASM8Bit["draw_text"];
  drawEllipse: CImgWASM8Bit["draw_ellipse"];
  drawCircle: CImgWASM8Bit['draw_circle'];
  resizeHalfXY: CImgWASM8Bit['resize_halfXY'];
  resizeDoubleXY: CImgWASM8Bit['resize_doubleXY'];
  drawPlasma: CImgWASM8Bit['draw_plasma'];

  get width(): number {
    return this.cimg.width();
  }

  get height(): number {
    return this.cimg.height();
  }

  get channel(): number {
    return this.cimg.spectrum();
  }

  constructor(public cimg: CImgWASM8Bit, public wasmModule: WasmModule) {
    this.drawRect = cimg.draw_rectangle.bind(cimg);
    this.drawArrow = cimg.draw_arrow.bind(cimg);
    this.drawAxes = cimg.draw_axes.bind(cimg);
    this.drawLine = cimg.draw_line.bind(cimg);
    this.drawText = cimg.draw_text.bind(cimg);
    this.drawEllipse = cimg.draw_ellipse.bind(cimg);
    this.drawCircle = cimg.draw_circle.bind(cimg);
    this.resizeHalfXY = cimg.resize_halfXY.bind(cimg);
    this.resizeDoubleXY = cimg.resize_doubleXY.bind(cimg);
    this.drawPlasma = cimg.draw_plasma.bind(cimg);
  }

  /**
   * @description renew instance with new configuration,
   * Note: all data will be erased
   */
  assign(width: number, height: number) {
    this.cimg.assign(width, height, 1, 4);
  }

  /**
   * @description get color value at position (x, y).
   */
  at(x: number, y: number): number[] {
    let r = 0,
      g = 0,
      b = 0,
      a = 0;

    r = this.cimg.atXYZC(x, y, 0, 0);
    g = this.cimg.atXYZC(x, y, 0, 1);
    b = this.cimg.atXYZC(x, y, 0, 2);
    if (this.channel == 4) {
      a = this.cimg.atXYZC(x, y, 0, 3);
    }

    return [r, g, b, a];
  }

  blur_symmetric(sigma: number, gaussion?: boolean) {
    this.cimg.blur_symmetric(sigma, 1, gaussion);
  }

  blur(sigmaHorizontal: number, sigmaVertical: number, gaussian?: boolean) {
    this.cimg.blur(sigmaHorizontal, sigmaVertical, 0, 1, gaussian);
  }

  crop(x0: number, y0: number, x1: number, y1: number) {
    this.cimg.crop(x0, y0, 0, 0, x1, y1, 0, this.channel - 1);
  }

  drawImage(x: number, y: number, src: Ligu, opacity?: number) {
    this.cimg.draw_image(x, y, 0, 0, src.cimg, opacity);
  }

  drawPolygon(
    points: { x: number; y: number }[],
    color: number[],
    outlined?: boolean
  ) {
    const pointsContainer = new this.wasmModule.CImgWASM32Bit();
    pointsContainer.assign(points.length, 2, 0, 0);

    let index = 0;
    for (const { x, y } of points) {
      pointsContainer.x_set_data(x, index, 0);
      pointsContainer.x_set_data(y, index, 1);
      index++;
    }

    this.cimg.draw_polygon(pointsContainer, color, outlined ? -1 : 0);
  }

  fill(rgba: number[]) {
    this.cimg.draw_fill(0, 0, rgba);
  }

  resizeXY(x: number, y: number) {
    this.cimg.resize(x, y);
  }

  exportJPEG(quality: number = 100) {
    const { buf: ptr, size } = this.cimg.exportJPEG(quality);
    assert(Number.isInteger(ptr), "Invalid c pointer");

    const uint8Buf = this.wasmModule.HEAPU8.slice(ptr, ptr! + size);
    return uint8Buf;
  }

  exportPNG() {
    const { buf: ptr, size } = this.cimg.exportPNG();
    assert(Number.isInteger(ptr), "Invalid c pointer");

    const uint8Buf = this.wasmModule.HEAPU8.slice(ptr, ptr! + size);
    return uint8Buf;
  }
}
