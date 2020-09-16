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
const autentificacion_1 = require("../middelwares/autentificacion");
const sobreMi_1 = require("../models/sobreMi");
const sobreMiRutas = express_1.Router();
// crear sobre mi
sobreMiRutas.post('/', autentificacion_1.verificarToken, (req, res) => {
    const body = req.body;
    body.titulo = 'Victor Jose Vasquez Santos';
    sobreMi_1.sobreMi
        .create(body)
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
// actualiar sobre mi
sobreMiRutas.post('/update/:id', autentificacion_1.verificarToken, (req, res) => {
    const id = req.params.id;
    const sobre_mi = {
        texto1: req.body.texto1,
        texto2: req.body.texto2,
        texto3: req.body.texto3,
        texto4: req.body.texto4,
        texto: req.body.texto,
    };
    sobreMi_1.sobreMi.findByIdAndUpdate(id, sobre_mi, { new: true }, (err, sobreMi) => {
        if (err)
            throw err;
        if (!sobre_mi) {
            return res.json({
                ok: false,
                mensaje: 'invalid Data',
            });
        }
        res.json({
            ok: true,
            sobre_mi,
        });
    });
});
// Get sobre mi
sobreMiRutas.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const sobre_mi = yield sobreMi_1.sobreMi.find().sort({ _id: -1 }).exec();
    res.json({
        ok: true,
        sobre_mi,
    });
}));
exports.default = sobreMiRutas;
