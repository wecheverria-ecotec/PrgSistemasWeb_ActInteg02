// ==========================================
// 1. VARIABLES Y FUNCIONES DE CONTROL (DOCENTE)
// ==========================================
let numButtonClicks = 0;

function buttonClicked() {
    numButtonClicks = numButtonClicks + 1;
    
    const contenedorMensaje = document.getElementById("mainDiv");
    if (contenedorMensaje) {
        contenedorMensaje.textContent = "Button Clicked times: " + numButtonClicks;
    }
}

// ==========================================
// 2. FUNCIÓN INTERACTIVA PARA BOTONES DE PROYECTOS
// ==========================================
function mostrarInfoProyecto(event, nombreProyecto) {
    if (event) event.preventDefault();
    alert("📌 " + nombreProyecto + "\n\nEste proyecto es una muestra académica desarrollada para la asignatura. Te encuentras navegando actualmente en su versión en vivo.");
}

// ==========================================
// 3. MODO OSCURO (FUNCIONALIDAD ADICIONAL + LOCALSTORAGE)
// ==========================================

// Clave utilizada para guardar la preferencia de tema en localStorage
const CLAVE_TEMA = "temaPortafolio";

// Aplica el tema recibido ("oscuro" o "claro") al body y actualiza el texto del botón
function aplicarTema(tema) {
    const boton = document.getElementById("btnModoOscuro");

    if (tema === "oscuro") {
        document.body.classList.add("modo-oscuro");
        if (boton) {
            boton.textContent = "☀️ Modo Claro";
        }
    } else {
        document.body.classList.remove("modo-oscuro");
        if (boton) {
            boton.textContent = "🌙 Modo Oscuro";
        }
    }
}

// Alterna entre modo claro y modo oscuro, y guarda la preferencia elegida
function alternarModoOscuro() {
    const tieneModoOscuro = document.body.classList.contains("modo-oscuro");
    const nuevoTema = tieneModoOscuro ? "claro" : "oscuro";

    aplicarTema(nuevoTema);
    localStorage.setItem(CLAVE_TEMA, nuevoTema);
}

// ==========================================
// 4. GESTIÓN DEL EVENTO DOM Y FORMULARIO
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    
    // --- Navegación Suave (Solo enlaces internos con #) ---
    const enlacesInternos = document.querySelectorAll('a[href^="#"]');

    enlacesInternos.forEach(enlace => {
        enlace.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
        
        // --- Modo Oscuro: cargar preferencia guardada y activar el botón ---
        const temaGuardado = localStorage.getItem(CLAVE_TEMA);
        if (temaGuardado) {
            aplicarTema(temaGuardado);
        }

        const botonModoOscuro = document.getElementById("btnModoOscuro");
        if (botonModoOscuro) {
            botonModoOscuro.addEventListener("click", alternarModoOscuro);
        }
    });

    // --- Validación y Envío del Formulario de Contacto ---
    const formulario = document.getElementById("formContacto");

    if (formulario) {
        formulario.addEventListener("submit", function(event) {
            event.preventDefault();

            const nombre = document.getElementById("nombre")?.value.trim();
            const telefono = document.getElementById("telefono")?.value.trim();
            const correo = document.getElementById("correo")?.value.trim();
            const mensaje = document.getElementById("mensaje")?.value.trim();
            
            // Validación: nombre, correo y mensaje no deben estar vacíos
            if (!nombre || !telefono || !correo || !mensaje) {
                alert("⚠️ Por favor, llena todos los campos. No se permiten entradas vacías.");
                return;
            }

            const regexSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
            if (!regexSoloLetras.test(nombre)) {
                alert("⚠️ El campo Nombre debe contener únicamente letras.");
                return;
            }

            const regexSoloNumeros = /^[0-9]+$/;
            if (!regexSoloNumeros.test(telefono)) {
                alert("⚠️ El campo Teléfono debe contener únicamente números.");
                return;
            }

            buttonClicked();
            alert("✅ ¡Gracias por contactarte, " + nombre + "!\n\nTu mensaje ha sido enviado correctamente.");
            formulario.reset();
        });
    }
});