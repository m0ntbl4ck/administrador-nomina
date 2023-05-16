const mostrardni = (resp) => {
  $('#nombre-empleado').append(
    `${resp.nombre} ${resp.apellido} <br> ${resp.dni} <br> ${resp.nombre_cargo}`,
  );
};
const mostrardatos = (resp) => {
  $('#nombre').val(resp.nombre);
  $('#apellido').val(resp.apellido);
  $('#dni').val(resp.dni);
  $('#telefono').val(resp.telefono);
  $('#fecha-nacimiento').val(resp.fecha_nacimiento);
  $('#email').val(resp.email);
  $('#direccion').val(resp.direccion);
  $('#nombre_cargo').val(resp.nombre_cargo);
  $('#contrasena').val(resp.contrasena);
};

const cerrarsesion = () => {
  localStorage.clear();
  window.location.href = 'http://localhost:3000/';
};
$(document).ready(function () {
  let usuario = JSON.parse(localStorage.getItem('empleado'));
  mostrardni(usuario);

  mostrardatos(usuario);
  /*  $.ajax({
    url: 'http://localhost:3000/pedir-datos-empleado',
    method: '',
    data: usuariodni,
    success: function (resp) {
      mostrardni(resp);
      console.log(resp);
      mostrardatos(resp);
    },
  }); */

  $('#editar-empleado').submit((e) => {
    e.preventDefault();
    let editar = $('#editar-empleado').serialize();

    editar = `${editar}&dni=${usuario.dni}`;

    $.ajax({
      url: 'http://localhost:3000/guardar-editar-empleado',
      method: 'put',
      data: editar,
      success: function (resp) {
        localStorage.clear();
        localStorage.setItem('empleado', JSON.stringify(resp));
        alert('Datos Guardados exitosamente');
        window.location.href = 'http://localhost:3000/principal-empleado';
      },
    });
  });
});
