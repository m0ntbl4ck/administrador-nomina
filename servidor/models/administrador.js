const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let model_administrador = new Schema({
  usuario: String,
  contrasena: String,
});

module.exports = mongoose.model('administradores', model_administrador);
