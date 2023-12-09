const{Schema, model}=require('mongoose');

// Creacion de la entidad EstadoEquipo con todos sus campos

const EstadoEquipoSchema=Schema({
    nombre:{type:String, require:true},
    estado:{type:String,require:true, enum:['Activo', 'Inactivo']},
    fechaCreacion:{type: Date, require:true},
    fechaActualizacion:{type:Date, require:true}
});

module.exports=model('EstadoEquipo', EstadoEquipoSchema);