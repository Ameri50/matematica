// Variables globales
let nivelSeleccionado = "";
let ejercicioActual = {};
let preguntaEducativaActual = {};

// Función para mostrar el contenido según el grado seleccionado
function mostrarNivel() {
    const nivelAprender = document.getElementById("nivelAprender").value;
    const contenidoNivel = document.getElementById("contenidoNivel");
    const tituloNivel = document.getElementById("tituloNivel");
    const descripcionNivel = document.getElementById("descripcionNivel");

    if (nivelAprender) {
        nivelSeleccionado = nivelAprender;
        contenidoNivel.style.display = "block";

        // Configurar contenido según el nivel
        if (nivelAprender.includes("primaria")) {
            tituloNivel.textContent = `Matemáticas - ${nivelAprender.replace("primaria", "")}° de Primaria`;
            descripcionNivel.textContent = "Practica operaciones básicas: suma, resta, multiplicación y división.";
        } else if (nivelAprender.includes("secundaria")) {
            tituloNivel.textContent = `Matemáticas - ${nivelAprender.replace("secundaria", "")}° de Secundaria`;
            descripcionNivel.textContent = "Practica ejercicios de álgebra, geometría y operaciones avanzadas.";
        }

        generarEjercicio();
        generarPreguntaEducativa();
    } else {
        contenidoNivel.style.display = "none";
    }
}

// Función para generar un ejercicio matemático dinámico
function generarEjercicio() {
    const pregunta = document.getElementById("pregunta");
    const feedback = document.getElementById("feedback");

    feedback.textContent = ""; // Limpiar feedback

    if (nivelSeleccionado.includes("primaria")) {
        let num1, num2;
        let operacion;
        if (nivelSeleccionado === "1primaria" || nivelSeleccionado === "2primaria") {
            // Números pequeños para 1° y 2° de primaria
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            operacion = ["+", "-"][Math.floor(Math.random() * 2)]; // Solo suma o resta
        } else {
            // Operaciones más avanzadas para 3° a 6° de primaria
            num1 = Math.floor(Math.random() * 50) + 1;
            num2 = Math.floor(Math.random() * 50) + 1;
            operacion = ["+", "-", "*", "/"][Math.floor(Math.random() * 4)];
        }

        ejercicioActual = {
            operacion,
            num1,
            num2,
            respuesta: calcularResultado(num1, num2, operacion),
        };

        pregunta.textContent = `${num1} ${operacion} ${num2} = ?`;
    } else if (nivelSeleccionado.includes("secundaria")) {
        const tipoEjercicio = ["álgebra", "geometría"][Math.floor(Math.random() * 2)];

        if (tipoEjercicio === "álgebra") {
            const x = Math.floor(Math.random() * 20) + 1;
            const coef = Math.floor(Math.random() * 5) + 1;
            const resultado = x * coef;

            ejercicioActual = {
                tipo: "álgebra",
                coef,
                resultado,
                respuesta: x,
            };

            pregunta.textContent = `Si ${coef}x = ${resultado}, ¿cuánto vale x?`;
        } else {
            const base = Math.floor(Math.random() * 20) + 1;
            const altura = Math.floor(Math.random() * 20) + 1;

            ejercicioActual = {
                tipo: "geometría",
                base,
                altura,
                respuesta: (base * altura) / 2,
            };

            pregunta.textContent = `Calcula el área de un triángulo con base ${base} y altura ${altura}.`;
        }
    }
}

// Función para calcular el resultado de una operación
function calcularResultado(num1, num2, operacion) {
    switch (operacion) {
        case "+": return num1 + num2;
        case "-": return num1 - num2;
        case "*": return num1 * num2;
        case "/": return num1 / num2;
        default: return null;
    }
}

// Función para verificar la respuesta del ejercicio
function verificarRespuesta() {
    const respuestaUsuario = parseFloat(document.getElementById("respuesta").value);
    const feedback = document.getElementById("feedback");

    if (respuestaUsuario === ejercicioActual.respuesta) {
        feedback.textContent = "¡Correcto! 🎉";
        feedback.style.color = "green";
    } else {
        feedback.textContent = `Incorrecto. La respuesta correcta es ${ejercicioActual.respuesta}.`;
        feedback.style.color = "red";
    }
}

// Función para mostrar tablas matemáticas
function mostrarTabla(tipo) {
    const tablaDiv = document.getElementById("tabla");
    tablaDiv.innerHTML = ""; // Limpiar contenido anterior

    let contenidoTabla = "<table>";
    if (["suma", "resta", "multiplicar", "dividir"].includes(tipo)) {
        for (let i = 1; i <= 10; i++) {
            contenidoTabla += "<tr>";
            for (let j = 1; j <= 10; j++) {
                let resultado;
                switch (tipo) {
                    case "suma": resultado = i + j; break;
                    case "resta": resultado = i - j; break;
                    case "multiplicar": resultado = i * j; break;
                    case "dividir": resultado = (j !== 0) ? (i / j).toFixed(2) : "∞"; break;
                }
                contenidoTabla += `<td>${i} ${tipo === "suma" ? "+" : tipo === "resta" ? "-" : tipo === "multiplicar" ? "x" : "÷"} ${j} = ${resultado}</td>`;
            }
            contenidoTabla += "</tr>";
        }
    } else if (tipo === "raiz") {
        for (let i = 1; i <= 100; i++) {
            contenidoTabla += `<tr><td>√${i} = ${Math.sqrt(i).toFixed(2)}</td></tr>`;
        }
    }
    contenidoTabla += "</table>";

    tablaDiv.innerHTML = contenidoTabla;
}

// Función para generar una pregunta educativa
function generarPreguntaEducativa() {
    const preguntaEducativa = document.getElementById("preguntaEducativa");
    const feedbackEducativo = document.getElementById("feedbackEducativo");

    feedbackEducativo.textContent = ""; // Limpiar feedback

    // Preguntas predefinidas
    const preguntas = [
        { pregunta: "¿Cuál es el valor de pi (π) aproximado?", respuesta: 3.14 },
        { pregunta: "¿Qué es un número primo?", respuesta: "Número divisible solo por 1 y por sí mismo" },
        { pregunta: "¿Cuál es la raíz cuadrada de 64?", respuesta: 8 },
        { pregunta: "¿Cuántos grados tiene un triángulo?", respuesta: 180 },
    ];

    const seleccionada = preguntas[Math.floor(Math.random() * preguntas.length)];

    preguntaEducativaActual = seleccionada;
    preguntaEducativa.textContent = seleccionada.pregunta;
}

// Función para verificar la respuesta de la pregunta educativa
function verificarPreguntaEducativa() {
    const respuestaUsuario = document.getElementById("respuestaEducativa").value.trim();
    const feedbackEducativo = document.getElementById("feedbackEducativo");

    if (respuestaUsuario.toLowerCase() === String(preguntaEducativaActual.respuesta).toLowerCase()) {
        feedbackEducativo.textContent = "¡Correcto! 🎉";
        feedbackEducativo.style.color = "green";
    } else {
        feedbackEducativo.textContent = `Incorrecto. La respuesta correcta es: ${preguntaEducativaActual.respuesta}.`;
        feedbackEducativo.style.color = "red";
    }
}
