
let carrito = [];

// Cargar productos en la tienda
function cargarProductos() {
    let contenedor = document.getElementById('productos');
    productos.forEach(producto => {
        let div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <p>Stock: ${producto.stock}</p>
            <button id="agregCart" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        contenedor.appendChild(div);
    });
}

// Agregar un producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(prod => prod.id === id);
    const itemEnCarrito = carrito.find(item => item.id === id);

    if (producto.stock > 0) {
        if (itemEnCarrito) {
            itemEnCarrito.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        producto.stock--;
        actualizarCarrito();
    } else {
        alert('Producto fuera de stock');
    }
}

// Actualizar la vista del carrito
function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalSpan = document.getElementById('total');
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.nombre} - ${item.cantidad} x $${item.precio.toFixed(2)} = $${(item.precio * item.cantidad).toFixed(2)}
            <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        `;
        listaCarrito.appendChild(li);
    });

    totalSpan.textContent = total.toFixed(2);
}

// Eliminar un producto del carrito
function eliminarDelCarrito(id) {
    const item = carrito.find(item => item.id === id);
    if (item) {
        const productoOriginal = productos.find(prod => prod.id === id);
        productoOriginal.stock += item.cantidad;
        carrito = carrito.filter(item => item.id !== id);
        actualizarCarrito();
    }
}

// Mostrar/Ocultar el carrito
document.getElementById('toggle-carrito').addEventListener('click', () => {
    const carritoElement = document.getElementById('carrito');
    carritoElement.classList.toggle('oculto');
});

// Proceder a la compra
document.getElementById('comprar').addEventListener('click', () => {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
    } else {
        alert('Compra realizada con éxito');
        carrito = [];
        productos.forEach(prod => prod.stock = 15); // Restaurar el stock inicial
        actualizarCarrito();
        cargarProductos();
    }
});

// Inicializar la tienda
cargarProductos();
