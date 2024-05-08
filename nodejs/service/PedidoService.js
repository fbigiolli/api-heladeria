'use strict';


/**
 * Crear un nuevo pedido a la dirección indicada
 *
 * body Pedidos_body  (optional)
 * returns Pedido
 **/
exports.pedidosPOST = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "repartidor" : {
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
  },
  "_links" : {
    "potes" : {
      "verb" : "GET",
      "href" : "http://foo.com/bar"
    }
  },
  "id" : 22,
  "direccion_entrega" : "Lavalleja 244 4C, CABA"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Ver un pedido particular
 *
 * pedidoId Integer id del pedido
 * returns Pedido
 **/
exports.pedidosPedidoIdGET = function(pedidoId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "repartidor" : {
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
  },
  "_links" : {
    "potes" : {
      "verb" : "GET",
      "href" : "http://foo.com/bar"
    }
  },
  "id" : 22,
  "direccion_entrega" : "Lavalleja 244 4C, CABA"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Cambiar los datos de un pedido particular
 *
 * body Pedidos_pedidoId_body  (optional)
 * pedidoId Integer id del pedido
 * returns Pedido
 **/
exports.pedidosPedidoIdPUT = function(body,pedidoId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "repartidor" : {
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
  },
  "_links" : {
    "potes" : {
      "verb" : "GET",
      "href" : "http://foo.com/bar"
    }
  },
  "id" : 22,
  "direccion_entrega" : "Lavalleja 244 4C, CABA"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Quitar el repartidor asociado del pedido
 *
 * pedidoId Integer id del pedido
 * no response value expected for this operation
 **/
exports.pedidosPedidoIdRepartidorDELETE = function(pedidoId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Cambiar el repartidor asociado al pedido
 *
 * body PedidoId_repartidor_body  (optional)
 * pedidoId Integer id del pedido
 * returns Pedido
 **/
exports.pedidosPedidoIdRepartidorPUT = function(body,pedidoId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "repartidor" : {
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
  },
  "_links" : {
    "potes" : {
      "verb" : "GET",
      "href" : "http://foo.com/bar"
    }
  },
  "id" : 22,
  "direccion_entrega" : "Lavalleja 244 4C, CABA"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

