'use strict';

const { ObjectId } = require('mongodb');
const {client} = require('../db/dbConnection');
const { validateMongoID } = require('../utils/validation/validateMongoID');
const database = client.db('Via-Apilia');
const collection = database.collection('Pedidos');
const repartidoresCollection = database.collection('Repartidores');

/**
 * Crear un nuevo pedido a la dirección indicada
 *
 * body Pedidos_body  (optional)
 * returns Pedido
 **/
exports.pedidosPOST = function(body) {
  
  return new Promise(async function(resolve, reject) {
      (async() =>{
        try { 
  
          const repartidorAsignado = await repartidoresCollection.findOne();
          body.repartidor = repartidorAsignado;
  
          const result = await collection.insertOne(body);
          const insertedId = result.insertedId;
  
          const responseBody = { ...body, _id: insertedId };
  
          resolve(responseBody);
        } catch (error) {
          reject(error);
        }
      })()
    });
}



/**
 * Ver un pedido particular
 *
 * pedidoId Integer id del pedido
 * returns Pedido
 **/
exports.pedidosPedidoIdGET = function(pedidoId) {
  if (!validateMongoID(pedidoId)) {
    return Promise.reject(new Error('ID de pedido no válido'));
  }

  const objectId = new ObjectId(pedidoId);
  const idPedido = { _id: objectId }; 

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const pedido = await collection.findOne(idPedido);
        
        if (pedido) {
          resolve(pedido);
        } else {
          const error = new Error('Pedido no encontrado');
          reject(error);
        }
      } catch (error) {
        console.error("Error fetching pedidos:", error);
        reject(error);
      }
    })()
  });
}


/**
 * Cambiar los datos de un pedido particular
 *
 * body Pedidos_pedidoId_body  (optional)
 * pedidoId Integer id del pedido
 * returns Pedido
 **/
exports.pedidosPedidoIdPUT = function(body,pedidoId) {
  if (!validateMongoID(pedidoId)) {
    return Promise.reject(new Error('No se conoce un pedido con tal id.'));
  }

  const objectId = new ObjectId(pedidoId);
  const idPedido = { _id: objectId }; 

  return new Promise(function(resolve, reject) {
    (async()=>{
      try {
        const result = await collection.updateOne(idPedido, {$set : body});
        if (result.matchedCount === 0) {
          throw new Error('No se conoce un pedido con tal id.');
        }
  
        const responseBody = { ...body, _id: pedidoId };
  
        resolve(responseBody);
      } catch (error) {
        reject(error);
      }
    })()
  });
}


/**
 * Quitar el repartidor asociado del pedido
 *
 * pedidoId Integer id del pedido
 * no response value expected for this operation
 **/
exports.pedidosPedidoIdRepartidorDELETE = function(pedidoId) {
  if (!validateMongoID(pedidoId)) {
    return Promise.reject(new Error('No se conoce un pedido con tal id.'));
  }

  const objectId = new ObjectId(pedidoId);
  const idPedido = { _id: objectId }; 

  return new Promise(function(resolve, reject) {
    (async () => {
      try {
        const result = await collection.updateOne(idPedido, { $set: { repartidor: {} } });
        // se podria incluir otro error en caso de que no modifique porque el request body es igual a los datos de la db
        if (result.matchedCount === 0) {
          throw new Error('No se conoce un repartidor con tal id.');
        }
        
        resolve();
      } catch (error) {
        reject(error);
      }
    })()
  });
}


/**
 * Cambiar el repartidor asociado al pedido
 *
 * body PedidoId_repartidor_body  (optional)
 * pedidoId Integer id del pedido
 * returns Pedido
 **/
exports.pedidosPedidoIdRepartidorPUT = function(body,pedidoId) {
  if (!validateMongoID(pedidoId)) {
    return Promise.reject(new Error('No se conoce un pedido con tal id.'));
  }

  if (!validateMongoID(body.id_repartidor)) {
    return Promise.reject(new Error('Hubo un error al validar los datos del repartidor'));
  }

  const objectIdPedido = new ObjectId(pedidoId);
  const idPedido = { _id: objectIdPedido }; 

  const objectIdRepartidor = new ObjectId(body.id_repartidor);
  const idRepartidor = { _id: objectIdRepartidor }; 

  return new Promise(function(resolve, reject) {
    (async () => {
      try {
        const repartidor = await repartidoresCollection.findOne(idRepartidor);
        if (!repartidor) {
          throw new Error('Hubo un error al validar los datos del repartidor');
        }
  
        const result = await collection.findOneAndUpdate(
          idPedido,
          { $set: { repartidor: repartidor } },
          { returnOriginal: false }
        );

        if (!result) {
          throw new Error('No se conoce un pedido con tal id.');
        }
  
        resolve(result);
      } catch (error) {
        reject(error);
      }
    })()
  });
}

