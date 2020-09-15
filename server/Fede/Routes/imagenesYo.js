"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autentificacion_1 = require("../middelwares/autentificacion");
const imagenesYo_1 = require("../models/imagenesYo");
const flileSystemYo_1 = __importDefault(require("../clases/flileSystemYo"));
const yoRutas = express_1.Router();
const fileSystemYo = new flileSystemYo_1.default();
// crear mensaje
yoRutas.post('/', autentificacion_1.verificarToken, (req, res) => {
    const body = req.body;
    const file = req.files.img;
    body.img = file.name;
    imagenesYo_1.ImagenesYo.create(body)
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
yoRutas.get('/files/:img', (req, res) => {
    const img = req.params.img;
    const imagen = fileSystemYo.getImgUrl(img);
    res.sendFile(imagen);
});
exports.default = yoRutas;
