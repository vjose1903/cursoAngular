import { Schema, model, Document } from 'mongoose';

const imagenesYoSchema = new Schema({

  img:{
    type: String,
    unique:true
  }
})

interface IimagenesYo extends Document {
  img: string;
  
}

export const ImagenesYo = model<IimagenesYo>('Imagenes', imagenesYoSchema);
