const{Schema, model}=require('mongoose');

// Creacion de la entidad TipoEquipo con todos sus campos

const TipoEquipoSchema=Schema({
    nombre:{type:String, require:true},
    estado:{type:String,require:true, enum:['Activo', 'Inactivo']},
    fechaCreacion:{type: Date, require:true},
    fechaActualizacion:{type:Date, require:true}
});

module.exports=model('TipoEquipo', TipoEquipoSchema);