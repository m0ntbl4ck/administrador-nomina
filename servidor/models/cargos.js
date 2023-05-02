const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let model_cargos = new Schema({
  nombre_cargo: String,
  monto_hora: Number,
});

module.exports = mongoose.model('cargos', model_cargos);
