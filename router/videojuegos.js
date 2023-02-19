const express = require('express');
const router = express.Router();
const Videojuegos = require('../models/videojuegos');

router.get('/', async (req, res) => {
    try {
        const arrayVideojuegosDB = await Videojuegos.find();
        console.log(arrayVideojuegosDB);
        res.render("videojuegos", { 
            arrayVideojuegos: arrayVideojuegosDB
        })
    } catch (error) {
        console.error(error)
    }
})


router.get('/crearvideojuegos', (req, res) => {
    res.render('crearvideojuegos'); 
 })

 router.post('/', async (req, res) => {
    const body = req.body 
    console.log(body) 
    try {
        const videojuegosDB = new Videojuegos(body) //Creamos un nuevo Videojuegos
        await videojuegosDB.save() //Lo guardamos con .save()
        res.redirect('/videojuegos') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})
router.get('/:id', async(req, res) => { 
    const id = req.params.id 
    try {
        const videojuegosDB = await Videojuegos.findOne({ _id: id })
        console.log(videojuegosDB) //Para probarlo 
        res.render('detallevideojuegos', { //Para mostrar el objeto en la vista "detalle"
            videojuegos: videojuegosDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detallevideojuegos', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Videojuego no encontrado!'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const videojuegosDB = await Videojuegos.findByIdAndDelete({ _id: id });
        console.log(videojuegosDB)
        if (!videojuegosDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el videojuego.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Videojuego eliminado.'
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
        const videojuegosDB = await Videojuegos.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(videojuegosDB)
        res.json({
            estado: true,
            mensaje: 'Videojuego editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el videojuego'
        })
    }
})

 
module.exports = router;
