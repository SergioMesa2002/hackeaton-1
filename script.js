document.addEventListener('DOMContentLoaded', () => {
  const productos = document.querySelectorAll('.add-to-cart');
  const listaCarrito = document.getElementById('lista-carrito');
  const cantidadCarrito = document.getElementById('cantidad-carrito');
  const carritoContainer = document.getElementById('carrito-container');
  const btnToggleCarrito = document.getElementById('btn-toggle-carrito');

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  actualizarCarrito();

  productos.forEach(boton => {
    boton.addEventListener('click', () => {
      const nombre = boton.getAttribute('data-name');
      const precio = parseFloat(boton.getAttribute('data-price'));
      const imagen = boton.getAttribute('data-image');

      const existente = carrito.find(p => p.nombre === nombre);
      if (existente) {
        existente.cantidad++;
      } else {
        carrito.push({ nombre, precio, imagen, cantidad: 1 });
      }

      guardarCarrito();
      actualizarCarrito();
    });
  });

  btnToggleCarrito.addEventListener('click', () => {
    carritoContainer.classList.toggle('d-none');
  });

function actualizarCarrito() {
  listaCarrito.innerHTML = '';
  let totalItems = 0;
  let totalPrecio = 0;

  carrito.forEach((item, index) => {
    totalItems += item.cantidad;
    totalPrecio += item.precio * item.cantidad;

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    li.innerHTML = `
      <div>
        <strong>${item.nombre}</strong><br>
        <small>Cantidad: ${item.cantidad}</small>
      </div>
      <div>
        <button class="btn btn-sm btn-success me-2" onclick="cambiarCantidad(${index}, 1)">+</button>
        <button class="btn btn-sm btn-warning me-2" onclick="cambiarCantidad(${index}, -1)">-</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${index})">Eliminar</button>
      </div>
    `;
    listaCarrito.appendChild(li);
  });

  cantidadCarrito.textContent = totalItems;

  // 👇 Mostrar total de precios
  const totalPrecioElement = document.getElementById('total-precio');
  totalPrecioElement.textContent = totalPrecio.toFixed(2);
}

  window.cambiarCantidad = (index, cambio) => {
    carrito[index].cantidad += cambio;
    if (carrito[index].cantidad <= 0) carrito.splice(index, 1);
    guardarCarrito();
    actualizarCarrito();
  };

  window.eliminarProducto = (index) => {
    carrito.splice(index, 1);
    guardarCarrito();
    actualizarCarrito();
  };

  function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }
});
