// Serie Fibonacci
// 1 1 2 3 5 8 13 21 34 55

const fs = require("fs");

let crearSerie = (elementos) => {
  return new Promise((resolve,reject)=>{
    let fibo1 = 1;
    let fibo2 = 1;
  
    let serie = "";
  
    serie += `${fibo1}\t`;
  
    for (let i = 2; i <= elementos; i++) {
      serie += `${fibo2}\t`;
      fibo2 = fibo1 + fibo2;
      fibo1 = fibo2 - fibo1;
    }
  
    fs.writeFile("fibonacci.txt", serie, (err) => {
      if (err) reject("Error al crear el archivo");
      else resolve("The file has been saved!");
    });

  })
};

module.exports = {
  crearSerie,
}
