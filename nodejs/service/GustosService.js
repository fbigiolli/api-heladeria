'use strict';

var db = require('../service/GustosService');
const {client} = require('../db/dbConnection');


/**
 * Listar los gustos de helado
 *
 * tipo TipoDeGusto  (optional)
 * returns List
 **/
exports.gustosGET = function(tipo) {
  const database = client.db('Via-Apilia');
  const collection = database.collection('Gustos');
  
  // si no hay query paso filtro vacio
  const query = tipo ? { tipo: tipo } : {};

  return new Promise(async function(resolve, reject) {
    try {
      const gustos = await collection.find(query).toArray();
      resolve(gustos);
    } catch (error) {
      console.error("Error fetching gustos:", error);
      reject(error);
    }
  });
};


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

