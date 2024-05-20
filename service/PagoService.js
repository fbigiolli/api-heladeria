'use strict';

const { client } = require("../db/dbConnection");
const { validateMongoID } = require("../utils/validation/validateMongoID");
const { validateRequestBodyPago } = require("../utils/validation/validateRequestBodyPago");
const database = client.db('Via-Apilia');
const collection = database.collection('Pagos');


/**
 * Inicia el pago del pedido
 *
 * body DatosDePago  (optional)
 * pedidoId Integer id del pedido
 * no response value expected for this operation
 **/
exports.pedidosPedidoIdPagarPOST = function(body,pedidoId) {
  
  if (!validateMongoID(pedidoId)) {
    return Promise.reject(new Error('No se conoce un pedido con tal id.'));
  }

  if(!validateRequestBodyPago(body)){
    return Promise.reject(new Error('Hubo un error al validar los datos de pago.'));
  }
  return new Promise(function(resolve, reject) {
    // CHECK QUE NO HAYA YA UN PAGO ASOCIADO !!
    (async()=>{
      // habria que efectuar el pago antes de mandar a la db pago en proceso, para ver si tenemos que rechazarlo de arranque
      try {
        // almacenar los datos? o cambiar?
        body.idPedidoAsociado = pedidoId;
        await collection.insertOne(body);

        const { idRepartidorAsociado, ...responseBody } = body;
        responseBody._id = pedidoId;
        resolve(responseBody);
      } catch (error) {
        reject(error);
      }
    })()
    
  });
}


/**
 * Ver el estado del pago de un pedido particular
 *
 * pedidoId Integer id del pedido
 * returns Pago
 **/
exports.pedidosPedidoIdPagoGET = function(pedidoId) {

  if (!validateMongoID(pedidoId)) {
    return Promise.reject(new Error('No se conoce un pedido con tal id.'));
  }

  return new Promise(function(resolve, reject) {
    (async()=>{ 
      try {
        const pago = await collection.findOne({idPedidoAsociado : pedidoId});
        if (pago) {
          resolve(pago);
        }else{
          const responseBody = {"status" : "pendiente de pago"};
          resolve(responseBody);
        }
      } catch (error) {
        reject(error);
      }
    })()
  });
}

