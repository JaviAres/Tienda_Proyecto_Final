const express = require('express');
const router = express.Router();
const Juegos_mesa = require('../models/juegos_mesa');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayJuegos_mesaDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayJuegos_mesa que tenemos EN LA VISTA
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
    res.render('crearjuegos_mesa'); //nueva vista que llamaremos Crear
 })

 router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    console.log(body) //Para comprobarlo por pantalla
    try {
        const juegos_mesaDB = new Juegos_mesa(body) //Creamos un nuevo Juegos_mesa, gracias al modelo
        await juegos_mesaDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/juegos_mesa') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})
router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "juegos_mesa.ejs" le pusimos
    //a este campo juegos_mesa.id, por eso lo llamados con params.id
    try {
        const juegos_mesaDB = await Juegos_mesa.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable “Juegos_mesa” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log(juegos_mesaDB) //Para probarlo por consola
        res.render('detallejuegos_mesa', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
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
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const juegos_mesaDB = await Juegos_mesa.findByIdAndDelete({ _id: id });
        console.log(juegos_mesaDB)
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/juegos_mesa') //Esto daría un error, tal y como podemos ver arriba
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
