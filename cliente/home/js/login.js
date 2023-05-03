$(document).ready(function () {
  $('#alert').hide();
  /* let check;
  $('#check_empleado').click(function () {
    let check = $('#check_empleado').val();
  });
  if (check != undefined){
      check= 'administrador'; */

  $('#login_admin').submit((e) => {
    e.preventDefault();
    let datos_ingresados = Object.fromEntries(new FormData(e.target));

    if (datos_ingresados.tipo_usuario == undefined) {
      datos_ingresados = $('#login_admin').serialize();
      $.ajax({
        url: 'http://localhost:3000/login_admin',
        method: 'post',
        data: datos_ingresados,
        success: function (resp) {
          if (resp == true) {
            window.location.href = 'http://localhost:3000/listado-empleados';
          } else {
            $('#alert').show();
          }
          //"';
        },
      });
    } else {
      datos_ingresados = $('#login_admin').serialize();
      $.ajax({
        url: 'http://localhost:3000/login_empleado',
        method: 'post',
        data: datos_ingresados,
        success: function (resp) {
          if (resp === true) {
            window.location.href = 'http://localhost:3000/principal_empleado';
          } else {
            $('#alert').show();
          }
        },
      });
    }
  });
});
