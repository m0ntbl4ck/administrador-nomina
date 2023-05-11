const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let model_horas_extra = new Schema({
  dni_empleado: [{ type: Schema.ObjectId, ref: 'empleados' }],
  fecha: String,
  numero_horas: Number,
  monto: Number,
});

/* model_horas_extra.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject._v;

  },
}); */
module.exports = mongoose.model('horas_extra', model_horas_extra);
