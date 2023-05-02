const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let model_deducibles = new Schema({
  descripcion: String,
  descuento: Number,
});

module.exports = mongoose.model('administrador', model_deducibles);
