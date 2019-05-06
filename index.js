'use strict'
var mongoose = require('mongoose');

// Configuracion
var server = require('./config/config').server;
var db = require('./config/config').db;

var app = require('./app');




const configdb = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
}

mongoose.connect(`mongodb://${db.serverdb}:${db.portdb}/${db.database}`, configdb).then(() => {
    app.listen((process.env.PORT || server.port), () => {
        console.log("conectado al servidor ok");
    })
}).catch(err => {
    console.log("no se pudo conectar al servidor de db ", err);
});
