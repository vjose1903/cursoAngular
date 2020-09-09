import { Router, Request, Response } from 'express';
import { Usuario } from '../models/usuarios';
import bcrypt from 'bcrypt';
import Token from '../clases/token';
import { verificarToken } from '../middelwares/autentificacion';

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

// Actualizar mi usuario
usuariosRutas.post('/update', verificarToken, (req: any, res: Response) => {
console.log('req ', req);

  const usuario = {
      nombre: req.body.nombre || req.usuario.nombre,
      password: req.body.password || req.usuario.password
  }

  Usuario.findByIdAndUpdate(req.usuario._id, usuario, { new: true }, (err, userDB) => {
console.log('userDB ', userDB);

      if (err) throw err;
      if (!userDB) {
          return res.json({
              ok: false,
              mensaje: 'Invalid data'
          });
      }
      const miToken = Token.gettoken({
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
usuariosRutas.get('/', async (req: any, res: Response) => {

  const user = await Usuario.find()
      .limit(1) // Limit es para el número de usuarios que queremos obtener
      .exec();

  res.json({
      ok: true,
      user
  });
});

export default usuariosRutas;
