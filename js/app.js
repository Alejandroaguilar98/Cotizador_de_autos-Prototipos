
// Constructores 
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
function UI() {}

// Realiza la cotizacion con los datos ingresados
Seguro.prototype.cotizarSeguro = function() {
    // Valor Base
    const base = 2000;
    let cantidad;

    // Cotiza por marca
    switch(this.marca) {
        case '1':
            cantidad = base * 1.15
            break;
        case '2':
            cantidad = base * 1.05
            break;
        case '3':
            cantidad = base * 1.35
            break;
        default:
            break;
    }

    // Cotizar por año
    // por cada año de antiguedad del auto, el costo del seguro se va a reducir en un 3%
    const diferencia = new Date().getFullYear() - this.year;
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    // Cotizar por tipo
    // si el seguro es basico se incrementa en un 30%, y si es completo el incremente sera del 50%
    if(this.tipo === 'basico') {
        cantidad *= 1.30
    } else {
        cantidad *= 1.50
    }


    return cantidad;
}

// Llenar las opciones de los años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
          min = max -20;
    
    const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

UI.prototype.mostrarResultado = (seguro, total) => {

    const { year, tipo } = seguro;
    let marca;

    switch(seguro.marca) {
        case '1':
            marca = 'Americano'
            break;
        case '2':
            marca = 'Asiatico'
            break;
        case '3':
            marca = 'Europeo'
            break;
        default:
            break;
    }


    // Crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML =  `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Marca: <span class="font-normal"> ${marca} </span> </p>
        <p class="font-bold">Año: <span class="font-normal"> ${year} </span> </p>
        <p class="font-bold">Tipo: <span class="font-normal"> ${tipo} </span> </p>
        <br>
        <p class="font-bold">Total: <span class="font-normal"> $${total} </span> </p>
    `;

    const resultadoDiv = document.querySelector('#resultado');
    
    // Mostrar el spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
    
    setTimeout( () => {
        spinner.style.display = 'none'; // Se borra el espiner
        resultadoDiv.appendChild(div); // Se muestra el resultado
    }, 2500 )
    
}


// Muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {

    const div = document.createElement('div');
    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    if(tipo === 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }

    // Insertar en HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'))

    setTimeout( () => {
        div.remove();
    } , 2500)
}


// Instancia UI
const ui = new UI();


// Cargar eventos
document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones()
})

eventListeners();
function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
    e.preventDefault();

    // Lee la marca seleccionada
    const marca = document.querySelector('#marca').value;

    // Lee el año seleccionado
    const year = document.querySelector('#year').value;

    // Lee el tipo seleccionado
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error')
        return;
    } 
    ui.mostrarMensaje('Cotizando...', 'correcto')

    // remover las cotisaciones previas
    const resultados = document.querySelector('#resultado div');
    if(resultados != null) {
        resultados.remove();
    }

    // Istanciar Seguro
    const seguro = new Seguro(marca, year, tipo);

    // Cantidad a pagar
    const total = seguro.cotizarSeguro();

    // Utilizar el prototipo que va a cotizar
    ui.mostrarResultado(seguro, total);
}