const { Router } = require('express');
const Marca = require('../models/Marca');
const { validationResult, check } = require('express-validator');
const{validarJWT}=require('../middleware/validar-jwt');
const{validarRolAdmin}=require('../middleware/validar-rol-admin');
const { route } = require('./usuario');

const router = Router();

router.post('/', [validarJWT, validarRolAdmin], [
    check('nombre', 'nombre no valido').not().isEmpty(),
    check('estado', 'estado no valido').isIn(['Activo', 'Inactivo']),
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let marca = new Marca();
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;

        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();

        marca = await marca.save();

        res.send(marca);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.get('/', [validarJWT, validarRolAdmin], async function(req, res){
    try {
        const marcas=await Marca.find();
        res.send(marcas);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:marcaId', [validarJWT, validarRolAdmin], [
    check('nombre', 'nombre no valido').not().isEmpty(),
    check('estado', 'estado no valido').isIn(['Activo', 'Inactivo']),
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let marca = await Marca.findById(req.params.marcaId);
        if(!marca){
            return res.status(400).send('Marca no existe');
        }

        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaActualizacion = new Date();

        marca = await marca.save();

        res.send(marca);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});



module.exports=router;