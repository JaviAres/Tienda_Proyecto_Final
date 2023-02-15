const express = require('express');
const router = express.Router();
const Ropa = require('../models/ropa');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayRopaDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayRopa que tenemos EN LA VISTA
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
    res.render('crearropa'); //nueva vista que llamaremos Crear
 })

 router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    console.log(body) //Para comprobarlo por pantalla
    try {
        const ropaDB = new Ropa(body) //Creamos un nuevo Ropa, gracias al modelo
        await ropaDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/ropa') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})
router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "ropa.ejs" le pusimos
    //a este campo ropa.id, por eso lo llamados con params.id
    try {
        const ropaDB = await Ropa.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable “Ropa” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log(ropaDB) //Para probarlo por consola
        res.render('detalleropa', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
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
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const ropaDB = await Ropa.findByIdAndDelete({ _id: id });
        console.log(ropaDB)
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/ropa') //Esto daría un error, tal y como podemos ver arriba
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
