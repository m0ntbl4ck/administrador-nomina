const mostrardni = (resp) => {
  $('#nombre-empleado').append(
    `<p class='fs-4 lh-1'>${resp.nombre} ${resp.apellido}</p>
    <p class='fs-6 fw-normal lh-1'>${resp.dni}</p>
    <p class='fs-6 fw-light lh-1'><small>${resp.nombre_cargo}</small> </p>`,
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
