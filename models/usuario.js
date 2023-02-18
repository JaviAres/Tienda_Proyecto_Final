const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    email:String,
    password:String
})

//Creamos el modelo
const Usuario = mongoose.model('database_usuario', usuarioSchema, "index");

module.exports = Usuario;
