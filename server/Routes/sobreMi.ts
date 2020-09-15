import { Router, Request, Response } from 'express';
import { Usuario } from '../models/usuarios';
import bcrypt from 'bcrypt';
import Token from '../clases/token';
import { verificarToken } from '../middelwares/autentificacion';
import { sobreMi } from '../models/sobreMi';

const sobreMiRutas = Router();

// crear mensaje
sobreMiRutas.post('/', verificarToken, (req: any, res: Response) => {
  const body = req.body;
  body.titulo= 'Victor Jose Vasquez Santos'

  sobreMi.create(body)
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

sobreMiRutas.delete('/:id', (req: any, res: Response) => {
  const id = req.params.id;
  sobreMi.findByIdAndRemove(id, (err, contactoBorrar) => {
    if (err) throw err;
    res.json({
      ok: true,
      mensaje: 'Mensaje eliminado',
      body: contactoBorrar,
    });
  });
});

// Get usuario
sobreMiRutas.get('/', async (req: any, res: Response) => {
  const user = await Usuario.find()
    .limit(1) // Limit es para el número de usuarios que queremos obtener
    .exec();

  res.json({
    ok: true,
    user,
  });
});

export default sobreMiRutas;
