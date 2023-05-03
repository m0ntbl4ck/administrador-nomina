$(document).ready(function () {
   $.ajax({
        url: "http://localhost:3000/obtenerListadoEmpleados",
        method: "get",
        success: function (respuesta) {
          console.log(respuesta);
          setTable(respuesta);
        },
      });
  
    function setTable(respuesta) {
      $("#tabla").empty();
  
      let cabecera =
        "<thead><th>Nombre</th><th>Apellido</th><th>Dni</th><th>Fecha de nacimiento</th><th>Teléfono</th><th>Email</th><th>dirección</th><th>Cargo</th><th>Contraseña</th></thead>";
  
      let tr_inicio = "<tr>";
      let tr_fin = "</tr>";
  
      let td_inicio = "<td>";
      let td_fin = "</td>";
  
      let tabla;
      let contador = 0;
      for (let i = 0; i < respuesta.length; i++) {
        contador = i + 1;
        tabla +=
          tr_inicio +
          td_inicio +
          respuesta[i].nombre +
          td_fin +
          td_inicio +
          respuesta[i].apellido +
          td_fin +
          td_inicio +
          respuesta[i].dni +
          td_fin +
          td_inicio +
          respuesta[i].fecha_nacimiento +
          td_fin +
          td_inicio +
          respuesta[i].telefono +
          td_fin +
          td_inicio +
          respuesta[i].email +
          td_fin +
          td_inicio +
          respuesta[i].direccion +
          td_fin +
          td_inicio +
          respuesta[i].cargo +
          td_fin +
          td_inicio +
          respuesta[i].contrasena +
          td_fin +
          tr_fin;
      }
 
      tabla = cabecera + "<tbody>" + tabla + "</tbody>";
  
      $("#tabla").append(tabla);
    } 
  
})
