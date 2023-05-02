const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let model_administrador = new Schema({
  usuario: String,
  contrasena: String,
  id: String,
});

module.exports = mongoose.model('administrador', model_administrador);
