'use strict';

var utils = require('../utils/writer.js');
var Gustos = require('../service/GustosService');

module.exports.gustosGET = function gustosGET (req, res, next, tipo) {
  Gustos.gustosGET(tipo)
    .then(function (response) {
      res.status(200).send(response);
    })
    .catch(function (error) {
      res.status(500).send(error.message);
    });
};

module.exports.gustosGustoIdGET = function gustosGustoIdGET (req, res, next, gustoId) {
  Gustos.gustosGustoIdGET(gustoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function(error) {
      if (error.message === 'Gusto no encontrado') {
        res.status(404).send('No se conoce un gusto con tal id');
      } else {
        res.status(500).send('Error interno del servidor');
      }
    });
};

