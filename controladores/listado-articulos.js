import { obtenerArticulos } from "../modelos/articulos";

const url = "./api/datos.php?tabla=articulos";

// Alerta
const alerta = document.querySelector("#alerta");

// Login de la navegación
const navLogin = document.querySelector("#nav-login");

// Formulario
const formulario = document.querySelector("#formulario");
const formularioModal = new bootstrap.Modal(
  document.querySelector("#formularioModal")
);
const btnNuevo = document.querySelector("#btnNuevo");

// Inputs
const inputCodigo = document.querySelector("#codigo");
const inputNombre = document.querySelector("#nombre");
const inputDescripcion = document.querySelector("#descripcion");
const inputPrecio = document.querySelector("#precio");
const inputImagen = document.querySelector("#imagen");

// Imagen del formulario
const frmImagen = document.querySelector("#frmimagen");

// Variables
let accion = "";
let id;

// Variables de inicio de sesión
let usuario = "";
let logueado = false;

// Control de usuario
const controlUsuario = () => { // function controlUsuario() {}
  if (sessionStorage.getItem("usuario")) {
    usuario = sessionStorage.getItem("usuario");
    logueado = true;
  }

  if (logueado) {
    navLogin.setAttribute("href", "#");
    navLogin.innerHTML = "Cerrar sesión";
    btnNuevo.style.display = "inline";
    navLogin.addEventListener("click", () => {
      sessionStorage.setItem("usuario", "");
      logueado = false;
      window.location.reload();
    });
  } else {
    navLogin.setAttribute("href", "login.html");
    navLogin.innerHTML = "Iniciar sesión";
    btnNuevo.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  controlUsuario();
  mostrarArticulos();
});

/**
 * Obtiene los artículos y los muestra
 */
async function mostrarArticulos() {
  const articulos = await obtenerArticulos();
  console.log(articulos);
  const listado = document.querySelector("#listado"); // getElementById("listado")
  listado.innerHTML = "";
  for (let articulo of articulos) {
    if(logueado) {
      listado.innerHTML += `
              <div class="col">
                <div class="card" style="width:18rem;">
                    <img src="imagenes/productos/${articulo.imagen ?? "nodisponible.png"}" alt="${articulo.nombre}" class="card-img-top">
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
                      <div class"card-footer d-flex justify-content-center">
                          <a class="btnEditar btn btn-primary">Editar</a>
                          <a class="btnBorrar btn btn-danger">Eliminar</a>
                          <input type="hidden" class="idArticulo" value="${articulo.id}">
                          <input type="hidden" class="imagenArticulo" value="${articulo.imagen ?? "nodisponible.png"}">
                      </div>
                    </div>
            </div>`;
    } else {
      listado.innerHTML += `
              <div class="col">
                <div class="card" style="width:18rem;">
                    <img src="imagenes/productos/${articulo.imagen ?? "nodisponible.png"}" alt="${articulo.nombre}" class="card-img-top">
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
            </div>`;
    }
    
  }
}

/**
 * Ejecuta el evento submit del formulario
 */
formulario.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevenimos la acción por defecto
  const datos = new FormData(formulario); // Guardamos los datos del formulario
  switch (accion) {
    case "insertar":
      fetch(url + "&accion=insertar", {
        method: "POST",
        body: datos,
      })
        .then((res) => res.json())
        .then((data) => {
          insertarAlerta(data, "success");
          mostrarArticulos();
        });
      break;

    case "actualizar":
      fetch(`${url}&accion=actualizar&id=${id}`, {
        method: "POST",
        body: datos,
      })
        .then((res) => res.json())
        .then((data) => {
          insertarAlerta(data, "success");
          mostrarArticulos();
        });
      break;
  }
});

/**
 * Ejecuta el evento click del Botón Nuevo
 */
btnNuevo.addEventListener("click", () => {
  // Limpiamos los inputs
  inputCodigo.value = null;
  inputNombre.value = null;
  inputDescripcion.value = null;
  inputPrecio.value = null;
  inputImagen.value = null;
  frmImagen.src = "./imagenes/productos/nodisponible.png";

  // Mostramos el formulario
  formularioModal.show();

  accion = "insertar";
});

/**
 * Define el mensaje de alerta
 * @param mensaje el mensaje a mostrar
 * @param tipo el tipo de alerta
 */
const insertarAlerta = (mensaje, tipo) => {
  const envoltorio = document.createElement("div");
  envoltorio.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible" role="alert">
        <div>${mensaje}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
  alerta.append(envoltorio);
};

/**
 * Determina en qué elemento se realiza un evento
 * @param elemento el elemento al que se realiza el evento
 * @param evento el evento realizado
 * @param selector el selector seleccionado
 * @param manejador el método que ejecute el evento
 */
const on = (elemento, evento, selector, manejador) => {
  elemento.addEventListener(evento, (e) => {
    if (e.target.closest(selector)) {
      manejador(e);
    }
  });
};

/**
 * Ejecuta el clic de btnEditar
 */
on(document, "click", ".btnEditar", (e) => {
  const cardFooter = e.target.parentNode; // Elemento padre del botón
  // Obtener los datos del artículo seleccionado
  id = cardFooter.querySelector(".idArticulo").value;
  const codigo = cardFooter.parentNode.querySelector(
    "span[name=spancodigo]"
  ).innerHTML;
  const nombre = cardFooter.parentNode.querySelector(
    "span[name=spannombre]"
  ).innerHTML;
  const precio = cardFooter.parentNode.querySelector(
    "span[name=spanprecio]"
  ).innerHTML;
  const descripcion =
    cardFooter.parentNode.querySelector(".card-text").innerHTML;
  const imagen = cardFooter.parentNode.querySelector(".imagenArticulo").value;

  // Asignamos los valores a los input
  inputCodigo.value = codigo;
  inputNombre.value = nombre;
  inputPrecio.value = precio;
  inputDescripcion.value = descripcion;
  frmImagen.src = `./imagenes/productos/${imagen}`;

  // Mostramos el formulario
  formularioModal.show();

  accion = "actualizar";
});

/**
 * Evento click del botón borrar
 */
on(document, "click", ".btnBorrar", (e) => {
  const cardFooter = e.target.parentNode;
  id = cardFooter.querySelector(".idArticulo").value;
  const nombre = cardFooter.parentNode.querySelector(
    "span[name=spannombre]"
  ).innerHTML;
  let aceptar = confirm(`¿Realmente desea eliminar a ${nombre}?`);
  if (aceptar) {
    console.log(`${nombre} Eliminado`);
    fetch(`${url}&accion=eliminar&id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        insertarAlerta(data, "danger");
        mostrarArticulos();
      });
  }
});
