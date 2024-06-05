'use strict';

var utils = require('../utils/writer.js');
var Pago = require('../service/PagoService');

module.exports.pedidosPedidoIdPagarPOST = function pedidosPedidoIdPagarPOST (req, res, next, body, pedidoId) {
  Pago.pedidosPedidoIdPagarPOST(body, pedidoId)
    .then(function (response) {
      res.status(202).send(response);
    })
    .catch(function (error) {
      if (error.message === 'Hubo un error al validar los datos de pago.' || error.message === 'Ya existe un pago asociado al pedido'){
        res.status(400).send(error.message);
      } 
      else {
        res.status(404).send(error.message);
      }
    });
};

module.exports.pedidosPedidoIdPagoGET = function pedidosPedidoIdPagoGET (req, res, next, pedidoId) {
  Pago.pedidosPedidoIdPagoGET(pedidoId)
    .then(function (response) {
      res.status(200).send(response);
    })
    .catch(function (error) {
      res.status(404).send(error.message);
    });
};
