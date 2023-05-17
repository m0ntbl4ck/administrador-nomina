const cerrarsesion = () => {
  localStorage.clear();
  window.location.href = 'http://localhost:3000/';
};

$(document).ready(function () {
  $('#cargos').submit((e) => {
    e.preventDefault();
    let cargos = $('#cargos').serialize();

    $.ajax({
      url: 'http://localhost:3000/add-cargos',
      method: 'POST',
      data: cargos,
      success: function (resp) {
        window.location.href = 'http://localhost:3000/tabla-cargos';
        // Aquí puede actualizar la tabla para mostrar el nuevo registro
      },
      error: function (error) {
        console.log(error);
      },
    });
  });
});
