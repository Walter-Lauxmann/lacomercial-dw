import { obtenerArticulos } from "../modelos/articulos";

document.addEventListener("DOMContentLoaded", () => {
    mostrarArticulos();
});

async function mostrarArticulos() {
  const articulos = await obtenerArticulos();
  console.log(articulos);
  const listado = document.querySelector("#listado"); // getElementById("listado")
  for (let articulo of articulos) {
    listado.innerHTML += `
              <div class="col">
                <div class="card" style="width:18rem;">
                    <img src="imagenes/productos/${articulo.imagen}" alt="${articulo.nombre}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">
                            <span name="spancodigo">${articulo.codigo}</span> - <span name="spannombre">${articulo.nombre}</span>
                        </h5>
                        <p class="card-text">
                            ${articulo.descripcion}.
                        </p>
                        <h5>$ <span name="spanprecio">${articulo.precio}</span></h5>
                        <input type="number" name="inputcantidad" class="form-control" value="0" min="0" max="30" onchange="calcularPedido()">
                    </div>
                </div>
            </div>
`;
  }
}
