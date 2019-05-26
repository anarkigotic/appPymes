var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var ActivityEconomicSchema = new Schema({
    nombre:{
        type:String,
        require:[true,'el nombre es requerido']
 
    },
    codigo:{
        type:Number,
        require:[true,'el codigo es requerido']
    },
    descripcion:{
        type:String
    }
   
});

ActivityEconomicSchema.plugin(uniqueValidator, {
    message: "{PATH} debe ser unico"
});

module.exports = mongoose.model("actividadEcomonica", ActivityEconomicSchema);