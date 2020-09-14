"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autentificacion_1 = require("../middelwares/autentificacion");
const imagenesYo_1 = require("../models/imagenesYo");
const yoRutas = express_1.Router();
// crear mensaje
yoRutas.post('/', autentificacion_1.verificarToken, (req, res) => {
    const body = req.body;
    const file = req.files.img;
    body.img = file.name;
    console.log(file);
    console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
    console.log('body ', body);
    console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
    imagenesYo_1.ImagenesYo.create(body)
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
exports.default = yoRutas;
