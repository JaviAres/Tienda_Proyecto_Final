const express = require('express');
const router = express.Router();
const Juegos_mesa = require('../models/juegos_mesa');

router.get('/', async (req, res) => {
    try {
        const arrayJuegos_mesaDB = await Juegos_mesa.find();
        console.log(arrayJuegos_mesaDB);
        res.render("juegos_mesa", { 
            arrayJuegos_mesa: arrayJuegos_mesaDB
        })
    } catch (error) {
        console.error(error)
    }
})


router.get('/crearjuegos_mesa', (req, res) => {
    res.render('crearjuegos_mesa'); 
 })

 router.post('/', async (req, res) => {
    const body = req.body 
    console.log(body) 
    try {
        const juegos_mesaDB = new Juegos_mesa(body) //Creamos un nuevo Juegos_mesa, gracias al modelo
        await juegos_mesaDB.save() //Lo guardamos con .save()
        res.redirect('/juegos_mesa') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})
router.get('/:id', async(req, res) => { 
    const id = req.params.id 
    
    try {
        const juegos_mesaDB = await Juegos_mesa.findOne({ _id: id })
        console.log(juegos_mesaDB) //Para probarlo por consola
        res.render('detallejuegos_mesa', { //Mostrar el objeto en la vista "detalle"
            juegos_mesa: juegos_mesaDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detallejuegos_mesa', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Juego de mesa no encontrado!'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const juegos_mesaDB = await Juegos_mesa.findByIdAndDelete({ _id: id });
        console.log(juegos_mesaDB)
        if (!juegos_mesaDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el Juego de mesa.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Juego de mesa eliminado.'
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
        const juegos_mesaDB = await Juegos_mesa.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(juegos_mesaDB)
        res.json({
            estado: true,
            mensaje: 'Juego de mesa editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Juego de mesa'
        })
    }
})

 
module.exports = router;
