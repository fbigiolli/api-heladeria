'use strict';


/**
 * Listar los repartidores de la heladeria
 *
 * edad Integer  (optional)
 * returns List
 **/
exports.repartidoresGET = function(edad) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "_links" : {
    "vehiculos" : {
      "verb" : "GET",
      "href" : "http://foo.com/bar"
    }
  },
  "apellido" : "Merentiel",
  "id" : "MM82731674",
  "cuil" : 20429577635,
  "nombre" : "Miguel",
  "edad" : 21
}, {
  "_links" : {
    "vehiculos" : {
      "verb" : "GET",
      "href" : "http://foo.com/bar"
    }
  },
  "apellido" : "Merentiel",
  "id" : "MM82731674",
  "cuil" : 20429577635,
  "nombre" : "Miguel",
  "edad" : 21
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Crea un nuevo repartidor
 *
 * body Repartidores_body  (optional)
 * returns Repartidor
 **/
exports.repartidoresPOST = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "_links" : {
    "vehiculos" : {
      "verb" : "GET",
      "href" : "http://foo.com/bar"
    }
  },
  "apellido" : "Merentiel",
  "id" : "MM82731674",
  "cuil" : 20429577635,
  "nombre" : "Miguel",
  "edad" : 21
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Elimina el repartidor asociado a esta ID
 *
 * repartidorID String 
 * no response value expected for this operation
 **/
exports.repartidoresRepartidorIDDELETE = function(repartidorID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Obtiene los datos de un repartidor de la heladeria
 *
 * repartidorID String 
 * returns Repartidor
 **/
exports.repartidoresRepartidorIDGET = function(repartidorID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "_links" : {
    "vehiculos" : {
      "verb" : "GET",
      "href" : "http://foo.com/bar"
    }
  },
  "apellido" : "Merentiel",
  "id" : "MM82731674",
  "cuil" : 20429577635,
  "nombre" : "Miguel",
  "edad" : 21
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Modifica los datos de un repartidor existente
 *
 * body Repartidores_repartidorID_body  (optional)
 * repartidorID String 
 * returns Repartidor
 **/
exports.repartidoresRepartidorIDPUT = function(body,repartidorID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "_links" : {
    "vehiculos" : {
      "verb" : "GET",
      "href" : "http://foo.com/bar"
    }
  },
  "apellido" : "Merentiel",
  "id" : "MM82731674",
  "cuil" : 20429577635,
  "nombre" : "Miguel",
  "edad" : 21
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

