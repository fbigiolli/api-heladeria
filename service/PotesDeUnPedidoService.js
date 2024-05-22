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
exports.pedidosPedidoIdPotesGET = function(pedidoId) {
  if (!validateMongoID(pedidoId)) {
    return Promise.reject(new Error(noSeConocePedidoErrorDescription));
  }

  const objectId = new ObjectId(pedidoId);
  const idPedido = { _id: objectId }; 
  const idPedidoAsociado = { idPedidoAsociado: pedidoId }; 

  return new Promise(function(resolve, reject) {
    (async() =>{
      try {
        const pedidoAsociado = await collectionPedidos.findOne(idPedido);

        if (pedidoAsociado) {
          const potes = await collectionPotes.find(idPedidoAsociado).toArray();
          resolve(potes);
        } else {
          const error = new Error(noSeConocePedidoErrorDescription);
          reject(error);
        }
      } catch (error) {
        reject(error);
      }
    })()
  });
}


/**
 * Agrega un pote a un pedido
 *
 * body PedidoId_potes_body  (optional)
 * pedidoId Integer id del pedido
 * returns Pote
 **/
exports.pedidosPedidoIdPotesPOST = function(body,pedidoId) {

  if (!validateMongoID(pedidoId)) {
    return Promise.reject(new Error(noSeConocePedidoErrorDescription));
  }

  const objectId = new ObjectId(pedidoId);
  const idPedido = { _id: objectId }; 

  return new Promise(function(resolve, reject) {
  (async () =>{
    try {
      const pedidoAsociado = await collectionPedidos.findOne(idPedido);

      // se podria devolver en cual fue el error de validacion
      const gustosHeladeria = await collectionGustos.find().toArray();  

      if(! validateRequestBodyPote(body, gustosHeladeria) ){ 
        return reject(new Error(noSePudoValidarRequestBodyErrorDescription));
      }

      if (pedidoAsociado) {
        body.idPedidoAsociado = pedidoId;
        const result = await collectionPotes.insertOne(body);
        const insertedId = result.insertedId;
      
        const responseBody = { ...body, _id: insertedId };
        resolve(responseBody);
      } else {
        const error = new Error(noSeConocePedidoErrorDescription);
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  })()
});
}


/**
 * quitar un pote de un pedido
 *
 * pedidoId Integer id del pedido
 * poteId Integer id del pote
 * no response value expected for this operation
 **/
exports.pedidosPedidoIdPotesPoteIdDELETE = function(pedidoId,poteId) {
  if (!validateMongoID(pedidoId)) {
    return Promise.reject(new Error(noSeConocePedidoErrorDescription));
  }

  if (!validateMongoID(poteId)) {
    return Promise.reject(new Error(noSeConocePoteErrorDescription));
  }
  
  const objectId = new ObjectId(poteId);
  const idPote = { _id: objectId , idPedidoAsociado: pedidoId}; 

  return new Promise(function(resolve, reject) {
    (async() =>{
      const deletedDocument = await collectionPotes.findOneAndDelete(idPote);
      if(deletedDocument){
        resolve()
      }else{
        reject(new Error(noSeConocePoteErrorDescription));
      }
    })()
  });
}

