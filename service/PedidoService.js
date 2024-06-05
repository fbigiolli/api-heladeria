'use strict';

const { ObjectId } = require('mongodb');
const {client} = require('../db/dbConnection');
const { validateMongoID } = require('../utils/validation/validateMongoID');
const database = client.db('Via-Apilia');
const collection = database.collection('Pedidos');
const repartidoresCollection = database.collection('Repartidores');

const noSeConocePedidoErrorDescription = 'No se conoce un pedido con tal id.';
const noSeConoceRepartidorErrorDescription = 'No se conoce un repartidor con tal id.';
const noSePudoValidarRepartidorErrorDescription = 'Hubo un error al validar los datos del repartidor';
/**
 * Crear un nuevo pedido a la dirección indicada
 *
 * body Pedidos_body  (optional)
 * returns Pedido
 **/
exports.pedidosPOST = async function(body) {
  const repartidorAsignado = await repartidoresCollection.findOne();
  body.repartidor = repartidorAsignado;

  const result = await collection.insertOne(body);
  const insertedId = result.insertedId;

  const responseBody = { ...body, _id: insertedId };

  return responseBody;
};


/**
 * Ver un pedido particular
 *
 * pedidoId Integer id del pedido
 * returns Pedido
 **/
exports.pedidosPedidoIdGET = async function(pedidoId) {
  validateMongoID(pedidoId, noSeConocePedidoErrorDescription);

  const objectId = new ObjectId(pedidoId);
  const idPedido = { _id: objectId };

  const pedido = await collection.findOne(idPedido);
  
  if (pedido) {
    return pedido;
  } else {
    throw new Error(noSeConocePedidoErrorDescription);
  }
};



/**
 * Cambiar los datos de un pedido particular
 *
 * body Pedidos_pedidoId_body  (optional)
 * pedidoId Integer id del pedido
 * returns Pedido
 **/
exports.pedidosPedidoIdPUT = async function(body, pedidoId) {
  validateMongoID(pedidoId, noSeConocePedidoErrorDescription);

  const objectId = new ObjectId(pedidoId);
  const idPedido = { _id: objectId };

  const result = await collection.updateOne(idPedido, { $set: body });
  if (result.matchedCount === 0) {
    throw new Error(noSeConocePedidoErrorDescription);
  }

  const responseBody = { ...body, _id: pedidoId };

  return responseBody;
};


/**
 * Quitar el repartidor asociado del pedido
 *
 * pedidoId Integer id del pedido
 * no response value expected for this operation
 **/
exports.pedidosPedidoIdRepartidorDELETE = async function(pedidoId) {
  validateMongoID(pedidoId, noSeConocePedidoErrorDescription);

  const objectId = new ObjectId(pedidoId);
  const idPedido = { _id: objectId };

  const result = await collection.updateOne(idPedido, { $set: { repartidor: {} } });
  // se podría incluir otro error en caso de que no modifique porque el request body es igual a los datos de la db
  if (result.matchedCount === 0) {
    throw new Error(noSeConoceRepartidorErrorDescription);
  }
  
  return;
};



/**
 * Cambiar el repartidor asociado al pedido
 *
 * body PedidoId_repartidor_body  (optional)
 * pedidoId Integer id del pedido
 * returns Pedido
 **/
exports.pedidosPedidoIdRepartidorPUT = async function(body, pedidoId) {
  validateMongoID(pedidoId, noSeConocePedidoErrorDescription);

  validateMongoID(body.id_repartidor, noSePudoValidarRepartidorErrorDescription) 

  const objectIdPedido = new ObjectId(pedidoId);
  const idPedido = { _id: objectIdPedido }; 

  const objectIdRepartidor = new ObjectId(body.id_repartidor);
  const idRepartidor = { _id: objectIdRepartidor }; 

  const repartidor = await repartidoresCollection.findOne(idRepartidor);
  if (!repartidor) {
    throw new Error(noSePudoValidarRepartidorErrorDescription);
  }

  const result = await collection.findOneAndUpdate(
    idPedido,
    { $set: { repartidor: repartidor } },
    { returnOriginal: false }
  );

  if (!result) {
    throw new Error(noSeConocePedidoErrorDescription);
  }

  return result;
};
