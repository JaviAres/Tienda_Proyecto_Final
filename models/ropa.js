const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ropaSchema = new Schema({
    prenda: String,
    talla: String,
    descripcion: String,
    precio:Number,
    imagen:String
})

//Creamos el modelo
const Ropa = mongoose.model('database_wallabob', ropaSchema, "ropa");

module.exports = Ropa;