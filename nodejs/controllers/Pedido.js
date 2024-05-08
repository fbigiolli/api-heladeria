'use strict';

var utils = require('../utils/writer.js');
var Pedido = require('../service/PedidoService');

module.exports.pedidosPOST = function pedidosPOST (req, res, next, body) {
  Pedido.pedidosPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.pedidosPedidoIdGET = function pedidosPedidoIdGET (req, res, next, pedidoId) {
  Pedido.pedidosPedidoIdGET(pedidoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.pedidosPedidoIdPUT = function pedidosPedidoIdPUT (req, res, next, body, pedidoId) {
  Pedido.pedidosPedidoIdPUT(body, pedidoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.pedidosPedidoIdRepartidorDELETE = function pedidosPedidoIdRepartidorDELETE (req, res, next, pedidoId) {
  Pedido.pedidosPedidoIdRepartidorDELETE(pedidoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.pedidosPedidoIdRepartidorPUT = function pedidosPedidoIdRepartidorPUT (req, res, next, body, pedidoId) {
  Pedido.pedidosPedidoIdRepartidorPUT(body, pedidoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
