const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  usuario: String,
  /* passwordHash: String, */
  contrasena: String,
});

module.exports = mongoose.model('administradores', AdminSchema);
