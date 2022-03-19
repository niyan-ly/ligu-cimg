import assert from "assert";
import { readFileSync } from "fs";
import { extname } from "path";
import loadWasmModule from "./ligu-cimg";
import { WasmModule } from "../type";
import { Ligu } from "./ligu";

interface FromSize {
  (width: number, height: number): Ligu;
}

interface FromFile {
  (filename: string): Ligu;
}

interface FromBuffer {
  (buffer: Uint8Array, fileType: ".jpeg" | ".png"): Ligu;
}

export async function loadLigu(): Promise<{
  wasmModule: WasmModule;
  fromSize: FromSize;
  fromFile: FromFile;
  fromBuffer: FromBuffer;
}> {
  return loadWasmModule().then((wasmModule) => {
    const fromSize: FromSize = (width: number, height: number) => {
      const cimg = new wasmModule.CImgWASM8Bit();
      cimg.assign(width, height, 1, 4);
      const ins = new Ligu(cimg, wasmModule);

      return ins;
    };
    const fromBuffer: FromBuffer = (buffer, fileType) => {
      const f_type = fileType.toLowerCase();
      assert([".jpeg", ".png"].includes(f_type));

      const cimg = new wasmModule.CImgWASM8Bit();
      const ins = new Ligu(cimg, wasmModule);
      const inMemFilename = Math.random().toString(16).concat(f_type);

      wasmModule.FS.writeFile(inMemFilename, buffer);
      cimg.load(inMemFilename);
      wasmModule.FS.unlink(inMemFilename);

      return ins;
    };
    const fromFile: FromFile = (filename: string) => {
      const fileBuffer = readFileSync(filename);
      const fileType = extname(filename);

      return fromBuffer(fileBuffer, fileType as any);
    };

    return {
      wasmModule,
      fromSize,
      fromFile,
      fromBuffer,
    };
  });
}
