// API Rest
const debug = require("debug")("app:inicio");
// const dbDebug = require("debug")("app:db");

const express = require("express");
const app = express();

const config = require("config");
// $export NODE_ENV=development   - default
// $export NODE_ENV=production

const morgan = require("morgan");

const Joi = require("@hapi/joi");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Configuracion de entornos
console.log("Aplicacion: " + config.get("nombre"));
console.log("BD server: " + config.get("configDB.host"));

//Uso de un middleware de terceros - Morgan
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  // console.log("Morgan habilitado...");
  debug("Morgan esta habilitado");
}

// Trabajos con la base de datos
debug('Conectando con la base de datos')


let usuarios = [
  {
    id: 1,
    nombre: "Juan",
  },
  {
    id: 2,
    nombre: "Epi",
  },
  {
    id: 3,
    nombre: "Katy",
  },
];

app.get("/", (req, res) => {
  res.send("Hola Mundo desde express");
});

app.get("/api/usuarios", (req, res) => {
  res.send(usuarios);
});
app.get("/api/usuarios/:id", (req, res) => {
  let usuario = existeUsuario(id);
  if (usuario.length == 0) res.status(404).send("El usuario no fue encontrado");
  res.send(usuario);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Escuchando express en el puerto ${port}`);
});

app.post("/api/usuarios", (req, res) => {
  const { error, value } = validarUsuario(req.body.nombre);
  if (!error) {
    const usuario = {
      id: usuarios.length + 1,
      nombre: value.nombre,
    };
    usuarios.push(usuario);
    res.send(usuario);
  } else {
    const mensaje = error.details[0].message;
    res.status(400).send(mensaje);
  }
});

app.put("/api/usuarios/:id", (req, res) => {
  //Encontrar si existe el objeto usuario a modificar
  const id = parseInt(req.params.id);
  let usuario = existeUsuario(id);
  if (usuario.length == 0) res.status(404).send("El usuario no fue encontrado");
  //Schema de validacion
  const { error, value } = validarUsuario(req.body.nombre);
  if (error) {
    const mensaje = error.details[0].message;
    res.status(400).send(mensaje);
    return;
  }
  usuarios[id - 1].nombre = value.nombre;
  res.send(usuarios);
});

app.delete("/api/usuarios/:id", (req, res) => {
  //Encontrar si existe el objeto usuario a modificar
  const id = parseInt(req.params.id);
  let usuario = existeUsuario(id);
  if (usuario.length == 0) res.status(404).send("El usuario no fue encontrado");
  const index = usuarios.indexOf(usuario[0]);
  usuarios.splice(index, 1);
  res.send(usuarios);
});

function existeUsuario(id) {
  return usuarios.filter((elemento) => elemento.id === parseInt(id));
}
function validarUsuario(nom) {
  const schema = Joi.object({
    nombre: Joi.string().min(3).max(30).required(),
  });
  return schema.validate({ nombre: nom });
}
