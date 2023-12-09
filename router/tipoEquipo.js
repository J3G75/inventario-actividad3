const { Router } = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const { validationResult, check } = require('express-validator');
const{validarJWT}=require('../middleware/validar-jwt');
const{validarRolAdmin}=require('../middleware/validar-rol-admin');

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

        let tipoEquipo = new TipoEquipo();
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;

        tipoEquipo.fechaCreacion = new Date();
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();

        res.send(tipoEquipo);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.get('/', [validarJWT, validarRolAdmin], async function(req, res){
    try {
        const tipoEquipos=await TipoEquipo.find();
        res.send(tipoEquipos);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:tipoEquipoId', [validarJWT, validarRolAdmin], [
    check('nombre', 'nombre no valido').not().isEmpty(),
    check('estado', 'estado no valido').isIn(['Activo', 'Inactivo']),
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        if(!tipoEquipo){
            return res.status(400).send('Tipo de equipo no existe');
        }
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;

        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();

        res.send(tipoEquipo);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

module.exports=router;