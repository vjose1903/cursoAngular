"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autentificacion_1 = require("../middelwares/autentificacion");
const imagenesYo_1 = require("../models/imagenesYo");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
// Mostrar imagenes por url
yoRutas.get('/files/:img', (req, res) => {
    const img = req.params.img;
    const imagen = fileSystemYo.getImgUrl(img);
    res.sendFile(imagen);
});
// actualizar imagen
yoRutas.post('/update', autentificacion_1.verificarToken, (req, res) => {
    const file = req.files.img;
    fileSystemYo.guardarImagenesYo(file, req.usuario.nombre);
    res.json({
        ok: true,
        mensaje: 'Imagen actualizada',
    });
});
// eliminar imagen
yoRutas.delete('/:id/:name', autentificacion_1.verificarToken, (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    imagenesYo_1.ImagenesYo.findByIdAndRemove(id, (err, imgBorrar) => {
        if (err)
            throw err;
        res.json({
            ok: true,
            mensaje: 'Imagen eliminada',
            body: imgBorrar,
        });
    });
    fs_1.default.unlinkSync(path_1.default.resolve(__dirname, '../uploads/', 'victor', name));
});
exports.default = yoRutas;
