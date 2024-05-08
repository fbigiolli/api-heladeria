'use strict';

var utils = require('../utils/writer.js');
var PotesDeUnPedido = require('../service/PotesDeUnPedidoService');

module.exports.pedidosPedidoIdPotesGET = function pedidosPedidoIdPotesGET (req, res, next, pedidoId) {
  PotesDeUnPedido.pedidosPedidoIdPotesGET(pedidoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.pedidosPedidoIdPotesPOST = function pedidosPedidoIdPotesPOST (req, res, next, body, pedidoId) {
  PotesDeUnPedido.pedidosPedidoIdPotesPOST(body, pedidoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.pedidosPedidoIdPotesPoteIdDELETE = function pedidosPedidoIdPotesPoteIdDELETE (req, res, next, pedidoId, poteId) {
  PotesDeUnPedido.pedidosPedidoIdPotesPoteIdDELETE(pedidoId, poteId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
