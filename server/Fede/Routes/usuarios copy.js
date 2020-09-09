"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../models/usuarios");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../clases/token"));
const autentificacion_1 = require("../middelwares/autentificacion");
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
// Actualizar mi usuario
usuariosRutas.post('/update', autentificacion_1.verificarToken, (req, res) => {
    console.log('req ', req);
    const usuario = {
        nombre: req.body.nombre || req.usuario.nombre,
        password: req.body.password || req.usuario.password
    };
    usuarios_1.Usuario.findByIdAndUpdate(req.usuario._id, usuario, { new: true }, (err, userDB) => {
        console.log('userDB ', userDB);
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        const miToken = token_1.default.gettoken({
            _id: userDB._id,
            nombre: userDB.nombre,
            password: userDB.password
        });
        res.json({
            ok: true,
            token: miToken
        });
    });
});
// Get usuario
usuariosRutas.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user = yield usuarios_1.Usuario.find()
        .limit(1) // Limit es para el número de usuarios que queremos obtener
        .exec();
    res.json({
        ok: true,
        user
    });
}));
exports.default = usuariosRutas;
