import { Router, Request, Response } from 'express';
import { Usuario } from '../models/usuarios';
import bcrypt from 'bcrypt'

const usuariosRutas = Router();

// crear usuario
usuariosRutas.post('/crear', (req: Request, res: Response) => {
  const usuario = {
    nombre: req.body.nombre,
    password: bcrypt.hashSync( req.body.password,10),
  }; 

  // Grabar usuario en base de datos
  Usuario.create(usuario).then((usuariosDB) => {
    res.json({
      ok: true,
      usuario: usuariosDB,
    });
  }).catch(err=>{
    res.json({
        ok: false,
        err
      });
  })
});

export default usuariosRutas;
