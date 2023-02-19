const express = require('express');
const router = express.Router();
const Ropa = require('../models/ropa');

router.get('/', async (req, res) => {
    try {
        const arrayRopaDB = await Ropa.find();
        console.log(arrayRopaDB);
        res.render("ropa", { 
            arrayRopa: arrayRopaDB
        })
    } catch (error) {
        console.error(error)
    }
})


router.get('/crearropa', (req, res) => {
    res.render('crearropa');
 })

 router.post('/', async (req, res) => {
    const body = req.body 
    console.log(body) 
    try {
        const ropaDB = new Ropa(body) //Creamos un nuevo Ropa, gracias al modelo
        await ropaDB.save() //Lo guardamos con .save()
        res.redirect('/ropa') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})
router.get('/:id', async(req, res) => { 
    const id = req.params.id
    try {
        const ropaDB = await Ropa.findOne({ _id: id })
        console.log(ropaDB) 
        res.render('detalleropa', { //Para mostrar el objeto en la vista "detalle"
            ropa: ropaDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detalleropa', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Ropa no encontrado!'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const ropaDB = await Ropa.findByIdAndDelete({ _id: id });
        console.log(ropaDB)
        if (!ropaDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar la prenda.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Prenda eliminada.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const ropaDB = await Ropa.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(ropaDB)
        res.json({
            estado: true,
            mensaje: 'Prenda editada'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar la prenda'
        })
    }
})

 
module.exports = router;
