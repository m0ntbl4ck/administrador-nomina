const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let model_empleados = new Schema({
  nombre: String,
  apellido: String,
  dni: String,
  fecha_nacimiento: String,
  telefono: Number,
  email: String,
  direccion: String,
  cargo: String,
  contrasena: String,
});

module.exports = mongoose.model('empleados', model_empleados);
