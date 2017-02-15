require('babel-register');

var app = require('./lib/index').default;

var dataDir = `${__dirname}/data`;
var port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app(dataDir, port);
