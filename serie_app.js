// Serie Fibonacci
// 1 1 2 3 5 8 13 21 34 55

const serie = require("./serie");

let argv = process.argv;
let valor = argv[2].split("=")[1];

serie
  .crearSerie(valor)
  .then((mensaje) => console.log(mensaje))
  .catch((err) => console.log(err));
