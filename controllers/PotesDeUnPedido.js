'use strict';

var utils = require('../utils/writer.js');
var PotesDeUnPedido = require('../service/PotesDeUnPedidoService');

module.exports.pedidosPedidoIdPotesGET = function pedidosPedidoIdPotesGET (req, res, next, pedidoId) {
  PotesDeUnPedido.pedidosPedidoIdPotesGET(pedidoId)
    .then(function (response) {
      res.status(200).send(response);
    })
    .catch(function (error) {
      res.status(404).send(error.message);
    });
};

module.exports.pedidosPedidoIdPotesPOST = function pedidosPedidoIdPotesPOST (req, res, next, body, pedidoId) {
  PotesDeUnPedido.pedidosPedidoIdPotesPOST(body, pedidoId)
    .then(function (response) {
      res.status(201).send(response);
    })
    .catch(function (error) {
      if (error.message === 'Error de validacion en los gustos.') {
        res.status(400).send(error.message);
      } else {   
        res.status(404).send(error.message);
      }
    });
};

module.exports.pedidosPedidoIdPotesPoteIdDELETE = function pedidosPedidoIdPotesPoteIdDELETE (req, res, next, pedidoId, poteId) {
  PotesDeUnPedido.pedidosPedidoIdPotesPoteIdDELETE(pedidoId, poteId)
    .then(function (response) {
      res.status(204).send();
    })
    .catch(function (error) {
      res.status(404).send(error.message);
    });
};
