const express = require('express');
const router = express.Router();
const Libros = require('../models/libros');

router.get('/', async (req, res) => {
    try {
        const arrayLibrosDB = await Libros.find();
        console.log(arrayLibrosDB);
        res.render("libros", { 
            arrayLibros: arrayLibrosDB
        })
    } catch (error) {
        console.error(error)
    }
})


router.get('/crearlibros', (req, res) => {
    res.render('crearlibros'); 
 })

 router.post('/', async (req, res) => {
    const body = req.body 
    console.log(body)
    try {
        const librosDB = new Libros(body) //Creamos un nuevo Libros
        await librosDB.save() //Lo guardamos con .save()
        res.redirect('/libros') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})
router.get('/:id', async(req, res) => { 
    const id = req.params.id 
    try {
        const librosDB = await Libros.findOne({ _id: id }) 
        console.log(librosDB) //Para probarlo por consola
        res.render('detallelibros', { //Para mostrar el objeto en la vista "detalle"
            libros: librosDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detallelibros', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Libros no encontrado!'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const librosDB = await Libros.findByIdAndDelete({ _id: id });
        console.log(librosDB)
        if (!librosDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el libro.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Libro eliminado.'
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
        const librosDB = await Libros.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(librosDB)
        res.json({
            estado: true,
            mensaje: 'Libro editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el libro'
        })
    }
})

 
module.exports = router;
