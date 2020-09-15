import path from 'path';
import fs from 'fs';

export default class FileSystemYo {
  constructor() {}

  guardarImagenesYo(file: any, nombre: string) {
    return new Promise((resolve, reject) => {
      //crear carpeta
      const path = this.crearCarpetaYo(nombre);
      const nombreArchivo = file.name;

      file.mv(`${path}/${nombreArchivo}`, (err: any) => {
        if (err) {
          reject();
        } else {
          resolve();
        }
      });
    });
  }

  private crearCarpetaYo(nombre: string) {
    const pathYo = path.resolve(__dirname, '../uploads', nombre);
    const existe = fs.existsSync(pathYo);

    console.log('existe ', existe);

    if (!existe) {
      fs.mkdirSync(pathYo);
    }

    return pathYo;
  }
}
