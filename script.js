const productosBasket = [
    {
        id:1,
        nombre: "Item 1",
        precio: 100,
        imagen: "imagen1.jpg"
    },
    {
        id:2,
        nombre: "Item 2",
        precio: 200,
        imagen: "imagen2.jpg"
    },
    {
        id:3,
        nombre: "Item 3",
        precio: 300,
        imagen: "imagen3.jpg"
    },
    {
        id:4,
        nombre: "Item 4",
        precio: 400,
        imagen: "imagen4.jpg"
    }    
];
let carrito = [];

const contenedorProductos = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const cantidadCarrito = document.getElementById("cantidad-carrito");

productosBasket.forEach(producto =>{
    const div = document.createElement("div");
    div.classList.add("col-md-4","mb-4");
    div.innerHTML = `
    <div class="card h-100">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
         <h4 class="card-title">${producto.nombre}</h4>
         <p class="card-text">${producto.precio.toLocaleString()}</p>
         <button class="btn btn-danger agregar-carrito" data-id="${producto.id}">Agregar al carrito </button>
        </div>
    </div>`;
    contenedorProductos.appendChild(div);
})

//! Agregar o eliminar
document.addEventListener("click", function(e){
    const id = parseInt(e.target.dataset.id);

    if (e.target.classList.contains('agregar-carrito')) {
      agregarAlCarrito(id);
    }

    if (e.target.classList.contains('sumar-item')) {
      cambiarCantidad(id, 1);
    }

    if (e.target.classList.contains('restar-item')) {
      cambiarCantidad(id, -1);
    }

    if (e.target.classList.contains('eliminar-item')) {
      eliminarProducto(id);
    }
});

//! Agregar productos al carrito
function agregarAlCarrito(id){
    const producto=productosBasket.find(p => p.id === id);
    const existe = carrito.find(p =>p.id === id);

    if(existe){
        existe.cantidad++;
    }else{
        carrito.push({...producto,cantidad:1});
    }
    guardarCarrito();
    actualizarCarrito();
}

//! Sumar o restar del carrito

function cambiarCantidad(id,cant){
    const producto = carrito.find(p =>p.id === id);
    if(!producto) return;
    producto.cantidad += cant;
    if(producto.cantidad<=0){
        eliminarProducto(id);
    }else{
        guardarCarrito();
        actualizarCarrito();
    }
}

//! Eliminar producto del carrito

function eliminarProducto(id){
    carrito = carrito.filter(p=>p.id !== id);
    guardarCarrito();
    actualizarCarrito();
}


//! Mostrar carrito
function actualizarCarrito(){
    listaCarrito.innerHTML= "";
    let totalItems = 0;

    carrito.forEach((item) => {
      const li = document.createElement('li');
      li.className = "list-group-item d-flex justify-content-between align-items-center flex-wrap";

      const total = item.precio * item.cantidad;
      totalItems += item.cantidad;

      li.innerHTML = `
        <div>
          <strong>${item.nombre}</strong><br>
          Precio: $${item.precio.toLocaleString()}<br>
          Cantidad: ${item.cantidad}<br>
          Total: $${total.toLocaleString()}
        </div>
        <div class="d-flex flex-column gap-1 mt-2 mt-md-0">
          <button class="btn btn-sm btn-success sumar-item" data-id="${item.id}">+</button>
          <button class="btn btn-sm btn-warning restar-item" data-id="${item.id}">−</button>
          <button class="btn btn-sm btn-outline-danger eliminar-item" data-id="${item.id}">🚮</button>
        </div>
      `;
      listaCarrito.appendChild(li);
    });
    cantidadCarrito.textContent = totalItems;
}

//! Guardar carrito en local storage

function guardarCarrito(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//! Cargar el carrito
function cargarCarrito(){
    const datos = localStorage.getItem("carrito");
    if(datos){
        carrito = JSON.parse(datos);
    }
}

cargarCarrito();
actualizarCarrito();

const btnToggle = document.getElementById('btn-toggle-carrito');
const carritoContainer = document.getElementById('carrito-container');

btnToggle.addEventListener('click', () => {
carritoContainer.classList.toggle('d-none'); // mostrar/ocultar

    // Opcional: cambiar el texto del botón
    if (carritoContainer.classList.contains('d-none')) {
      btnToggle.textContent = '🛒 Ver carrito';
    } else {
      btnToggle.textContent = '❌ Ocultar carrito';
    }
  });