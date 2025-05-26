
let nombre = prompt("Ingresá tu nombre")
console.log("Hola " + nombre + ", te damos la bienvenida a Materia Joyas!")

let total_carrito = 0
let carrito = [];
let seguir_en_materia_joyas = true
const descuento = 0.9
const total_con_descuento = (total_carrito) => total_carrito * descuento;

function mostrar_carrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
    } else {
        alert("Productos en tu carrito: " + carrito.join(" - "));
    }
}

function saludo_final(nombre) {
    alert("Gracias por tu visita, " + nombre + ". Esperamos que vuelvas nuevamente!");
}

while (seguir_en_materia_joyas){
    let eleccion = parseInt(prompt("¿Qué deseas hacer?: 1) Consultar nuestros productos, 2) Consultar nuestras promociones, 3) Ver el carrito, 4) Salir de Materia Joyas"));
    if (eleccion == 1){
        let seguir = true;
        while (seguir) {
            let productos = parseInt(prompt ("¿Qué productos deseas consultar?: 1) Ver anillos, 2) Ver pulseras, 3) Ver caravanas, 4) Ver collares, 5)Salir de productos"));
            if (productos == 1){
                let continuar = true;
                while (continuar) {
                    let anillos = parseInt(prompt ("¿Qué anillo deseas agregar al carrito?: 1) Anillo Juno, 2) Anillo Venus, 3) Salir de anillos"));
                    if (anillos == 1){
                        total_carrito += total_con_descuento(5500);
                        carrito.push("Anillo Juno");
                    } else if (anillos == 2){
                        total_carrito += total_con_descuento(1200);
                        carrito.push("Anillo Venus");
                    } else if (anillos == 3){
                        continuar = false;
                    } else {
                        console.log("No has ingresado un valor válido, por favor intenta de nuevo");
                    }
                }
            } else if (productos ==2){
                let continuar = true;
                while (continuar) {
                    let pulseras = parseInt(prompt ("¿Qué pulsera deseas agregar al carrito?: 1) Pulsera Atenea, 2) Pulsera Diana, 3) Salir de pulseras"));
                    if (pulseras == 1){
                        total_carrito += total_con_descuento(2000);
                        carrito.push("Pulsera Atenea");
                    } else if (pulseras == 2){
                        total_carrito += total_con_descuento(5400);
                        carrito.push("Pulsera Diana");
                    } else if (pulseras ==3){
                        continuar = false;
                    } else {
                        console.log("No has ingresado un valor válido, por favor intenta de nuevo");
                    }
                }
            } else if (productos ==3){
                let continuar = true;
                while (continuar) {
                    let caravanas = parseInt(prompt ("Qué caravanas deseas agregar al carrito?: 1) Caravanas Afrodita, 2) Caravanas Artemisa, 3) Salir de caravanas"));
                    if (caravanas ==1){
                        total_carrito += total_con_descuento(1900);
                        carrito.push("Caravanas Afrodita");
                    } else if (caravanas ==2){
                        total_carrito += total_con_descuento(3600);
                        carrito.push("Caravanas Artemisa");
                    } else if (caravanas ==3){
                        continuar = false;
                    } else {
                        console.log("No has ingresado un valor válido, por favor intenta de nuevo");
                    }
                }
            } else if (productos ==4) {
                let continuar = true;
                while (continuar) {
                    let collares = parseInt(prompt ("¿Qué collares deseas agregar al carrito?: 1) Collar Selene, 2) Collar Fortuna, 3) Salir de collares"));
                    if (collares ==1){
                        total_carrito += total_con_descuento(6000);
                        carrito.push("Collar Selene");
                    } else if (collares ==2){
                        total_carrito += total_con_descuento(1100);
                        carrito.push("Collar Fortuna");
                    } else if (collares ==3){
                        continuar = false;
                    } else {
                        console.log("No has ingresado un valor válido, por favor intenta de nuevo");
                    }
                }
            } else if (productos ==5) {
                seguir = false;
            } else {
                console.log("No has ingresado un valor válido, por favor intenta de nuevo");
            }
        }

        } else if (eleccion ==2) {
            alert("Oportunidad imperdible: en cualquier compra de alguno de nuestros productos, tienes un 10% de descuento!");
        } else if (eleccion ==3) {
            mostrar_carrito();
            alert("El total del carrito es: $" + total_carrito);
        } else if (eleccion ==4) {
            seguir_en_materia_joyas = false;
            saludo_final(nombre);
        } else {
            console.log("No has ingresado un valor válido, por favor intenta de nuevo");
        }
}
    



