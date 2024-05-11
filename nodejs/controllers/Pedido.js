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
    .catch(function () {
      res.status(404).send('No se conoce un pedido con tal id');
    });
};

module.exports.pedidosPedidoIdPUT = function pedidosPedidoIdPUT (req, res, next, body, pedidoId) {
  Pedido.pedidosPedidoIdPUT(body, pedidoId)
    .then(function (response) {
      res.status(200).send(response);
    })
    .catch(function (error) {
      res.status(404).send(error.message);
    });
};

module.exports.pedidosPedidoIdRepartidorDELETE = function pedidosPedidoIdRepartidorDELETE (req, res, next, pedidoId) {
  Pedido.pedidosPedidoIdRepartidorDELETE(pedidoId)
    .then(function (response) {
      res.status(204).send();
    })
    .catch(function (error) {
      res.status(404).send(error.message);
    });
};

module.exports.pedidosPedidoIdRepartidorPUT = function pedidosPedidoIdRepartidorPUT (req, res, next, body, pedidoId) {
  Pedido.pedidosPedidoIdRepartidorPUT(body, pedidoId)
    .then(function (response) {
      res.status(200).send(response);
    })
    .catch(function (error) {
      if(error.message === 'Hubo un error al validar los datos del repartidor'){
        res.status(400).send(error.message);
      }else{
        res.status(404).send(error.message);
      }
    });
};
