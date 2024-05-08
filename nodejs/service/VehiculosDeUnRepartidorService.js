'use strict';


/**
 * Listar los vehiculos de un repartidor de la heladeria
 *
 * repartidorID String 
 * returns List
 **/
exports.repartidoresRepartidorIDVehiculosGET = function(repartidorID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ "", "" ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Crea un nuevo vehiculo asociado al repartidor
 *
 * body RepartidorID_vehiculos_body  (optional)
 * repartidorID String 
 * returns Vehiculo
 **/
exports.repartidoresRepartidorIDVehiculosPOST = function(body,repartidorID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "tipoDeVehiculo" : "Auto",
  "idVehiculo" : "A312786DCA223",
  "_links" : {
    "modificar_vehiculo" : {
      "verb" : "GET",
      "href" : "http://foo.com/bar"
    }
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Modifica un vehiculo existente asociado al repartidor
 *
 * body Vehiculos_vehiculoID_body  (optional)
 * repartidorID String 
 * vehiculoID String 
 * returns Vehiculo
 **/
exports.repartidoresRepartidorIDVehiculosVehiculoIDPUT = function(body,repartidorID,vehiculoID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "tipoDeVehiculo" : "Auto",
  "idVehiculo" : "A312786DCA223",
  "_links" : {
    "modificar_vehiculo" : {
      "verb" : "GET",
      "href" : "http://foo.com/bar"
    }
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

