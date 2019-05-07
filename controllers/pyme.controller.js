'use strict'
var pymeModel = require('../models/pyme.module');

function getAll(req, res) {
    pymeModel.find({}).then(pyme => {
        return res.json({
            ok: true,
            mensaje: 'pymes cargadas con exito',
            pymes: pyme
        })
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            error: err
        });

    });
}

function createPyme(req, res) {
    var body = req.body;
    var valores_validos = ['nit', 'razon_social', 'nombre_contacto', 'pagina_web', 'mayorista'];
    var pyme = {};
    for (let param in body) {
        if (valores_validos.includes(param)) {
            pyme[param] = body[param]
        }
    }
    var pymemodel = new pymeModel(pyme);
    pymemodel.save().then(pym => {
        return res.status(200).json({
            ok: true,
            mensaje: 'pyme creada con exito',
            pym
        });
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            error: err
        });
    });
}

function getPyme(req, res) {
    var id = req.params.id;
    pymeModel.findById(id).then(pyme => {
        return res.json({
            ok: true,
            mensaje: 'pymes cargadas con exito',
            pymes: pyme
        })
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            error: err
        });

    });
}

function updatePyme(req, res) {
    var id = req.params.id;
    var body = req.body;
    var valores_validos = ['nit', 'razon_social', 'nombre_contacto', 'pagina_web', 'mayorista'];
    var pyme = {};
    for (let param in body) {
        if (valores_validos.includes(param)) {
            pyme[param] = body[param]
        }
    }
    if (Object.keys(pyme).length > 0) {
        pymeModel.findByIdAndUpdate(id, pyme, { new: true }).then(pym => {
            return res.status(200).json({
                ok: true,
                mensaje: 'pyme actualozada con exito',
                pym
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

function deletePyme(req, res) {
    var id = req.params.id;
    pymeModel.findByIdAndDelete(id).then(pym => {
        return res.status(200).json({
            ok: true,
            mensaje: 'pyme borrada con exito',
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
    createPyme,
    getPyme,
    updatePyme,
    deletePyme
}