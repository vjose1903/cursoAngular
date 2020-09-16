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

// Get sobre mi
sobreMiRutas.get('/', async (req: any, res: Response) => {
  const sobre_mi = await sobreMi.find().sort({ _id: -1 }).exec();

  res.json({
    ok: true,
    sobre_mi,
  });
});


export default sobreMiRutas;
