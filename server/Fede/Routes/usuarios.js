"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosRutas = express_1.Router();
// crear usuario
usuariosRutas.post('/crear', (req, res) => {
    const usuario = {
        nombre: req.body.nombre,
        password: req.body.password
    };
    res.json({
        ok: true,
        usuario
    });
});
exports.default = usuariosRutas;
