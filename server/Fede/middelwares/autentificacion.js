"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = __importDefault(require("../clases/token"));
exports.verificarToken = (req, res, next) => {
    const usuarioToken = req.get('miToken') || '';
    token_1.default.compararToken(usuarioToken)
        .then((decoded) => {
        req.usario = decoded.usuario;
        next();
    })
        .catch((err) => {
        res.json({
            ok: false,
            mensaje: 'Token invalido',
            err,
        });
    });
};
