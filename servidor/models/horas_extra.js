const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let model_horas_extra = new Schema({
  id_empleado: String,
  fecha: String,
  numero_horas: Number,
  monto: Number,
});

module.exports = mongoose.model('horas_extra', model_horas_extra);
