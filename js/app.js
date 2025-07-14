
const form_nombre = document.getElementById("form-nombre");
const saludo = document.getElementById("saludo");
const descuento = 0.9;

let productos_disponibles = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total_carrito = parseFloat(localStorage.getItem("total_carrito")) || 0;


form_nombre.addEventListener('submit', function(e) {
  e.preventDefault(); 
  const nombre = document.getElementById('nombre-input').value;
  if (!nombre) {
    Swal.fire({
        icon: "warning",
        title: "Campo vacío",
        text: "Por favor, ingresá tu nombre",
        confirmButtonColor: "#8a5c2c",
    });
  } else{
  saludo.textContent = `Hola ${nombre}, te damos la bienvenida a Materia Joyas!`;
  form_nombre.style.display = 'none';
}});



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
    Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `${producto.nombre} fue agregado al carrito`,
        showConfirmButton: false,
        timer: 1500,
        background: "#fff8f2",
        color: "#8a5c2c",
    });
}


function mostrar_productos(){
    const contenedor = document.getElementById("productos");

    productos_disponibles.forEach(producto => {
        const div = document.createElement("div");
        div.innerHTML = `
            <img src = "${producto.imagen}" alt = "${producto.nombre}" class = "imagen-producto">
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

const obtener_productos = async () => {
  try {
    const response = await fetch("js/productos.json");
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    const data = await response.json();
    productos_disponibles = data;
    mostrar_productos();
  } catch (error) {
    console.error("Error al cargar los productos:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudieron cargar los productos",
    });
  } finally{
        console.log("Finalizó la carga de productos");
  }
}


document.getElementById("vaciar").addEventListener("click", () => {
    Swal.fire({
        title: "¿Estás seguro/a?",
        text: "Esto eliminará todos los productos del carrito",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#8a5c2c",
        cancelButtonColor: "#aaa",
        confirmButtonText: "Sí, vaciar carrito",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed){
            carrito = [];
            total_carrito = 0;
            guardar_carrito();
            mostrar_carrito();

            Swal.fire({
                icon: "success",
                title: "Carrito vaciado",
                showConfirmButton: false,
                timer: 1200,
                toast: true,
                position: "top-end",
            });
        }
    });
});

obtener_productos();
mostrar_carrito();



