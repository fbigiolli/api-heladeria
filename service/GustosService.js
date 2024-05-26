'use strict';


const {client} = require('../db/dbConnection');
const database = client.db('Via-Apilia');
const collection = database.collection('Gustos');


/**
 * Listar los gustos de helado
*
* tipo TipoDeGusto  (optional)
* returns List
**/
exports.gustosGET = async function(tipo) {
  // si no hay query paso filtro vacio
  const query = tipo ? { tipo: tipo } : {};
  const projection = { _id: 0 }; // saco la id de la db

  try {
    const gustos = await collection.find(query).project(projection).toArray();
    return gustos;
  } catch (error) {
    throw error;
  }
};

/**
 * Ver un gusto particular
 *
 * gustoId String id del gusto
 * returns Gusto
 **/
exports.gustosGustoIdGET = async function(gustoId) {
  const idGusto = { id: gustoId }; 
  const options = { projection: { _id: 0 } }; // saco la id de la db

  try {
    const gusto = await collection.findOne(idGusto, options);
    
    if (gusto) {
      return gusto;
    } else {
      throw new Error('Gusto no encontrado');
    }
  } catch (error) {
    throw error;
  }
};
