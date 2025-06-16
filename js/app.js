
const form_nombre = document.getElementById("form-nombre");
const saludo = document.getElementById("saludo");

form_nombre.addEventListener('submit', function(e) {
  e.preventDefault(); 
  const nombre = document.getElementById('nombre-input').value;
  if (!nombre) {
    alert('Por favor ingresá tu nombre, este campo no puede quedar vacío');
  } else{
  saludo.textContent = `Hola ${nombre}, te damos la bienvenida a Materia Joyas!`;
  form_nombre.style.display = 'none';
}});

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total_carrito = parseFloat(localStorage.getItem("total_carrito")) || 0;

const productos_disponibles = [
    {id: 1, nombre: "Anillo Juno", precio: 5500},
    {id: 2, nombre: "Anillo Venus", precio: 1200},
    {id: 3, nombre: "Pulsera Atenea", precio: 2000},
    {id: 4, nombre: "Pulsera Diana", precio: 5400},
    {id: 5, nombre: "Caravanas Afrodita", precio: 1900},
    {id: 6, nombre: "Caravanas Artemisa", precio: 3600},
    {id: 7, nombre: "Collar Selene", precio: 6000},
    {id: 8, nombre: "Collar Fortuna", precio: 1100},
];

const descuento = 0.9

function mostrar_alerta (mensaje){
    const alerta = document.getElementById("alerta");
    alerta.textContent = mensaje;
    alerta.style.display = "block";

    setTimeout(() => {
        alerta.style.display = "none";
    }, 2000);
}

function agregar_al_carrito(producto){
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({...producto, cantidad: 1});
    }

    total_carrito = carrito.reduce((acc, item) => acc + item.precio * item.cantidad * descuento, 0);
    guardar_carrito();
    mostrar_carrito();
    mostrar_alerta(`${producto.nombre} fue agregado al carrito`);
}

function guardar_carrito(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("total_carrito", total_carrito);
}

function mostrar_carrito(){
    const ul = document.getElementById("carrito");
    ul.innerHTML = "";

    if (carrito.length === 0) {
        const li = document.createElement("li");
        li.textContent = "El carrito está vacío";
        ul.appendChild(li);
    } else {
    carrito.forEach(producto => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} x ${producto.cantidad}`;
        ul.appendChild(li);
    });
    }
    document.getElementById("total").textContent = total_carrito.toFixed(2);
}

function mostrar_productos(){
    const contenedor = document.getElementById("productos");

    productos_disponibles.forEach(producto => {
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio} (con 10% OFF: $${(producto.precio * descuento).toFixed(2)})</p>
            <button>Agregar al carrito</button>
        `;

        div.querySelector("button").addEventListener("click", () => {
            agregar_al_carrito(producto);
        });

        contenedor.appendChild(div);
        
    });
}

mostrar_productos();
mostrar_carrito();

document.getElementById("vaciar").addEventListener("click", () => {
    carrito = [];
    total_carrito = 0;
    guardar_carrito();
    mostrar_carrito();
})



