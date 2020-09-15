"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../models/usuarios");
const autentificacion_1 = require("../middelwares/autentificacion");
const sobreMi_1 = require("../models/sobreMi");
const sobreMiRutas = express_1.Router();
// crear mensaje
sobreMiRutas.post('/', autentificacion_1.verificarToken, (req, res) => {
    const body = req.body;
    body.titulo = 'Victor Jose Vasquez Santos';
    sobreMi_1.sobreMi.create(body)
        .then((sobreMiDB) => {
        res.json({
            ok: true,
            contacto: sobreMiDB,
        });
    })
        .catch((err) => {
        res.json(err);
    });
});
// eliminar mensajes
sobreMiRutas.delete('/:id', (req, res) => {
    const id = req.params.id;
    sobreMi_1.sobreMi.findByIdAndRemove(id, (err, contactoBorrar) => {
        if (err)
            throw err;
        res.json({
            ok: true,
            mensaje: 'Mensaje eliminado',
            body: contactoBorrar,
        });
    });
});
// Get usuario
sobreMiRutas.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user = yield usuarios_1.Usuario.find()
        .limit(1) // Limit es para el número de usuarios que queremos obtener
        .exec();
    res.json({
        ok: true,
        user,
    });
}));
exports.default = sobreMiRutas;
