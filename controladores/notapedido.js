const codigos = document.getElementsByName("spancodigo");
const nombres = document.getElementsByName("spannombre");
const precios = document.getElementsByName("spanprecio");
const cantidades = document.getElementsByName("inputcantidad");
const detalle = document.getElementById("detalle");
const total = document.getElementById("total");

let cantidad;
let precio;
let totales = [];
let totalPedido;

function calcularPedido() {
  detalle.innerHTML = "";
  total.innerHTML = "";
  totalPedido = 0;

  for (let i = 0; i < codigos.length; i++) {
    // para (desde i = 0 hasta que i sea menor a la longitud de codigos incrementando i de 1 en 1)
    cantidad = cantidades[i].value;
    precio = parseFloat(precios[i].innerHTML);
    if (cantidad > 0) {
      // Si (cantidad es mayor que cero)
      totales[i] = cantidad * precio;
      totalPedido += totales[i]; // totalPedido = totalPedido + totales[i]
      detalle.innerHTML += `
          <tr>
            <td>${codigos[i].innerHTML}</td>
            <td>${nombres[i].innerHTML}</td>
            <td>${cantidades[i].value}</td>
            <td>$ ${precios[i].innerHTML}.-</td>
            <td>$ ${totales[i]}.-</td>
          </tr>
        `;
    }    
  }
  total.innerHTML = `$ ${totalPedido}.-`;
}

