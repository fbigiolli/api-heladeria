'use strict';


/**
 * Inicia el pago del pedido
 *
 * body DatosDePago  (optional)
 * pedidoId Integer id del pedido
 * no response value expected for this operation
 **/
exports.pedidosPedidoIdPagarPOST = function(body,pedidoId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Ver el estado del pago de un pedido particular
 *
 * pedidoId Integer id del pedido
 * returns Pago
 **/
exports.pedidosPedidoIdPagoGET = function(pedidoId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "status" : "pago aceptado"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

