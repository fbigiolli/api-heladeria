'use strict';

const { ObjectId } = require('mongodb');
const {client} = require('../db/dbConnection');
const { validateMongoID } = require('../utils/validation/validateMongoID');
const { validateRequestBodyRepartidor } = require('../utils/validation/validateRequestBodyRepartidor');
const database = client.db('Via-Apilia');
const collection = database.collection('Repartidores');

/**
 * Listar los repartidores de la heladeria
 *
 * edad Integer  (optional)
 * returns List
 **/
exports.repartidoresGET = function(edad) {
  const query = edad ? { edad: edad } : {};

  return new Promise(async function(resolve, reject) {
    try {
      const repartidores = await collection.find(query).toArray();
      resolve(repartidores);
    } catch (error) {
      console.error("Error fetching repartidores:", error);
      reject(error);
    }
  });
}


/**
 * Crea un nuevo repartidor
 *
 * body Repartidores_body  (optional)
 * returns Repartidor
 **/
exports.repartidoresPOST = function(body) {
  if (!validateRequestBodyRepartidor(body)) {
    return Promise.reject(new Error('Cuerpo no válido'));
  }

  return new Promise(async function(resolve, reject) {
    try {
      const existingRepartidor = await collection.findOne({ cuil: body.cuil });
      if (existingRepartidor) {
        throw new Error('El CUIL ya está asignado a otro repartidor');
      }

      const result = await collection.insertOne(body);
      const insertedId = result.insertedId;

      const responseBody = { ...body, _id: insertedId };

      resolve(responseBody);
    } catch (error) {
      reject(error);
    }
  });
}



/**
 * Elimina el repartidor asociado a esta ID
 *
 * repartidorID String 
 * no response value expected for this operation
 **/
exports.repartidoresRepartidorIDDELETE = function(repartidorID) {
  if (!validateMongoID(repartidorID)) {
    return Promise.reject(new Error('No se conoce un repartidor con tal id.'));
  }
  const objectId = new ObjectId(repartidorID);
  const idRepartidor = { _id: objectId }; 

  return new Promise(async function(resolve, reject) {
    try {
      const result = await collection.deleteOne(idRepartidor);
      if (result.deletedCount > 0) {
        resolve();
      } else {
        reject(new Error('No se encontró un repartidor con esa id.'));
      }
    } catch (error) {
      reject(error);
    }
  });
};



/**
 * Obtiene los datos de un repartidor de la heladeria
 *
 * repartidorID String 
 * returns Repartidor
 **/
exports.repartidoresRepartidorIDGET = function(repartidorID) {
  if (!validateMongoID(repartidorID)) {
    return Promise.reject(new Error('No se conoce un repartidor con tal id.'));
  }

  const objectId = new ObjectId(repartidorID);
  const idRepartidor = { _id: objectId }; 

  return new Promise(async function(resolve, reject) {
    try {
      const repartidor = await collection.findOne(idRepartidor);

      if (repartidor) {
        resolve(repartidor)
      }else{
        const error = new Error('Repartidor no encontrado')
        reject(error);
      }
    } catch (error) {
      console.error("Error fetching pedidos:", error);
      reject(error);
    }
  });
}


/**
 * Modifica los datos de un repartidor existente
 *
 * body Repartidores_repartidorID_body  (optional)
 * repartidorID String 
 * returns Repartidor
 **/
exports.repartidoresRepartidorIDPUT = function(body, repartidorID) {
  if (!validateMongoID(repartidorID)) {
    return Promise.reject(new Error('No se conoce un repartidor con tal id.'));
  }

  if (!validateRequestBodyRepartidor(body)) {
    return Promise.reject(new Error('Request Body no válido'));
  }

  const objectId = new ObjectId(repartidorID);
  const idRepartidor = { _id: objectId }; 

  return new Promise(async function(resolve, reject) {
    try {
      const result = await collection.updateOne(idRepartidor, {$set : body});
      if (result.modifiedCount === 0) {
        throw new Error('No se conoce un repartidor con tal id.');
      }

      const responseBody = { ...body, _id: repartidorID };
      resolve(responseBody);
    } catch (error) {
      reject(error);
    }
  });
}
