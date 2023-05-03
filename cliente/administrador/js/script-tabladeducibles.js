$(document).ready(function () {
  $.ajax({
    url: 'http://localhost:3000/obtener-deducibles',
    method: 'get',
    success: function (resp) {
      showdeducibles(resp);
    },
  });
  const showdeducibles = (resp) => {
    $('#tbody').empty();
    for (let i = 0; i < resp.length; i++) {
      console.log(resp[i]);
      $('#tbody').append(
        `<tr><td>${resp[i].descripcion}</td><td>${resp[i].descuento}
        </td>
        <button class="btn btn-danger" onclick="eliminar('${resp[i]._id}')"
        >Eliminar</button></td></tr>`,
      );
    }
  };
});
