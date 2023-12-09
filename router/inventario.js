const { Router } = require('express');
const Inventario = require('../models/Inventario');
const bycript = require('bcryptjs');
const { validationResult, check } = require('express-validator');
const{validarJWT}=require('../middleware/validar-jwt');
const{validarRolAdmin}=require('../middleware/validar-rol-admin');

const router = Router();

router.post('/', [validarJWT, validarRolAdmin], [
    check('serial', 'serial no valido').not().isEmpty(),
    check('modelo', 'modelo no valido').not().isEmpty(),
    check('descripcion', 'descripcion no valido').not().isEmpty(),
    check('color', 'color no valido').not().isEmpty(),
    check('foto', 'foto no valido').not().isEmpty(),
    check('fechaCompra', 'fechaCompra no valido').not().isEmpty(),
    check('precio', 'precio no valido').not().not().isEmpty().isFloat({min:0}),
    check('usuario', 'usuario no valido').not().isEmpty(),
    check('marca', 'marca no valido').not().isEmpty(),
    check('estadoEquipo', 'estadoEquipo no valido').not().isEmpty(),
    check('tipoEquipo', 'tipoEquipo no valido').not().isEmpty(),

], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const existeInventarioPorSerial = await Inventario.findOne({ serial: req.body.serial });
        if (existeInventarioPorSerial) {
            return res.status(400).send('serial ya existe para otro equipo');
        }

        let inventario = new Inventario();
        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.color = req.body.color;
        inventario.foto = req.body.foto;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario._id;
        inventario.marca = req.body.marca._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.fechaCreacion = new Date();
        inventario.fechaActualizacion = new Date();

        inventario = await inventario.save();

        res.send(inventario);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.get('/', [validarJWT], async function(req, res){
    try {
        const inventarios=await Inventario.find().populate([
            {
                path:'usuario', select:'nombre email estado'
            },
            {
                path:'marca', select:'nombre estado'
            },
            {
                path:'estadoEquipo', select:'nombre estado'
            },
            {
                path:'tipoEquipo', select:'nombre estado'
            }
        ]);
        res.send(inventarios);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:inventarioId', [validarJWT, validarRolAdmin], [
    check('serial', 'serial no valido').not().isEmpty(),
    check('modelo', 'modelo no valido').not().isEmpty(),
    check('descripcion', 'descripcion no valido').not().isEmpty(),
    check('color', 'color no valido').not().isEmpty(),
    check('foto', 'foto no valido').not().isEmpty(),
    check('fechaCompra', 'fechaCompra no valido').not().isEmpty(),
    check('precio', 'precio no valido').not().not().isEmpty().isFloat({min:0}),
    check('usuario', 'usuario no valido').not().isEmpty(),
    check('marca', 'marca no valido').not().isEmpty(),
    check('estadoEquipo', 'estadoEquipo no valido').not().isEmpty(),
    check('tipoEquipo', 'tipoEquipo no valido').not().isEmpty(),

], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const existeInventarioPorSerial = await Inventario.findOne({ serial: req.body.serial });
        if (existeInventarioPorSerial) {
            return res.status(400).send('serial ya existe para otro equipo');
        }

        let inventario = await Inventario.findById(req.params.inventarioId);
        if(!inventario){
            return res.status(400).send('inventario no existe');
        }
        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.color = req.body.color;
        inventario.foto = req.body.foto;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario._id;
        inventario.marca = req.body.marca._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.fechaActualizacion = new Date();

        inventario = await inventario.save();

        res.send(inventario);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

module.exports=router;