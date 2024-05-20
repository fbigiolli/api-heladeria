'use strict';

var path = require('path');
var http = require('http');

var oas3Tools = require('oas3-tools');
const { dbDisconnect } = require('./db/dbConnection');
var serverPort = 8080;

// API configuration
require('./config');

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();

module.exports = app;

process.on('exit', async function() {
    console.log('Closing MongoDB connection...');
    await dbDisconnect()
});

const server = http.createServer(app);

// Initialize the Swagger middleware
server.listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

module.exports = server; // for testing