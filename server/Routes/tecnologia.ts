import { Router, Request, Response } from 'express';
import { verificarToken } from '../middelwares/autentificacion';
import { Tecnologias } from '../models/tecnologia';

const tecnologiasRutas = Router();

// crear tecnologia
tecnologiasRutas.post('/', verificarToken, (req: any, res: Response) => {
  const body = req.body;

  Tecnologias
    .create(body)
    .then((tecnologiaDB) => {
      res.json({
        ok: true,
        tecnologia: tecnologiaDB,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

// actualiar tecnologia

tecnologiasRutas.post('/update/:id', verificarToken, (req: any, res: Response) => {
  const id = req.params.id;

  const sobre_mi = {
    texto1: req.body.texto1,
    texto2: req.body.texto2,
    texto3: req.body.texto3,
    texto4: req.body.texto4,
    texto: req.body.texto,
  };

  Tecnologias.findByIdAndUpdate(id, sobre_mi, { new: true }, (err, tecnologia) => {
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

// Get tecnologia
tecnologiasRutas.get('/', async (req: any, res: Response) => {
  const sobre_mi = await Tecnologias.find().sort({ _id: -1 }).exec();

  res.json({
    ok: true,
    sobre_mi,
  });
});


export default tecnologiasRutas;
