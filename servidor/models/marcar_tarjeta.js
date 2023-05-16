const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let marcar_tarjeta = new Schema({
  dni: String,
  fecha: String,
  hora_entrada: String,
  hora_salida: String,
  cant_horas: Number,
  Horas_extra: Number,
});

module.exports = mongoose.model('marcar_tarjeta', marcar_tarjeta);
