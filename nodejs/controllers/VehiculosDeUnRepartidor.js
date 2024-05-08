'use strict';

var utils = require('../utils/writer.js');
var VehiculosDeUnRepartidor = require('../service/VehiculosDeUnRepartidorService');

module.exports.repartidoresRepartidorIDVehiculosGET = function repartidoresRepartidorIDVehiculosGET (req, res, next, repartidorID) {
  VehiculosDeUnRepartidor.repartidoresRepartidorIDVehiculosGET(repartidorID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.repartidoresRepartidorIDVehiculosPOST = function repartidoresRepartidorIDVehiculosPOST (req, res, next, body, repartidorID) {
  VehiculosDeUnRepartidor.repartidoresRepartidorIDVehiculosPOST(body, repartidorID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.repartidoresRepartidorIDVehiculosVehiculoIDPUT = function repartidoresRepartidorIDVehiculosVehiculoIDPUT (req, res, next, body, repartidorID, vehiculoID) {
  VehiculosDeUnRepartidor.repartidoresRepartidorIDVehiculosVehiculoIDPUT(body, repartidorID, vehiculoID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
