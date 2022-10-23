// Modulo Events

const EventEmitter = require("events");

const emitter = new EventEmitter();

// Registrar el listener
emitter.on("mensajeLoader", function (arg) {
  console.log("Listener llamado...", arg);
});

// Llamar el evento
emitter.emit("mensajeLoader", { id: 1, url: "www.google.com" });
