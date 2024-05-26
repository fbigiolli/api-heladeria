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
exports.repartidoresGET = async function(edad) {
  const query = edad ? { edad: edad } : {};

  try {
    const repartidores = await collection.find(query).toArray();
    return repartidores;
  } catch (error) {
    throw error;
  }
};


/**
 * Crea un nuevo repartidor
 *
 * body Repartidores_body  (optional)
 * returns Repartidor
 **/
exports.repartidoresPOST = async function(body) {
  if (!validateRequestBodyRepartidor(body)) {
    throw new Error('Cuerpo no válido');
  }

  try {
    const existingRepartidor = await collection.findOne({ cuil: body.cuil });
    if (existingRepartidor) {
      throw new Error('El CUIL ya está asignado a otro repartidor');
    }

    const result = await collection.insertOne(body);
    const insertedId = result.insertedId;

    const responseBody = { ...body, _id: insertedId };

    return responseBody;
  } catch (error) {
    throw error;
  }
};


/**
 * Elimina el repartidor asociado a esta ID
 *
 * repartidorID String 
 * no response value expected for this operation
 **/
exports.repartidoresRepartidorIDDELETE = async function(repartidorID) {
  if (!validateMongoID(repartidorID)) {
    throw new Error('No se conoce un repartidor con tal id.');
  }
  const objectId = new ObjectId(repartidorID);
  const idRepartidor = { _id: objectId }; 

  try {
    const result = await collection.deleteOne(idRepartidor);
    if (result.deletedCount > 0) {
      return;
    } else {
      throw new Error('No se encontró un repartidor con esa id.');
    }
  } catch (error) {
    throw error;
  }
};



/**
 * Obtiene los datos de un repartidor de la heladeria
 *
 * repartidorID String 
 * returns Repartidor
 **/
exports.repartidoresRepartidorIDGET = async function(repartidorID) {
  if (!validateMongoID(repartidorID)) {
    throw new Error('No se conoce un repartidor con tal id.');
  }

  const objectId = new ObjectId(repartidorID);
  const idRepartidor = { _id: objectId }; 

  try {
    const repartidor = await collection.findOne(idRepartidor);

    if (repartidor) {
      return repartidor;
    } else {
      throw new Error('Repartidor no encontrado');
    }
  } catch (error) {
    throw error;
  }
};



/**
 * Modifica los datos de un repartidor existente
 *
 * body Repartidores_repartidorID_body  (optional)
 * repartidorID String 
 * returns Repartidor
 **/
exports.repartidoresRepartidorIDPUT = async function(body, repartidorID) {
  if (!validateMongoID(repartidorID)) {
    throw new Error('No se conoce un repartidor con tal id.');
  }

  if (!validateRequestBodyRepartidor(body)) {
    throw new Error('Request Body no válido');
  }

  const objectId = new ObjectId(repartidorID);
  const idRepartidor = { _id: objectId }; 

  try {
    const existingRepartidor = await collection.findOne({ cuil: body.cuil });
    if (existingRepartidor && existingRepartidor._id != repartidorID) {
      throw new Error('Request Body no válido');
    }

    const result = await collection.updateOne(idRepartidor, { $set: body });
    // se podría incluir otro error en caso de que no modifique porque el request body es igual a los datos de la db
    if (result.matchedCount === 0) {
      throw new Error('No se conoce un repartidor con tal id.');
    }
    
    // armo el body con la id pasada por parámetro para no hacer otro request a la db, el update no devuelve el item nuevo
    const responseBody = { ...body, _id: repartidorID };
    return responseBody;
  } catch (error) {
    throw error;
  }
};