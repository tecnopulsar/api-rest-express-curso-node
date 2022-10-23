const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hola Mundo");
    res.end();
  }
});

// server.on('connection',(puerto)=>{
//   console.log('Nueva conexion...')
// })

server.listen(3000);

console.log("Servidor escuchando el puerto 3000");
