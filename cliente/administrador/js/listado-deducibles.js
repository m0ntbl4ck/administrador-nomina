$(document).ready(function () {
    $.ajax({
         url: "http://localhost:3000/obtenerListadoDeducibles",
         method: "get",
         success: function (respuesta) {
           console.log(respuesta);
           setTable(respuesta);
         },
       });
   
     function setTable(respuesta) {
       $("#tabla-listado-deducibles").empty();
   
       let cabecera =
         "<thead><th>Descripción</th><th>Índice por hora</th><th> </th></thead>";
   
       let tr_inicio = "<tr>";
       let tr_fin = "</tr>";
   
       let td_inicio = "<td>";
       let td_fin = "</td>";

       let boton_inicio = "<button>";
       let boton_fin = "</button>";

       let tabla;
       let contador = 0;
       for (let i = 0; i < respuesta.length; i++) {
         contador = i + 1;
         tabla +=
           tr_inicio +
           td_inicio +
           respuesta[i].descripcion +
           td_fin +
           td_inicio +
           respuesta[i].descuento +
           td_fin +
           td_inicio +
           boton_inicio + 'Editar'+ boton_fin +
           td_fin +
           td_inicio +
           boton_inicio + 'Eliminar'+ boton_fin +
           td_fin +
           tr_fin;
       }
  
       tabla = cabecera + "<tbody>" + tabla + "</tbody>";
   
       $("#tabla-listado-deducibles").append(tabla);
     } 
   
 })