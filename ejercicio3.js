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
let numberList = []
let listaMult2 = []; //MULTIPLOS DE 2
let listaMult3 = []; // MULTIPLOS DE 3
let mlt2 = 0;
let mlt3 = 0;




botonMedia.addEventListener('click', () => {
    alert('funciona')
})



botonProme.addEventListener('click', () => {
    alert('funciona')
})



botonMult2.addEventListener('click', () => {
    if (inputValue <= 20000) {
        numberList = []
        vistaResul.innerHTML = ''
        for (let i = 1; i <= inputValue; i++) {
            numberList.push(i)
            templateNumbers(i)
        }
    } else {
        vistaResul.innerText = '! Fuera de rango'
    }
})

function templateNumbers(i) {
    let div = document.createElement('div')
    let text = document.createTextNode(i)
    div.append(text)
    vistaResul.append(div)
}


botonMult3.addEventListener('click', () => {
    alert('funciona')
})