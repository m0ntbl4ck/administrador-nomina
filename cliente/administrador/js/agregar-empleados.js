$(document).ready(function () {
    $("#form-agregar-empleado").submit(function (e) {
        e.preventDefault();
        let datos_empleado = $(this).serialize();
    console.log(datos_empleado);
        $.ajax({
          url: "http://localhost:3000/agregar-empleados",
          method: "post",
          data: datos_empleado,
          success: function (respuesta) {
            alert(respuesta);
          }
        })
      })
    })