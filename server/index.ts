import Server from './clases/server';

const server = new Server();

server.start(() => {
  console.log(`Servidor Fede corriendo en el puerto ${server.port}`);
});
