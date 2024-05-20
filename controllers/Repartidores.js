'use strict';

var utils = require('../utils/writer.js');
var Repartidores = require('../service/RepartidoresService');

module.exports.repartidoresGET = function repartidoresGET (req, res, next, edad) {
  Repartidores.repartidoresGET(edad)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      res.status(400).send('Hubo un error de validacion en el parametro edad');
    });
};

module.exports.repartidoresPOST = function repartidoresPOST (req, res, next, body) {
  Repartidores.repartidoresPOST(body)
    .then(function (response) {
      res.status(201).json(response);
    })
    .catch(function (response) {
      res.status(400).send('Error de validacion en el request body.');
    });
};

module.exports.repartidoresRepartidorIDDELETE = function repartidoresRepartidorIDDELETE (req, res, next, repartidorID) {
  Repartidores.repartidoresRepartidorIDDELETE(repartidorID)
    .then(function (response) {
      res.status(204).send();
    })
    .catch(function (response) {
      res.status(404).send('No se conoce un repartidor con tal id');
    });
};

module.exports.repartidoresRepartidorIDGET = function repartidoresRepartidorIDGET (req, res, next, repartidorID) {
  Repartidores.repartidoresRepartidorIDGET(repartidorID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      res.status(404).send("No se conoce un repartidor con tal id.");
    });
};

module.exports.repartidoresRepartidorIDPUT = function repartidoresRepartidorIDPUT (req, res, next, body, repartidorID) {
  Repartidores.repartidoresRepartidorIDPUT(body, repartidorID)
    .then(function (response) {
      res.status(200).send(response);
    })
    .catch(function (error) {
      if (error.message === 'Request Body no válido') {
        res.status(400).send('Request Body no válido');
      } else {
        res.status(404).send('No se conoce un repartidor con tal id');
      }
    });
  };