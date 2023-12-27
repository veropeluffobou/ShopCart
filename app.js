let carrito = [];
// Agregar productos al carrito 
function agregarAlCarrito(nombre, precio) {
  const existente = carrito.find(item => item.nombre === nombre);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  actualizarCarrito();
}

// Quitar los productos agregador de a uno
function quitarDelCarrito(nombre) {
  const productoIndex = carrito.findIndex(item => item.nombre === nombre);

  if (productoIndex !== -1) {
    carrito[productoIndex].cantidad--;

    if (carrito[productoIndex].cantidad === 0) {
      carrito.splice(productoIndex, 1);
    }
  }

  actualizarCarrito();
}

// Actualizar carrito 
function actualizarCarrito() {
  const carritoContainer = document.getElementById('carrito-container');
  const totalElement = document.getElementById('total');
  let total = 0;

  // Actualizar la lista del carrito
  const listaCarrito = document.getElementById('lista-carrito');
  listaCarrito.innerHTML = '';

  carrito.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${item.nombre} x ${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}</span>
      <button onclick="quitarDelCarrito('${item.nombre}')">Quitar</button>
    `;
    listaCarrito.appendChild(listItem);
    total += item.precio * item.cantidad;
  });

  totalElement.textContent = total.toFixed(2);
}

// Realizar compra
function realizarCompra() {
  if (carrito.length === 0) {
    alert('El carrito está vacío. Agrega productos antes de realizar la compra.');
    return;
  }

  const confirmacion = confirm('¿Deseas confirmar la compra?');

  if (confirmacion) {
    alert('Compra realizada con éxito. Gracias por tu compra.');
    carrito = [];
    actualizarCarrito();
  }
}

// Cargar productos iniciales
document.addEventListener('DOMContentLoaded', () => {
  const productosContainer = document.getElementById('productos-container');

  const productosIniciales = [
    { nombre: 'Lavarropas Drean', precio: 500000.00, imagen: 'imagenes/producto1.jpeg' },
    { nombre: 'TV Smart 50', precio: 480000.00, imagen: 'imagenes/producto2.jpg' },
    // Agrega más productos según sea necesario
  ];

  productosIniciales.forEach(producto => {
    const productoElement = document.createElement('div');
    productoElement.className = 'producto';
    productoElement.dataset.nombre = producto.nombre;
    productoElement.dataset.precio = producto.precio.toFixed(2);

    productoElement.innerHTML = `
      <h3>${producto.nombre}</h3>
      <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
      <p>Precio: $${producto.precio.toFixed(2)}</p>
      <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al carrito</button>
    `;

    productosContainer.appendChild(productoElement);
  });
});
