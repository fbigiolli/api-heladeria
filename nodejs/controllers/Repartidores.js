'use strict';

var utils = require('../utils/writer.js');
var Repartidores = require('../service/RepartidoresService');

module.exports.repartidoresGET = function repartidoresGET (req, res, next, edad) {
  Repartidores.repartidoresGET(edad)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.repartidoresPOST = function repartidoresPOST (req, res, next, body) {
  Repartidores.repartidoresPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.repartidoresRepartidorIDDELETE = function repartidoresRepartidorIDDELETE (req, res, next, repartidorID) {
  Repartidores.repartidoresRepartidorIDDELETE(repartidorID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.repartidoresRepartidorIDGET = function repartidoresRepartidorIDGET (req, res, next, repartidorID) {
  Repartidores.repartidoresRepartidorIDGET(repartidorID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.repartidoresRepartidorIDPUT = function repartidoresRepartidorIDPUT (req, res, next, body, repartidorID) {
  Repartidores.repartidoresRepartidorIDPUT(body, repartidorID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
