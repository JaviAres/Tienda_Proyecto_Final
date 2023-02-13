const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const juegos_mesaSchema = new Schema({
    titulo: String,
    descripcion: String,
    precio:Number,
    imagen:String
})

//Creamos el modelo
const Juegos_mesa = mongoose.model('database_wallabob', juegos_mesaSchema, "juegos_mesa");

module.exports = Juegos_mesa;
