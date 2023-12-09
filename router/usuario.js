const { Router } = require('express');
const Usuario = require('../models/Usuario');
const bycript = require('bcryptjs');
const { validationResult, check } = require('express-validator');
const{validarJWT}=require('../middleware/validar-jwt');
const{validarRolAdmin}=require('../middleware/validar-rol-admin');

const router = Router();

router.post('/',[validarJWT,validarRolAdmin], [
    check('nombre', 'nombre no valido').not().isEmpty(),
    check('email', 'email no valido').isEmail(),
    check('password', 'password no valido').not().isEmpty(),
    check('rol', 'rol no valido').isIn(['Administrador', 'Docente']),
    check('estado', 'estado no valido').isIn(['Activo', 'Inactivo']),
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const existeUsuario = await Usuario.findOne({ email: req.body.email });
        if (existeUsuario) {
            return res.status(400).send('email ya existe');
        }

        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;

        const salt = bycript.genSaltSync();
        const password = bycript.hashSync(req.body.password, salt);
        usuario.password = password;

        usuario.rol = req.body.rol;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();

        res.send(usuario);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.get('/',[validarJWT, validarRolAdmin], async function(req, res){
    try {
        const usuarios=await Usuario.find();
        res.send(usuarios);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:usuarioId',[validarJWT,validarRolAdmin], [
    check('nombre', 'nombre no valido').not().isEmpty(),
    check('email', 'email no valido').isEmail(),
    check('password', 'password no valido').not().isEmpty(),
    check('rol', 'rol no valido').isIn(['Administrador', 'Docente']),
    check('estado', 'estado no valido').isIn(['Activo', 'Inactivo']),
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const existeUsuario = await Usuario.findOne({ email: req.body.email });
        if (existeUsuario) {
            return res.status(400).send('email ya existe');
        }

        let usuario = await Usuario.findById(req.params.usuarioId);
        if(!usuario){
            return res.status(400).send('usuario no existe');
        }
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;

        const salt = bycript.genSaltSync();
        const password = bycript.hashSync(req.body.password, salt);
        usuario.password = password;

        usuario.rol = req.body.rol;
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();

        res.send(usuario);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

//router.delete('/usuarioId')

module.exports=router;