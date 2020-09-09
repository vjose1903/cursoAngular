import Server from './clases/server';
import mongoose from 'mongoose'
import usuariosRutas from './Routes/usuarios';
import bodyParser from 'body-parser';
import contactoRutas from './Routes/contacto';

const server = new Server();

// bodyParse

server.app.use(bodyParser.urlencoded({extended:true}))
server.app.use(bodyParser.json())


// rutas
server.app.use('/usuario',usuariosRutas)
server.app.use('/contacto',contactoRutas)

// conectar DB

mongoose.connect(
  'mongodb://localhost:27017/FedeDJBase',
  {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true, useFindAndModify:false},
  (err)=>{
    if (err) throw "err"
    console.log("Base de datos ONLINE")
  }
)

server.start(() => {
  console.log(`Servidor Fede corriendo en el puerto ${server.port}`);
});
