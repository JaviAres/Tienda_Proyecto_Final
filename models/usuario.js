const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    prenda: String,
    talla: String,
    descripcion: String,
    precio:Number,
    imagen:String,
    tipoUsuario:Number,
    email:String
})

//Creamos el modelo
const Usuario = mongoose.model('database_usuario', usuarioSchema, "usuario");

module.exports = Usuario;
