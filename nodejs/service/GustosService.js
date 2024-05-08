'use strict';


/**
 * Listar los gustos de helado
 *
 * tipo TipoDeGusto  (optional)
 * returns List
 **/
exports.gustosGET = function(tipo) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "tipo" : "dulce de leches",
  "id" : "ddl",
  "nombre" : "Dulce de leche"
}, {
  "tipo" : "dulce de leches",
  "id" : "ddl",
  "nombre" : "Dulce de leche"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Ver un gusto particular
 *
 * gustoId String id del gusto
 * returns Gusto
 **/
exports.gustosGustoIdGET = function(gustoId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "tipo" : "dulce de leches",
  "id" : "ddl",
  "nombre" : "Dulce de leche"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

