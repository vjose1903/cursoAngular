import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const sobreMiSchema = new Schema({

  titulo:{
    type: String
  },

  texto1: {
    type: String,
  },
  texto2: {
    type: String,
  },
  texto3: {
    type: String,
  },
  texto4: {
    type: String,
  },
  texto5: {
    type: String,
  },

});


interface isobreMi extends Document {
  titulo: string;
  email: string;
  texto1: string;
  texto2: string;
  texto3: string;
  texto4: string;
  texto5: string;
  
}

export const sobreMi = model<isobreMi>('sobreMi', sobreMiSchema);
