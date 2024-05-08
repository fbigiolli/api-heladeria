'use strict';


/**
 * Lista los potes que componen un pedido
 *
 * pedidoId Integer id del pedido
 * returns List
 **/
exports.pedidosPedidoIdPotesGET = function(pedidoId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "peso" : "500",
  "_links" : { },
  "gustos" : [ {
    "_links" : {
      "self" : {
        "verb" : "GET",
        "href" : "http://foo.com/bar"
      }
    },
    "id" : "ddl"
  }, {
    "_links" : {
      "self" : {
        "verb" : "GET",
        "href" : "http://foo.com/bar"
      }
    },
    "id" : "ddl"
  } ],
  "id" : 1
}, {
  "peso" : "500",
  "_links" : { },
  "gustos" : [ {
    "_links" : {
      "self" : {
        "verb" : "GET",
        "href" : "http://foo.com/bar"
      }
    },
    "id" : "ddl"
  }, {
    "_links" : {
      "self" : {
        "verb" : "GET",
        "href" : "http://foo.com/bar"
      }
    },
    "id" : "ddl"
  } ],
  "id" : 1
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Agrega un pote a un pedido
 *
 * body PedidoId_potes_body  (optional)
 * pedidoId Integer id del pedido
 * returns Pote
 **/
exports.pedidosPedidoIdPotesPOST = function(body,pedidoId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "peso" : "500",
  "_links" : { },
  "gustos" : [ {
    "_links" : {
      "self" : {
        "verb" : "GET",
        "href" : "http://foo.com/bar"
      }
    },
    "id" : "ddl"
  }, {
    "_links" : {
      "self" : {
        "verb" : "GET",
        "href" : "http://foo.com/bar"
      }
    },
    "id" : "ddl"
  } ],
  "id" : 1
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * quitar un pote de un pedido
 *
 * pedidoId Integer id del pedido
 * poteId Integer id del pote
 * no response value expected for this operation
 **/
exports.pedidosPedidoIdPotesPoteIdDELETE = function(pedidoId,poteId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

