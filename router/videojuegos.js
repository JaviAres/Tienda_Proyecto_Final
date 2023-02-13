const express = require('express');
const router = express.Router();
const Videojuegos = require('../models/videojuegos');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayVideojuegosDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayVideojuegos que tenemos EN LA VISTA
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
    res.render('crearvideojuegos'); //nueva vista que llamaremos Crear
 })

 router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    console.log(body) //Para comprobarlo por pantalla
    try {
        const videojuegosDB = new Videojuegos(body) //Creamos un nuevo Videojuegos, gracias al modelo
        await videojuegosDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/videojuegos') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})
router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "videojuegos.ejs" le pusimos
    //a este campo videojuegos.id, por eso lo llamados con params.id
    try {
        const videojuegosDB = await Videojuegos.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable “Videojuegos” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log(videojuegosDB) //Para probarlo por consola
        res.render('detallevideojuegos', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
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
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const videojuegosDB = await Videojuegos.findByIdAndDelete({ _id: id });
        console.log(videojuegosDB)
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/videojuegos') //Esto daría un error, tal y como podemos ver arriba
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
