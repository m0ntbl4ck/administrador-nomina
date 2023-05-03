$(document).ready(function () {
    $.ajax({
         url: "http://localhost:3000/obtenerListadoHorasExtra",
         method: "get",
         success: function (resp) {
           console.log(resp);
           setTable(resp);
         },
       });
   
     function setTable(resp) {
       $("#tablaHorasExtra").empty();
   
       let cabecera =
         "<thead><th>Id</th><th>Fecha</th><th>No. de horas</th><th>Monto</th><th> </th></thead>";
       
       //  let ultimo= cabecera.lastElementChild
       // ultimo.colSpan = 2

       let tr_inicio = "<tr>";
       let tr_fin = "</tr>";
   
       let td_inicio = "<td>";
       let td_fin = "</td>";
       
       let boton_inicio = "<button>";
       let boton_fin = "</button>";
   
       let tabla;
       let contador = 0;
       for (let i = 0; i < resp.length; i++) {
         contador = i + 1;
         tabla +=
           tr_inicio +
           td_inicio +
           resp[i].id_empleado+
           td_fin +
           td_inicio +
           resp[i].fecha +
           td_fin +
           td_inicio +
           resp[i].numero_horas +
           td_fin +
           td_inicio +
           resp[i].monto +
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
   
       $("#tablaHorasExtra").append(tabla);
     } 
   
 })
 