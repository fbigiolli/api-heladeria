'use strict';

const { ObjectId } = require("mongodb");
const { client } = require("../db/dbConnection");
const { validateMongoID } = require("../utils/validation/validateMongoID");
const { validateRequestBodyVehiculo } = require("../utils/validation/validateRequestBodyVehiculo");

const database = client.db('Via-Apilia');
const collectionRepartidores = database.collection('Repartidores');
const collectionVehiculos = database.collection('VehiculosRepartidores');

const noSeConoceRepartidorErrorDescription = 'No existe un repartidor asociado a la ID.';
const noSePudoValidarRequestBodyErrorDescription = 'Hubo un error de validacion con alguno de los datos.';
const noSeConoceVehiculoErrorDescription = 'No existe un vehiculo asociado a la ID.';
/**
 * Listar los vehiculos de un repartidor de la heladeria
 *
 * repartidorID String 
 * returns List
 **/
exports.repartidoresRepartidorIDVehiculosGET = async function(repartidorID) {
  validateMongoID(repartidorID, noSeConoceRepartidorErrorDescription);

  const objectId = new ObjectId(repartidorID);
  const idRepartidor = { _id: objectId };
  const idRepartidorAsociado = { idRepartidorAsociado: repartidorID }; 

  const repartidorAsociado = await collectionRepartidores.findOne(idRepartidor);
  if (repartidorAsociado) {
    const vehiculos = await collectionVehiculos.find(idRepartidorAsociado, { projection: { idRepartidorAsociado: 0 } }).toArray();
    return vehiculos;
  } else {
    throw new Error(noSeConoceRepartidorErrorDescription);
  }
};


/**
 * Crea un nuevo vehiculo asociado al repartidor
 *
 * body RepartidorID_vehiculos_body  (optional)
 * repartidorID String 
 * returns Vehiculo
 **/
exports.repartidoresRepartidorIDVehiculosPOST = async function(body, repartidorID) {
  validateMongoID(repartidorID, noSeConoceRepartidorErrorDescription);

  if (!validateRequestBodyVehiculo(body)) {
    throw new Error(noSePudoValidarRequestBodyErrorDescription);
  }

  const objectId = new ObjectId(repartidorID);
  const idRepartidor = { _id: objectId }; 

  const repartidorAsignado = await collectionRepartidores.findOne(idRepartidor); 
  const patenteExistente = await collectionVehiculos.findOne({ patente: body.patente });

  if (patenteExistente) {
    throw new Error(noSePudoValidarRequestBodyErrorDescription);
  }

  if (repartidorAsignado) {
    body.idRepartidorAsociado = repartidorID;
    const result = await collectionVehiculos.insertOne(body);
    const insertedId = result.insertedId;

    const { idRepartidorAsociado, ...responseBody } = body;
    responseBody._id = insertedId;

    return responseBody;
  } else {
    throw new Error(noSeConoceRepartidorErrorDescription);
  }
};




/**
 * Modifica un vehiculo existente asociado al repartidor
 *
 * body Vehiculos_vehiculoID_body  (optional)
 * repartidorID String 
 * vehiculoID String 
 * returns Vehiculo
 **/
exports.repartidoresRepartidorIDVehiculosVehiculoIDPUT = async function(body, repartidorID, vehiculoID) {
  validateMongoID(repartidorID, noSeConoceRepartidorErrorDescription);

  validateMongoID(vehiculoID, noSeConoceVehiculoErrorDescription);

  if (!validateRequestBodyVehiculo(body)) {
    throw new Error(noSePudoValidarRequestBodyErrorDescription);
  }

  const objectIdRepartidor = new ObjectId(repartidorID);
  const idRepartidor = { _id: objectIdRepartidor }; 

  const objectIdVehiculo = new ObjectId(vehiculoID);
  const idVehiculo = { _id: objectIdVehiculo }; 

  const repartidorAsignado = await collectionRepartidores.findOne(idRepartidor);
  const vehiculoAModificar = await collectionVehiculos.findOne(idVehiculo);
  const patenteExistente =  await collectionVehiculos.findOne({ patente: body.patente });

  if (patenteExistente && patenteExistente._id != vehiculoID) {
    throw new Error(noSePudoValidarRequestBodyErrorDescription);
  }

  if (!vehiculoAModificar) {
    throw new Error(noSeConoceVehiculoErrorDescription);
  }

  if (repartidorAsignado) {
    body.idRepartidorAsociado = repartidorID;
    await collectionVehiculos.replaceOne(idVehiculo, body);

    const { idRepartidorAsociado, ...responseBody } = body;
    responseBody._id = vehiculoID;

    return responseBody;
  } else {
    throw new Error(noSeConoceRepartidorErrorDescription);
  }
};