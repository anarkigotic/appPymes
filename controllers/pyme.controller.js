'use strict'
var pymeModel = require('../models/pyme.module');
var bcrypt = require('bcryptjs');


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
    var valores_validos = ['nit','actividades','numero_contacto','numero_contacto','razon_social', 'nombre_contacto','region','sector', 'pagina_web', 'mayorista'];
    var pyme = {};
    for (let param in body) {
        if (valores_validos.includes(param)) {
            pyme[param] = body[param];
        }
    }
    if(pyme.actividades == undefined){
        return res.status(500).json({
            ok: false,
            error: [
                {
                    "message":"por lo menos tiene que tener una actividad"
                }
            ]})
    }
    pyme.password = body.password ? bcrypt.hashSync(body.password, 10) : false;
    if (!pyme.password) {
        return res.status(500).json({
            ok: false,
            error: { errors: ["la contraseña es obligatoria"] }
        });
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
    var valores_validos = ['nit','actividades','numero_contacto','numero_contacto','razon_social', 'nombre_contacto','region','sector', 'pagina_web', 'mayorista'];
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

function login(req, res) {
    var body = req.body;
    pymeModel.findOne({ nit: body.nit }).then(usr => {
        if (!usr) {
            return res.status(400).json({
                ok: true,
                message: 'credenciales incorrectas - nit',
                errors: usr
            })

        }
        if (!bcrypt.compareSync(body.password, usr.password)) {
            return res.status(400).json({
                ok: true,
                message: 'credenciales incorrectas -password',
                errors: null
            });
        }
        usr.password = ':)';
        res.status(200).json({
            ok: true,
            message: usr,
            id: usr._id

        })
    }).catch(err => {
        res.status(500).json({
            ok: true,
            message: 'Error al buscar usuarios',
            errors: err
        })

    });

}


module.exports = {
    getAll,
    createPyme,
    getPyme,
    updatePyme,
    deletePyme,
    login
}