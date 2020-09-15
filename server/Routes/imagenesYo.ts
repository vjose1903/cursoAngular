import { Router, Request, Response } from 'express';
import { verificarToken } from '../middelwares/autentificacion';
import { ImagenesYo } from '../models/imagenesYo';

import fs from 'fs';
import path from 'path';

import FileSystemYo from '../clases/flileSystemYo';

const yoRutas = Router();
const fileSystemYo = new FileSystemYo();

// crear mensaje
yoRutas.post('/', verificarToken, (req: any, res: Response) => {
  const body = req.body;
  const file = req.files.img;

  body.img = file.name;

  ImagenesYo.create(body)
    .then((imgYoDB) => {
      res.json({
        ok: true,
        imgYoDB,
      });

      fileSystemYo.guardarImagenesYo(file, req.usuario.nombre);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Mostrar imagenes por url
yoRutas.get('/files/:img', (req: any, res: Response) => {
  const img = req.params.img;
  const imagen = fileSystemYo.getImgUrl(img);
  res.sendFile(imagen);
});

// actualizar imagen
yoRutas.post('/update', verificarToken, (req: any, res: Response) => {
  const file = req.files.img;
  fileSystemYo.guardarImagenesYo(file, req.usuario.nombre);

  res.json({
    ok: true,
    mensaje: 'Imagen actualizada',
  });
});

// eliminar imagen

yoRutas.delete('/:id/:name', verificarToken, (req: any, res: Response) => {
  const id = req.params.id;
  const name = req.params.name;

  ImagenesYo.findByIdAndRemove(id, (err, imgBorrar) => {
    if (err) throw err;
    res.json({
      ok: true,
      mensaje: 'Imagen eliminada',
      body: imgBorrar,
    });
  });

  fs.unlinkSync(path.resolve(__dirname, '../uploads/', 'victor', name));
});

export default yoRutas;
