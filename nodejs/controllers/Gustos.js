'use strict';

var utils = require('../utils/writer.js');
var Gustos = require('../service/GustosService');

module.exports.gustosGET = function gustosGET (req, res, next, tipo) {
  Gustos.gustosGET(tipo)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.gustosGustoIdGET = function gustosGustoIdGET (req, res, next, gustoId) {
  Gustos.gustosGustoIdGET(gustoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function () {
      res.status(404).send('No se conoce un gusto con tal id');
    });
};

