'use strict'
var pymeModel = require('../models/pyme.module');



async function profilePyme(req,res) {
    let id = req.params.id;
    let dataPyme = await pymeModel.findById(id,{razon_social:1,_id:0});
    console.log(dataPyme);
    
    
  
}

module.exports = {
    profilePyme
}