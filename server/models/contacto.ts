import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const contactoSchema = new Schema({

  created:{
    type: Date
  },

  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
  },
  mensaje: {
    type: String,
    required: [true, 'El mensaje es obligatoria'],
  },
});

contactoSchema.pre<iContacto>('save', function(next) {
  this.created = new Date();
  next();
})

interface iContacto extends Document {
  created: Date;
  email: string;
  mensaje: string;
}

export const Contacto = model<iContacto>('Contacto', contactoSchema);
