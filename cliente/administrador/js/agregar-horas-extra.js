$(document).ready(function () {
    $("#form-agregar-horas-extra").submit(function (e) {
        e.preventDefault();
        let datos = $(this).serialize();
    
        $.ajax({
          url: "http://localhost:3000/agregar-horas-extra",
          method: "post",
          data: datos,
          success: function (respuesta) {
            alert(respuesta);
            //window.location.href = "http://localhost:3000/listado-empleados";
          }
        })
      })
    })