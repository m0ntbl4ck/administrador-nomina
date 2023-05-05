$(document).ready(function () {
    $("#form-agregar-empleado").submit(function (e) {
        e.preventDefault();
        let datos = $(this).serialize();
    
        $.ajax({
          url: "http://localhost:3000/agregar-empleados",
          method: "post",
          data: datos,
          success: function (respuesta) {
            alert(respuesta);
          }
        })
      })
    })