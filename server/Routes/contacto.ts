import { Router, Request, Response } from 'express';
import { Usuario } from '../models/usuarios';
import bcrypt from 'bcrypt';
import Token from '../clases/token';
import { verificarToken } from '../middelwares/autentificacion';
import { Contacto } from '../models/contacto';

const contactoRutas = Router();

// crear mensaje
contactoRutas.post('/', (req: any, res: Response) => {
  const body= req.body;

  Contacto.create(body)
    .then((contactoDB) => {
      res.json({
        ok: true,
        contacto: contactoDB,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

// eliminar mensajes

contactoRutas.delete('/:id', (req: any, res: Response) => {
  const id = req.params.id;
  Contacto.findByIdAndRemove(id, (err, contactoBorrar)=>{
    if(err) throw err;
    res.json({
      ok: true,
      mensaje:'Mensaje eliminado',
      body: contactoBorrar
    })
  })
})



export default contactoRutas;
