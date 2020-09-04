"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../models/usuarios");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../clases/token"));
const usuariosRutas = express_1.Router();
// crear usuario
usuariosRutas.post('/crear', (req, res) => {
    const usuario = {
        nombre: req.body.nombre,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
    };
    // Grabar usuario en base de datos
    usuarios_1.Usuario.create(usuario)
        .then((usuariosDB) => {
        res.json({
            ok: true,
            usuario: usuariosDB,
        });
    })
        .catch((err) => {
        res.json({
            ok: false,
            err,
        });
    });
});
// crear usuario
usuariosRutas.post('/entrar', (req, res) => {
    const body = req.body;
    usuarios_1.Usuario.findOne({ nombre: body.nombre }, (err, usuarioDB) => {
        if (err)
            throw err;
        if (!usuarioDB) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data',
            });
        }
        if (usuarioDB.compararContrasena(body.password)) {
            const miToken = token_1.default.gettoken({
                _id: usuarioDB._id,
                nombre: usuarioDB.nombre,
                password: usuarioDB.password,
            });
            res.json({
                ok: true,
                token: miToken,
            });
        }
        else {
            res.json({
                ok: false,
                token: 'Invalid data',
            });
        }
    });
});
exports.default = usuariosRutas;
