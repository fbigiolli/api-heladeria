'use strict';


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
  const projection = { _id: 0} // saco la id de la db
  
  return new Promise(async function(resolve, reject) {
    try {
      const gustos = await collection.find(query).project(projection).toArray();
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
  const database = client.db('Via-Apilia');
  const collection = database.collection('Gustos');

  const idGusto = { id: gustoId }; 
  const options = { projection: { _id:0 }}; // saco la id de la db

  return new Promise(async (resolve, reject) => {
    try {
      const gusto = await collection.findOne(idGusto,options);
      
      if (gusto) {
        resolve(gusto);
      } else {
        const error = new Error('Gusto no encontrado');
        reject(error);
      }
    } catch (error) {
      console.error("Error fetching gustos:", error);
      reject(error);
    }
  });
}


