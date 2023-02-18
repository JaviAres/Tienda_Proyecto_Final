const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const juegos_mesaSchema = new Schema({
    titulo: String,
    descripcion: String,
    precio:Number,
    defecto: String,
})

//Creamos el modelo
const Juegos_mesa = mongoose.model('databaseJuegos_mesa', juegos_mesaSchema, "juegos_mesa");

module.exports = Juegos_mesa;
