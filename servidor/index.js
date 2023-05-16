//Paquetes y modulos
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/css', express.static(path.resolve('../cliente/administrador/css')));
app.use('/js', express.static(path.resolve('../cliente/administrador/js')));
app.use('/js', express.static(path.resolve('../cliente/home/js')));
app.use('/css', express.static(path.resolve('../cliente/home/css')));
app.use('/js', express.static(path.resolve('../cliente/empleado/js')));
app.use('/css', express.static(path.resolve('../cliente/empleado/css')));

const Admin = require('./models/administrador');
const Empleados = require('./models/empleados');
const Deducible = require('./models/deducibles');
const Cargos = require('./models/cargos');
const Horas_extra = require('./models/horas_extra');

//Ruta Principal
app.get('/', function (req, res) {
  //res.sendFile(path.resolve('../cliente/home/html/crearadmin.html'));
  res.sendFile(path.resolve('../cliente/home/html/index.html'));
});

app.post('/crear-admin', async function (req, res) {
  const { usuario, contrasena } = req.body;
  /* const saltRounds = 10;
  const passwordHash = await bcrypt.hash(contrasena, saltRounds); */
  const administrador = new Admin({ usuario, contrasena });
  await administrador.save();
  res.send('Guardados satisfactoriamente');
});
/* Rutas Brandon  */
// Inicio de sesion administrador
app.post('/login-admin', async function (req, res) {
  const { usuario, contrasena } = req.body;

  let existe_admin = await Admin.findOne({
    $and: [{ usuario }, { contrasena }],
  });
  console.log(existe_admin);
  if (existe_admin != null) {
    res.send(existe_admin);
  } else {
    res.send(false);
  }
});

// Inicio de sesion empleado
app.post('/login-empleado', async function (req, res) {
  const { usuario, contrasena } = req.body;

  let existe_empleado = await Empleados.findOne({
    $and: [{ dni: usuario }, { contrasena: contrasena }],
  });
  console.log(existe_empleado);
  if (existe_empleado != null) {
    res.send(existe_empleado);
  } else {
    res.send(false);
  }
});

//ruta principal empleado
app.get('/principal-empleado', function (req, res) {
  res.sendFile(
    path.resolve('../cliente/empleado/html/principal-empleado.html'),
  );
});

//ruta pedir datos del empleado
app.get('/pedir-datos-empleado', async function (req, res) {
  const { dni } = req.body;
  let datos_usuario = await Empleados.findOne({ dni: dni });
  console.log('datos usuariio' + datos_usuario);
  res.send(datos_usuario);
});

//ruta editar datos empleado
app.get('/editar-empleado', function (req, res) {
  res.sendFile(
    path.resolve('../cliente/empleado/html/editar-datos-empleado.html'),
  );
});

//Ruta guardar cambios de empleado
app.put('/guardar-editar-empleado', async function (req, res) {
  const { dni, telefono, email, direccion } = req.body;

  let editar_empleado = await Empleados.findOneAndUpdate(
    { dni: dni },
    {
      $set: { email: email, telefono: telefono, direccion: direccion },
    },
  );
  res.send(editar_empleado);
});

//ruta marcar entrada y salida
app.get('/marcar-entrada-salida', function (req, res) {
  res.sendFile(
    path.resolve('../cliente/empleado/html/marcar-entrada-salida.html'),
  );
});

app.listen(3000, function () {
  console.log('Servidor listo y preparado en el puerto 3000');
});
