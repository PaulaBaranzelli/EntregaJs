
let carrito = [];

// Cargo los prod. en la tienda online
function cargarProductos() {
    let contenedor = document.getElementById('productos');
    productos.forEach(producto => {
        let div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: €${producto.precio.toFixed(2)}</p>
            <p>Stock: ${producto.stock}</p>
            <button id="agregCart" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        // Evento para mover el producto al pasar el mouse por encima
        div.addEventListener('mouseover', () => {
            div.style.transform = 'translate(10px, -10px)'; 
            div.style.transition = 'transform 0.3s'; 
        });

        // Evento para restaurar la posición al quitar el mouse
        div.addEventListener('mouseout', () => {
            div.style.transform = 'translate(0, 0)'; 
        });

        contenedor.appendChild(div);
    });
  
}

// Agrego un producto al carrito
function agregarAlCarrito(id) {
    let producto = productos.find(prod => prod.id === id); 
    let itemEnCarrito = carrito.find(item => item.id === id); 

    if (producto.stock > 0) { 
        if (itemEnCarrito) { 
            itemEnCarrito.cantidad++; 
        } else {
            carrito.push({ ...producto, cantidad: 1 }); 
        }
        
        actualizarCarrito(); 
    } else {
        alert('Lo sentimos, no tenemos stock de este producto =('); 
    }
}

// Actualizo el carrito
function actualizarCarrito() {
    let listaCarrito = document.getElementById('lista-carrito');
    let totalSpan = document.getElementById('total');
    listaCarrito.innerHTML = ''; 
    let total = 0; 

    carrito.forEach(item => { 
        total += item.precio * item.cantidad; 
        let li = document.createElement('li'); 
        li.innerHTML = `
            ${item.nombre} - ${item.cantidad} x $${item.precio.toFixed(2)} = $${(item.precio * item.cantidad).toFixed(2)}
            <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
            <button class="btn-restar" data-id="${item.id}">-</button>
            ${item.cantidad}
            <button class="btn-sumar" data-id="${item.id}">+</button>
            
        `; 

        listaCarrito.appendChild(li); 

        let btnSumar = li.querySelector('.btn-sumar');
        let btnRestar = li.querySelector('.btn-restar');

        btnSumar.addEventListener('click', () => {
            item.cantidad++; 
            actualizarCarrito(); 
        });

        btnRestar.addEventListener('click', () => {
               if(item.cantidad > 0){
                item.cantidad--; 
            }
                actualizarCarrito(); 
            });
    });
    

    totalSpan.textContent = total.toFixed(2); 
}


// Eliminar un producto del carrito
function eliminarDelCarrito(id) {
    let item = carrito.find(item => item.id === id); 
    if (item) {
        let producto = productos.find(prod => prod.id === id);
        producto.stock += item.cantidad; 
        carrito = carrito.filter(item => item.id !== id); 
        actualizarCarrito(); 
    }
}

// Mostrar u ocultar el carrito
document.getElementById('toggle-carrito').addEventListener('click', () => { 
    let carritoElement = document.getElementById('carrito'); 
    carritoElement.classList.toggle('oculto'); 
});

// Compra
document.getElementById('comprar').addEventListener('click', () => { 
    if (carrito.length === 0) { 
        alert('No hay nada en el carrito');
    } else {
        alert('Muchas gracias por tu compra!'); 
            carrito.forEach(item => {
            let producto = productos.find(prod => prod.id === item.id);
            if (producto) {
                producto.stock -= item.stock; 
            }
    });

        carrito = []; 

        
        actualizarCarrito();
        cargarProductos();
    }
});


cargarProductos();
