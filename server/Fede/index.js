"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const usuarios_1 = __importDefault(require("./Routes/usuarios"));
const body_parser_1 = __importDefault(require("body-parser"));
const contacto_1 = __importDefault(require("./Routes/contacto"));
const imagenesYo_1 = __importDefault(require("./Routes/imagenesYo"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const sobreMi_1 = __importDefault(require("./Routes/sobreMi"));
const server = new server_1.default();
// bodyParse
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//  Fileupload
server.app.use(express_fileupload_1.default());
// rutas
server.app.use('/usuario', usuarios_1.default);
server.app.use('/contacto', contacto_1.default);
server.app.use('/uploadYo', imagenesYo_1.default);
server.app.use('/sobreMi', sobreMi_1.default);
// conectar DB
mongoose_1.default.connect('mongodb://localhost:27017/FedeDJBase', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
    if (err)
        throw 'err';
    console.log('Base de datos ONLINE');
});
server.start(() => {
    console.log(`Servidor Fede corriendo en el puerto ${server.port}`);
});
