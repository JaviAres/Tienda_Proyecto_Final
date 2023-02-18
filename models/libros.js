const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const librosSchema = new Schema({
    titulo: String,
    autor: String,
    descripcion: String,
    defecto: String,
    precio:Number,
})

//Creamos el modelo
const Libros = mongoose.model('database_libros', librosSchema, "libros");

module.exports = Libros;
