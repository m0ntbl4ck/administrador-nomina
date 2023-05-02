$(document).ready(function () {
  $('#login_admin').submit((e) => {
    e.preventDefault();
    let datos_ingresados = $('#login_admin').serialize();

    $.ajax({
      url: 'http://localhost:3000/login_admin',
      method: 'post',
      data: datos_ingresados,
      success: function (resp) {
        alert(resp);
      },
    });
  });
});
