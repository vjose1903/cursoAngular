"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contacto_1 = require("../models/contacto");
const contactoRutas = express_1.Router();
// crear mensaje
contactoRutas.post('/', (req, res) => {
    const body = req.body;
    contacto_1.Contacto.create(body)
        .then((contactoDB) => {
        res.json({
            ok: true,
            contacto: contactoDB,
        });
    })
        .catch((err) => {
        res.json(err);
    });
});
// eliminar mensajes
contactoRutas.delete('/:id', (req, res) => {
    const id = req.params.id;
    contacto_1.Contacto.findByIdAndRemove(id, (err, contactoBorrar) => {
        if (err)
            throw err;
        res.json({
            ok: true,
            mensaje: 'Mensaje eliminado',
            body: contactoBorrar
        });
    });
});
exports.default = contactoRutas;
