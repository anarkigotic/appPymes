'use strict'
var actividadModel = require('../models/economicActivity.module');
var bcrypt = require('bcryptjs');


function getAll(req, res) {
    actividadModel.find({}).then(actividad => {
        return res.json({
            ok: true,
            mensaje: 'actividades cargadas con exito',
            actividad
        })
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            error: err
        });

    });
}

function createActivity(req, res) {
    var body = req.body;
    var valores_validos = ['nombre','codigo','descripcion'];
    var actividad = {};
    for (let param in body) {
        if (valores_validos.includes(param)) {
            actividad[param] = body[param];
        }
    }
    var actividadM = new actividadModel(actividad);
    actividadM.save().then(actividad => {
        return res.status(200).json({
            ok: true,
            mensaje: 'actividad economica creada con exito',
            actividad
        });
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            error: err
        });
    });
}

function getActivity(req, res) {
    var id = req.params.id;
    actividadModel.findById(id).then(actividades => {
        return res.json({
            ok: true,
            mensaje: 'actividades economicas cargadas con exito',
            actividades
        })
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            error: err
        });

    });
}

function updateActivity(req, res) {
    var id = req.params.id;
    var body = req.body;
    var valores_validos = ['nombre','codigo','descripcion'];
    var actividades = {};
    for (let param in body) {
        if (valores_validos.includes(param)) {
            actividades[param] = body[param]
        }
    }
    if (Object.keys(actividades).length > 0) {
        actividadModel.findByIdAndUpdate(id, actividades, { new: true }).then(actividad => {
            return res.status(200).json({
                ok: true,
                mensaje: 'actividad economica actualizada con exito',
                actividad
            });
        }).catch(err => {
            return res.status(500).json({
                ok: false,
                error: err
            });
        });
    } else {
        return res.status(500).json({
            ok: false,
            error: {
                erros: [
                    'ningun valor enviado o valido'
                ]
            }
        });
    }

}

function deleteActivity(req, res) {
    var id = req.params.id;
    actividadModel.findByIdAndDelete(id).then(pym => {
        return res.status(200).json({
            ok: true,
            mensaje: 'actividad economica borrada con exito',
            pym
        });
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            error: err
        });
    });
}




module.exports = {
    getAll,
    createActivity,
    getActivity,
    updateActivity,
    deleteActivity
}