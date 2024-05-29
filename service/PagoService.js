'use strict';

const { client } = require("../db/dbConnection");
const { validateMongoID } = require("../utils/validation/validateMongoID");
const { validateRequestBodyPago } = require("../utils/validation/validateRequestBodyPago");
const database = client.db('Via-Apilia');
const collection = database.collection('Pagos');


const noSeConocePedidoErrorDescription = 'No se conoce un pedido con tal id.';
/**
 * Inicia el pago del pedido
 *
 * body DatosDePago  (optional)
 * pedidoId Integer id del pedido
 * no response value expected for this operation
 **/
exports.pedidosPedidoIdPagarPOST = async function(body, pedidoId) {
  
  validateMongoID(pedidoId, noSeConocePedidoErrorDescription);

  validateRequestBodyPago(body);

  // CHECK QUE NO HAYA YA UN PAGO ASOCIADO !!
  // habría que efectuar el pago antes de mandar a la db pago en proceso, para ver si tenemos que rechazarlo de arranque

  // almacenar los datos? o cambiar?
  body.idPedidoAsociado = pedidoId;
  await collection.insertOne(body);

  const { idRepartidorAsociado, ...responseBody } = body;
  responseBody._id = pedidoId;
  return responseBody;
};


/**
 * Ver el estado del pago de un pedido particular
 *
 * pedidoId Integer id del pedido
 * returns Pago
 **/
exports.pedidosPedidoIdPagoGET = async function(pedidoId) {
  validateMongoID(pedidoId, noSeConocePedidoErrorDescription);

  const pago = await collection.findOne({ idPedidoAsociado: pedidoId });
  if (pago) {
    return { status: 'pago en proceso' };
  } else {
    return { status: 'pendiente de pago' };
  }
};