const restricciones = {
    tipo_documento: {
        requerido: true
    },
    numero_documento: {
        requerido: true,
        regex: /^[1-9][0-9]{5,9}$/,
        mensaje: "El documento debe tener entre 6 y 10 números y no puede iniciar en 0."
    },
    nombres: {
        requerido: true,
        min: 3,
        max: 64,
        regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
        mensaje: "El nombre solo debe contener letras y espacios."
    },
    apellidos: {
        requerido: true,
        min: 3,
        max: 64,
        regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
        mensaje: "El apellido solo debe contener letras y espacios."
    },
    direccion: {
        requerido: true,
        min: 5,
        max: 100,
        regex: /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s#.,\-]+$/,
        mensaje: "La dirección contiene caracteres no permitidos."
    },
    telefono_fijo: {
        requerido: true,
        regex: /^[0-9]{7,10}$/,
        mensaje: "El teléfono fijo debe tener entre 7 y 10 números."
    },
    telefono_celular: {
        requerido: true,
        regex: /^[0-9]{10}$/,
        mensaje: "El celular debe tener exactamente 10 números."
    },
    correo: {
        requerido: true,
        regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        mensaje: "Ingrese un correo válido."
    },
    contrasena: {
        requerido: true,
        regex: /^(?=.*[A-Z])(?=(?:.*[a-z]){2,})(?=(?:.*\d){5,})[A-Za-z\d!?\-+\/&$]{16,}$/,
        mensaje: "La contraseña debe tener mínimo 16 caracteres, 1 mayúscula, 2 minúsculas y 5 números."
    },
    confirmar_contrasena: {
        requerido: true
    },
    fecha_de_inscripcion: {
        requerido: true,
        minFecha: "2026-02-15",
        maxFecha: "2026-03-03"
    },
    hobbie: {
        requerido: true,
        min: 3,
        max: 30,
        regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
        mensaje: "El hobbie solo debe contener letras y espacios."
    },
    terminos: {
        requerido: true
    }
};

const form = document.getElementById("formRegistro");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valido = true;

    // Limpiar errores anteriores
    document.querySelectorAll(".error").forEach(el => el.textContent = "");
    document.querySelectorAll(".controls").forEach(el => {
        el.classList.remove("input-error", "input-ok");
    });

    // Validar cada campo
    for (const campo in restricciones) {
        const regla = restricciones[campo];
        const input = document.getElementById(campo);

        if (!input) continue;

        const valor = input.type === "checkbox" ? input.checked : input.value.trim();

        // Requerido
        if (regla.requerido) {
            if ((input.type === "checkbox" && !valor) || (input.type !== "checkbox" && valor === "")) {
                mostrarError(campo, "Este campo es obligatorio.");
                valido = false;
                continue;
            }
        }

        // Mínimo de caracteres
        if (regla.min && valor.length < regla.min) {
            mostrarError(campo, `Debe tener al menos ${regla.min} caracteres.`);
            valido = false;
            continue;
        }

        // Máximo de caracteres
        if (regla.max && valor.length > regla.max) {
            mostrarError(campo, `No debe superar los ${regla.max} caracteres.`);
            valido = false;
            continue;
        }

        // Expresión regular
        if (regla.regex && !regla.regex.test(valor)) {
            mostrarError(campo, regla.mensaje);
            valido = false;
            continue;
        }

        // Validar rango de fechas
        if (campo === "fecha_de_inscripcion") {
            if (valor < regla.minFecha || valor > regla.maxFecha) {
                mostrarError(campo, `La fecha debe estar entre ${regla.minFecha} y ${regla.maxFecha}.`);
                valido = false;
                continue;
            }
        }

        // Validar confirmación de contraseña
        if (campo === "confirmar_contrasena") {
            const pass = document.getElementById("contrasena").value.trim();
            if (valor !== pass) {
                mostrarError(campo, "Las contraseñas no coinciden.");
                valido = false;
                continue;
            }
        }

        marcarCorrecto(input);
    }

    if (valido) {
        alert("Formulario enviado correctamente ✅");
        form.submit(); // si quieres enviarlo realmente
    }
});

function mostrarError(campo, mensaje) {
    const error = document.getElementById(`error_${campo}`);
    const input = document.getElementById(campo);

    if (error) error.textContent = mensaje;
    if (input) input.classList.add("input-error");
}

function marcarCorrecto(input) {
    input.classList.add("input-ok");
}
document.getElementById("nombres").addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");
});

document.getElementById("apellidos").addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");
});

document.getElementById("hobbie").addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");
});

document.getElementById("numero_documento").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
});

document.getElementById("telefono_fijo").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
});

document.getElementById("telefono_celular").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
});
function capitalizarTexto(texto) {
    return texto
        .toLowerCase()
        .replace(/\b\w/g, letra => letra.toUpperCase());
}

document.getElementById("nombres").addEventListener("blur", function () {
    this.value = capitalizarTexto(this.value);
});

document.getElementById("apellidos").addEventListener("blur", function () {
    this.value = capitalizarTexto(this.value);
});

document.getElementById("hobbie").addEventListener("blur", function () {
    this.value = capitalizarTexto(this.value);
});
document.getElementById("correo").addEventListener("blur", function () {
    this.value = this.value.toLowerCase();
});