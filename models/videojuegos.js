const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videojuegosSchema = new Schema({
    titulo: String,
    descripcion: String,
    precio:Number,
    imagen:String
})

//Creamos el modelo
const Videojuegos = mongoose.model('database_videojuegos', videojuegosSchema, "videojuegos");

module.exports = Videojuegos;
