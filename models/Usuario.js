const{Schema, model}=require('mongoose');

// Creacion de la entidad Usuario con todos sus campos

const UsuarioSchema=Schema({
    nombre:{type:String, require:true},
    email:{type:String, require:true, unique:true},
    estado:{type:String,require:true, enum:['Activo', 'Inactivo']},
    password:{type: String, require:true},
    rol:{type:String, require:true, enum:['Administrador','Docente']},
    fechaCreacion:{type: Date, require:true},
    fechaActualizacion:{type:Date, require:true}
});

module.exports=model('Usuario', UsuarioSchema);