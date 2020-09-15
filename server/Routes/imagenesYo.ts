import { Router, Request, Response } from 'express';
import { verificarToken } from '../middelwares/autentificacion';
import { ImagenesYo } from '../models/imagenesYo';

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

// eliminar mensajes

// yoRutas.delete('/:id', (req: any, res: Response) => {
//   const id = req.params.id;
//   ImagenesYo.findByIdAndRemove(id, (err, ImaegenesYoBorrar)=>{
//     if(err) throw err;
//     res.json({
//       ok: true,
//       mensaje:'Mensaje eliminado',
//       body: ImaegenesYoBorrar
//     })
//   })
// })

// Mostrar imagenes por url
yoRutas.get('/files/:img',  (req: any, res: Response) => {

  const img = req.params.img ;

  const imagen = fileSystemYo.getImgUrl(img);

  res.sendFile(imagen);
});

export default yoRutas;
