'use strict';

var utils = require('../utils/writer.js');
var VehiculosDeUnRepartidor = require('../service/VehiculosDeUnRepartidorService');

module.exports.repartidoresRepartidorIDVehiculosGET = function repartidoresRepartidorIDVehiculosGET (req, res, next, repartidorID) {
  VehiculosDeUnRepartidor.repartidoresRepartidorIDVehiculosGET(repartidorID)
    .then(function (response) {
      res.status(200).send(response);
    })
    .catch(function (error) {
      res.status(404).send(error.message);
    });
};

module.exports.repartidoresRepartidorIDVehiculosPOST = function repartidoresRepartidorIDVehiculosPOST (req, res, next, body, repartidorID) {
  VehiculosDeUnRepartidor.repartidoresRepartidorIDVehiculosPOST(body, repartidorID)
    .then(function (response) {
      res.status(201).send(response);
    })
    .catch(function (error) {
      if (error.message ==='Hubo un error de validacion con alguno de los datos.') {
        res.status(400).send(error.message)
      }else{
        res.status(404).send(error.message);
      }
    });
};

module.exports.repartidoresRepartidorIDVehiculosVehiculoIDPUT = function repartidoresRepartidorIDVehiculosVehiculoIDPUT (req, res, next, body, repartidorID, vehiculoID) {
  VehiculosDeUnRepartidor.repartidoresRepartidorIDVehiculosVehiculoIDPUT(body, repartidorID, vehiculoID)
  .then(function (response) {
    res.status(201).send(response);
  })
  .catch(function (error) {
    if (error.message ==='Hubo un error de validacion con alguno de los datos.') {
      res.status(400).send(error.message)
    }else{
      res.status(404).send(error.message);
    }
  });
};
