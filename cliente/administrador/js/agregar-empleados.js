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


      $.ajax({
        url: 'http://localhost:3000/obtenerListadoCargos',
        method: 'get',
        success: function (resp) {
          console.log(resp);
    
          resp.forEach((element) => {
            const nombreCargo = `${element.nombre_cargo}`;
            $('#select_cargos').append(
              `<option value="${nombreCargo}">${nombreCargo}</option>`,
            );
          });
        },
        error: function (resp) {
          alert(resp.responseText);
    },
      });


    })