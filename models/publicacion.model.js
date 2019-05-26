var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var publicacionSchema = new Schema({
    id_pyme :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pyme',
        required:true
    },
    descripcion:{
        type:String,
        required:[true,"la descripcion es requerida"]
    }

});

publicacionSchema.plugin(uniqueValidator, {
    message: "{PATH} debe ser unico"
});

module.exports = mongoose.model("publication", publicacionSchema);