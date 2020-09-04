import { Router, Request, Response } from 'express';
import { Usuario } from '../models/usuarios';
import bcrypt from 'bcrypt';
import Token from '../clases/token';

const usuariosRutas = Router();

// crear usuario
usuariosRutas.post('/crear', (req: Request, res: Response) => {
  const usuario = {
    nombre: req.body.nombre,
    password: bcrypt.hashSync(req.body.password, 10),
  };

  // Grabar usuario en base de datos
  Usuario.create(usuario)
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
usuariosRutas.post('/entrar', (req: Request, res: Response) => {
  const body = req.body;

  Usuario.findOne({ nombre: body.nombre }, (err, usuarioDB) => {
    if (err) throw err;
    if (!usuarioDB) {
      return res.json({
        ok: false,
        mensaje: 'Invalid data',
      });
    }
    if (usuarioDB.compararContrasena(body.password)) {
      const miToken = Token.gettoken({
        _id: usuarioDB._id,
        nombre: usuarioDB.nombre,
        password: usuarioDB.password,
      });

      res.json({
        ok: true,
        token: miToken,
      });
    } else {
      res.json({
        ok: false,
        token: 'Invalid data',
      });
    }
  });
});

export default usuariosRutas;
