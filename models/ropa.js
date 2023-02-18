const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ropaSchema = new Schema({
    prenda: String,
    talla: String,
    descripcion: String,
    defecto: String,
    precio:Number,
})

//Creamos el modelo
const Ropa = mongoose.model('database_ropa', ropaSchema, "ropa");

module.exports = Ropa;
