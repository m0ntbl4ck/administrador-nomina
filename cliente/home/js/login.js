$(document).ready(function () {
  $('#alert').hide();

  $('#crearadmin').submit((e) => {
    e.preventDefault();
    let admin_datos = $('#crearadmin').serialize();
    $.ajax({
      url: 'http://localhost:3000/crear-admin',
      method: 'post',
      data: admin_datos,
      success: function (resp) {
        console.log(resp);
      },
    });
  });

  $('#login_admin').submit((e) => {
    e.preventDefault();
    let datos_ingresados = Object.fromEntries(new FormData(e.target));

    if (datos_ingresados.tipo_usuario == undefined) {
      datos_ingresados = $('#login_admin').serialize();
      $.ajax({
        url: 'http://localhost:3000/login-admin',
        method: 'post',
        data: datos_ingresados,
        success: function (resp) {
          if (resp === false) {
            $('#alert').show();
          } else {
            localStorage.getItem('admin', resp);
            window.location.href = 'http://localhost:3000/listado-empleados';
          }
        },
      });
    } else {
      datos_ingresados = $('#login_admin').serialize();
      $.ajax({
        url: 'http://localhost:3000/login-empleado',
        method: 'post',
        data: datos_ingresados,
        success: function (resp) {
          if (resp === false) {
            $('#alert').show();
          } else {
            localStorage.getItem('empleado', resp);
            window.location.href = 'http://localhost:3000/principal-empleado';
          }
        },
      });
    }
  });
});
