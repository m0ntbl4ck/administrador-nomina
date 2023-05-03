//Paquetes y modulos
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

//conexión base de datos
mongoose
  .connect(
    'mongodb+srv://montblack123:M0ngoBd123117@cluster0.dnkngga.mongodb.net/nomina?retryWrites=true&w=majority',
  )

  .then(function (db) {
    console.log('conectado a la base de datos');
  })
  .catch(function (err) {
    console.log(err);
  });

//configuraciones
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/css', express.static(path.resolve('../cliente/administrador/css')));
app.use('/js', express.static(path.resolve('../cliente/administrador/js')));
app.use('/js', express.static(path.resolve('../cliente/home/js')));

const Admin = require('./models/administrador');
const Empleados = require('./models/empleados');
const Deducible = require('./models/deducibles');
const Cargos = require('./models/cargos');
const Horas_extra = require('./models/horas_extra');

//Ruta Principal
app.get('/', function (req, res) {
  res.sendFile(path.resolve('../cliente/home/html/index.html'));
});

/* Rutas Brandon  */
// Inicio de sesion administrador
app.post('/login_admin', async function (req, res) {
  let login_usuario = req.body.usuario;
  let login_contras = req.body.contrasena;

  let existe_admin = await Admin.findOne({
    $and: [{ usuario: login_usuario }, { contrasena: login_contras }],
  });
  console.log(existe_admin);
  if (existe_admin != null) {
    res.send(true);
    console.log('claves ' + existe_admin.usuario, existe_admin.contrasena);
  } else {
    res.send(false);
  }
});
// Inicio de sesion empleado
app.post('/login_empleado', async function (req, res) {
  let login_usuario = Math.floor(req.body.usuario);
  let login_contras = req.body.contrasena;

  let existe_admin = await Empleados.findOne({
    $and: [{ dni: login_usuario }, { contrasena: login_contras }],
  });
  console.log(existe_admin);
  if (existe_admin != null) {
    res.send(true);
    console.log('claves ' + existe_admin.usuario, existe_admin.contrasena);
  } else {
    res.send(false);
  }
});

app.listen(3000, function () {
  console.log('Servidor listo y preparado en el puerto 3000');
});
