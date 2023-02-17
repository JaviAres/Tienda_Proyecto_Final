const express = require('express')
const bodyParser=require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
require('dotenv').config()
const port=process.env.PORT||3005
/*Conexión a la Base de Datos locales
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test',{userNewUrlParser: true, useUnifiedTopology: true});
*/

//Conexión a base de datos remotas
const mongoose = require('mongoose');
//Variables que tendremos siempre:
//Lo correcto será declararlas EN VARIABLES DE ENTORNO
//para que nadie vea directamente nuestras credenciales

const uri =`mongodb+srv://${process.env.db_user}:${process.env.db_password}@cluster0.ut6txeq.mongodb.net/${process.env.db_name}?retryWrites=true&w=majority`; //URL de conexión, que completaremos luego

mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log(e))



app.set('views', __dirname+'/views')
app.set('view engine', 'ejs')

app.use(express.static(__dirname+'/public'))


//Routes
app.use('/', require('./router/rutas'));
app.use('/libros', require("./router/libros"))
app.use('/ropa',require("./router/ropa"))
app.use('/usuario',require("./router/usuario"))
app.use('/videojuegos',require("./router/videojuegos"))
app.use('/juegos_mesa',require("./router/juegos_mesa"))
//app.use('/carrito',require("./router/carrito"))
app.use((req, res)=>{
    res.status(404).render("404",{tituloError:"Error 404",tituloDescripcion:"Pagina no existe manin"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

