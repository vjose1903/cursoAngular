"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Token {
    constructor() {
    }
    static gettoken(payload) {
        return jsonwebtoken_1.default.sign({
            usuario: payload
        }, this.semilla, { expiresIn: this.caducidad });
    }
    static compararToken(userToken) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(userToken, this.semilla, (err, decoded) => {
                if (err) {
                    reject();
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
}
Token.semilla = 'semilla-seed,privacityPorpia-FedeDj';
Token.caducidad = '1h';
exports.default = Token;
