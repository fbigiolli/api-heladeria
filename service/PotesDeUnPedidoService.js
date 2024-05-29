'use strict';

const { ObjectId } = require("mongodb");
const { client } = require("../db/dbConnection");
const { validateMongoID } = require("../utils/validation/validateMongoID");
const { validateRequestBodyPote } = require("../utils/validation/validateRequestBodyPote");


const database = client.db('Via-Apilia');
const collectionPotes = database.collection('Potes');
const collectionPedidos = database.collection('Pedidos');
const collectionGustos = database.collection('Gustos');

const noSeConocePedidoErrorDescription = 'No se conoce un pedido con tal id.';
const noSeConocePoteErrorDescription = 'No se conoce un pote con tal id.';
const noSePudoValidarRequestBodyErrorDescription = 'Error de validacion en los gustos.';


/**
 * Lista los potes que componen un pedido
 *
 * pedidoId Integer id del pedido
 * returns List
 **/
exports.pedidosPedidoIdPotesGET = async function(pedidoId) {
  validateMongoID(pedidoId, noSeConocePedidoErrorDescription);

  const objectId = new ObjectId(pedidoId);
  const idPedido = { _id: objectId }; 
  const idPedidoAsociado = { idPedidoAsociado: pedidoId }; 

  const pedidoAsociado = await collectionPedidos.findOne(idPedido);

  if (pedidoAsociado) {
    const potes = await collectionPotes.find(idPedidoAsociado).toArray();
    return potes;
  } else {
    throw new Error(noSeConocePedidoErrorDescription);
  }
};



/**
 * Agrega un pote a un pedido
 *
 * body PedidoId_potes_body  (optional)
 * pedidoId Integer id del pedido
 * returns Pote
 **/
exports.pedidosPedidoIdPotesPOST = async function(body, pedidoId) {
  validateMongoID(pedidoId, noSeConocePedidoErrorDescription);

  const objectId = new ObjectId(pedidoId);
  const idPedido = { _id: objectId }; 

  const pedidoAsociado = await collectionPedidos.findOne(idPedido);

  // se podría devolver en cuál fue el error de validación
  const gustosHeladeria = await collectionGustos.find().toArray();  

  if (!validateRequestBodyPote(body, gustosHeladeria)) { 
    throw new Error(noSePudoValidarRequestBodyErrorDescription);
  }

  if (pedidoAsociado) {
    body.idPedidoAsociado = pedidoId;
    const result = await collectionPotes.insertOne(body);
    const insertedId = result.insertedId;

    const responseBody = { ...body, _id: insertedId };
    return responseBody;
  } else {
    throw new Error(noSeConocePedidoErrorDescription);
  }
};



/**
 * quitar un pote de un pedido
 *
 * pedidoId Integer id del pedido
 * poteId Integer id del pote
 * no response value expected for this operation
 **/
exports.pedidosPedidoIdPotesPoteIdDELETE = async function(pedidoId, poteId) {
  validateMongoID(pedidoId, noSeConocePedidoErrorDescription);

  validateMongoID(poteId, noSeConocePoteErrorDescription);
  
  const objectId = new ObjectId(poteId);
  const idPote = { _id: objectId , idPedidoAsociado: pedidoId}; 

  const deletedDocument = await collectionPotes.findOneAndDelete(idPote);
  if (deletedDocument) {
    return;
  } else {
    throw new Error(noSeConocePoteErrorDescription);
  }
};