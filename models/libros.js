const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const librosSchema = new Schema({
    titulo: String,
    descripcion: String,
    precio:Number,
    imagen:String
})

//Creamos el modelo
const Libros = mongoose.model('database_libros', librosSchema, "libros");

module.exports = Libros;
