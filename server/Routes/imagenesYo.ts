import { Router, Request, Response } from 'express';
import { verificarToken } from '../middelwares/autentificacion';
import { ImagenesYo } from '../models/imagenesYo';

const yoRutas = Router();

// crear mensaje
yoRutas.post('/', verificarToken, (req: any, res: Response) => {
  const body= req.body;
  const file= req.files.img;

  body.img = file.name

  console.log(file);
  console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
  console.log('body ', body);
  console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
  

  ImagenesYo.create(body)
    .then((imgYoDB) => {
      res.json({
        ok: true,
         imgYoDB,
      });
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

// // Get usuario
// yoRutas.get('/', async (req: any, res: Response) => {

//   const user = await Usuario.find()
//       .limit(1) // Limit es para el número de usuarios que queremos obtener
//       .exec();

//   res.json({
//       ok: true,
//       user
//   });
// });

export default yoRutas;
