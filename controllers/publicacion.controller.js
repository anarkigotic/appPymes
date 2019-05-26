'use strict'
var publicacionModel = require('../models/publicacion.model');
var bcrypt = require('bcryptjs');


function create(req, res) {
    var body = req.body;
    var publicacion = {
        "id_pyme": req.params.id,
        "descripcion":body.descripcion
    };
    var pymemodel = new publicacionModel(publicacion);
    pymemodel.save().then(publ => {
        return res.status(200).json({
            ok: true,
            mensaje: 'pyme creada con exito',
            publ
        });
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            error: err
        });
    });
    
}


function getDescripcion(req,res){
    let id = req.params.id;
    publicacionModel.find({id_pyme:id}).then((publicaciones)=>{
        res.json(publicaciones)
    });
}

module.exports = {
    create,
    getDescripcion
}