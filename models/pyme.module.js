var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var pymeSchema = new Schema({
    nit: {
        type: String,
        unique: true,
        required: [true, 'el nit es necesario']
    },
    razon_social: {
        type: String,
        required: [true, 'la razon social es necesaria']
    },
    nombre_contacto: {
        type: String,
        required: [true, 'El nombre del contacto es necesario']
    },
    pagina_web: {
        type: String
    },
    mayorista: {
        type: Boolean,
        default: false,
        required: true
    }
});

pymeSchema.plugin(uniqueValidator, {
    message: "{PATH} debe ser unico"
});

module.exports = mongoose.model("Pyme", pymeSchema);