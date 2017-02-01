var servi = require('servi');
var app = new servi(true);

serveFiles("public");
port(80);
start();
