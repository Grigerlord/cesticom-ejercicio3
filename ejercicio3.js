const $ = (e) => document.querySelector(e)

let inputValue = 20000
addEventListener('change', () => {
    inputValue = Number($('#inputN').value)
})

const botonMedia = $('#boton-calcularMediana')
const botonProme = $('#boton-calcularPromedio')
const botonMult2 = $('#boton-multiplos2')
const botonMult3 = $('#boton-multiplos3')
const vistaResul = $('#vista')
const templateNm = $('template')
let mlt2 = 0;
let mlt3 = 0;




botonMedia.addEventListener('click', () => {
    alert('funciona')
})



botonProme.addEventListener('click', () => {
    alert('funciona')
})












botonMult2.addEventListener('click', () => {
    if (inputValue <= 20000) { //ESTABLECEMOS EL LÍMITE EN 20.000. SINO, RETORNA UNA ALERTA
        vistaResul.innerHTML = '' //LIMPIAMOS LA CAJA PARA LA VISTA
        for (let i = 1; i <= inputValue; i++) { //CICLO QUE SE EJECUTA TANTOS ELEMENTOS CONTIENE EL VALOR EN EL IMPUT
            mlt2 = calcularMultiplo(2, i) //LLAMADO A LA FUNCION QUE CALCULA EL MULTIPLO
            if (mlt2 <= inputValue) { //CONDICIONAL CON EL FIN DE DETENER LA EJECUCIÓN DEL CICLO EN CUANTO EL VALOR DEL MULTIPLO SOBREPASE EL VALOR DEL INPUT
                templateNumbers(mlt2) //TEMPLATE CREADO PARA GENERAR HTML Y MOSTRAR UNA LISTA CON CADA 
            } else {
                break
            }
        }

    } else { //MENSAJES DE ERROR
        vistaResul.innerText = '! Fuera de rango'
        console.warn('! FUERA DE RANGO. El número que se ingresó es mayor al límite establecido');
    }
})

//FUNCIÓN QUE CALCULA UN MÚLTIPLO.
const calcularMultiplo = (num, n) => num * n;
//FUNCION QUE GENERA UN TEMPLATE
function templateNumbers(elemento) {
    const div = document.createElement('div')
    const text = document.createTextNode(elemento)
    div.append(text)
    vistaResul.append(div)
}










botonMult3.addEventListener('click', () => {
    alert('funciona')
})