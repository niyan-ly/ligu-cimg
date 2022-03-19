type MemPtr = number;
type float = number;

export interface WasmModule {
  [index: string]: any;
  FS: {
    [index: string]: any;
  };
  CImgWASM8Bit: CImgWASM8Bit;
  CImgWASM32Bit: CImgWASM32Bit;
}

export interface ImgStat {
  buf?: MemPtr;
  size: number;
}

export interface CImgWASM32Bit extends CImgWASM8Bit {
  new (): CImgWASM32Bit;

  x_set_data(
    value: number,
    x: number,
    y?: number,
    z?: number,
    c?: number
  ): void;
}

export interface CImgWASM8Bit {
  new (): CImgWASM8Bit;

  assign(x: number, y: number, z: number, c: number): void;
  atXYZC(x: number, y: number, z: number, c: number): number;
  autocrop(): void;
  blur_symmetric(
    sigma: number,
    boundary_conditions?: number,
    is_gaussian?: boolean
  ): void;
  blur(
    sigmaX: number,
    sigmaY: number,
    sigmaZ: number,
    boundary_conditions?: number,
    is_gaussian?: number
  ): void;
  crop(
    x0: number,
    y0: number,
    z0: number,
    c0: number,
    x1: number,
    y1: number,
    z1: number,
    c1: number
  ): void;
  fill(grayScale: number): void;
  fillC(
    x: number,
    y: number,
    z: number,
    colorR: number,
    colorG: number,
    colorB: number,
    colorA: number
  ): void;
  data(): MemPtr;
  draw_arrow(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    colour: number[]
  ): void;
  draw_axes(
    x0: number,
    x1: number,
    y0: number,
    y1: number,
    colour: number[]
  ): void;
  draw_image(
    x0: number,
    y0: number,
    z0: number,
    c0: number,
    src: CImgWASM8Bit,
    opacity?: float
  ): void;
  draw_line(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    color: number[],
    opacity?: float,
    pattern?: number,
    init_hatch?: boolean
  ): void;
  draw_text(
    x0: number,
    y0: number,
    text: string,
    foreground_color: number[],
    background_color?: number[],
    opacity?: float,
    font_height?: number
  ): void;
  draw_rectangle(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    color: number[],
    opacity?: float
  ): void;
  draw_ellipse(
    x0: number,
    y0: number,
    r1: float,
    r2: float,
    angle: float,
    colour: number[],
    opacity?: float
  ): void;
  draw_circle(x0: number, y0: number, radius: number, color: number[]): void;
  draw_fill(x: number, y: number, color: number[]): void;
  draw_polygon(
    points: CImgWASM8Bit,
    color: number[],
    opacity: float,
    pattern?: number
  ): void;
  offset(x: number, y?: number, z?: number, c?: number): number;
  // mem save
  save(filename: string): void;
  save_jpeg(filename: string, quality?: number): void;
  save_png(filename: string): void;
  load(filename: string): void;

  exportPNG(): ImgStat;
  exportJPEG(quality?: number): ImgStat;

  resize(
    x: number,
    y?: number,
    z?: number,
    c?: number,
    algorithm_t?: number,
    condition?: number,
    cx?: float,
    cy?: float,
    cz?: float,
    cc?: float
  ): void;

  height(): number;
  width(): number;
  spectrum(): number;
  depth(): number;
  size(): number;

  draw_plasma(): void;
  invert(): void;
  resize_halfXY(): void;
  resize_doubleXY(): void;
  CMYtoRGB(): void;
  CMYKtoCMY(): void;
  CMYKtoRGB(): void;
  RGBtoCMY(): void;
  RGBtoCMYK(): void;
  HSLtoRGB(): void;
  RGBtoHSL(): void;
  LabtoRGB(): void;
  LabtoXYZ(): void;
  XYZtoLab(): void;
  XYZtoRGB(): void;
  XYZtoxyY(): void;
  RGBtoHSI(): void;
  RGBtoHSV(): void;
  RGBtoLab(): void;
  RGBtoXYZ(): void;
}

export {};
