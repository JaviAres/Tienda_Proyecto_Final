const express = require('express');
const router = express.Router();
const Libros = require('../models/libros');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayLibrosDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayLibros que tenemos EN LA VISTA
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
    res.render('crearlibros'); //nueva vista que llamaremos Crear
 })

 router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    console.log(body) //Para comprobarlo por pantalla
    try {
        const librosDB = new Libros(body) //Creamos un nuevo Libros, gracias al modelo
        await librosDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/libros') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})
router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "libros.ejs" le pusimos
    //a este campo libros.id, por eso lo llamados con params.id
    try {
        const librosDB = await Libros.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable “Libros” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log(librosDB) //Para probarlo por consola
        res.render('detallelibros', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
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
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const librosDB = await Libros.findByIdAndDelete({ _id: id });
        console.log(librosDB)
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/libros') //Esto daría un error, tal y como podemos ver arriba
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
