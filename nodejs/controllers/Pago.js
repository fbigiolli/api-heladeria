'use strict';

var utils = require('../utils/writer.js');
var Pago = require('../service/PagoService');

module.exports.pedidosPedidoIdPagarPOST = function pedidosPedidoIdPagarPOST (req, res, next, body, pedidoId) {
  Pago.pedidosPedidoIdPagarPOST(body, pedidoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.pedidosPedidoIdPagoGET = function pedidosPedidoIdPagoGET (req, res, next, pedidoId) {
  Pago.pedidosPedidoIdPagoGET(pedidoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
