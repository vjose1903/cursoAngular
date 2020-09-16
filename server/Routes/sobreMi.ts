import { Router, Request, Response } from 'express';
import { Usuario } from '../models/usuarios';
import bcrypt from 'bcrypt';
import Token from '../clases/token';
import { verificarToken } from '../middelwares/autentificacion';
import { sobreMi } from '../models/sobreMi';

const sobreMiRutas = Router();

// crear sobre mi
sobreMiRutas.post('/', verificarToken, (req: any, res: Response) => {
  const body = req.body;
  body.titulo = 'Victor Jose Vasquez Santos';

  sobreMi
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

sobreMiRutas.post('/update/:id', verificarToken, (req: any, res: Response) => {
  const id = req.params.id;

  const sobre_mi = {
    texto1: req.body.texto1,
    texto2: req.body.texto2,
    texto3: req.body.texto3,
    texto4: req.body.texto4,
    texto: req.body.texto,
  };

  sobreMi.findByIdAndUpdate(id, sobre_mi, { new: true }, (err, sobreMi) => {
    if (err) throw err;

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
