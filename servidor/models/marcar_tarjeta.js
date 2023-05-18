const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let marcar_tarjeta = new Schema({
  dni: String,
  fecha: Date,
  hora_entrada: String,
  hora_salida: String,
  cant_horas: Number,
  horas_extra: Number,
});

module.exports = mongoose.model('marcar_tarjeta', marcar_tarjeta);
