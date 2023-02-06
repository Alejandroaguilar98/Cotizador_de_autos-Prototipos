
// Constructores 
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
function UI() {}

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

// Instancia UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones()
})


// Cargar eventos
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
    const tipo = document.querySelector('input[name="tio"]:checked').value;

    const nuevoSeguro = new Seguro(marca, year, tipo);

    console.log(nuevoSeguro);
}