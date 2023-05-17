const cerrarsesion = () => {
  localStorage.clear();
  window.location.href = 'http://localhost:3000/';
};
$(document).ready(function () {
  $('#deducibles').submit((e) => {
    e.preventDefault();
    let deducible = $('#deducibles').serialize();

    $.ajax({
      url: 'http://localhost:3000/add-deducibles',
      method: 'POST',
      data: deducible,
      success: function (resp) {
        window.location.href = 'http://localhost:3000/tabla-deducibles';
        // Aquí puede actualizar la tabla para mostrar el nuevo registro
      },
      error: function (error) {
        console.log(error);
      },
    });
  });
});
