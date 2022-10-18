const $ = (e) => document.querySelector(e) //PARA SIMPLIFICAR LA MANIPULACION DEL DOM

let input = $('#inputN')
let inputValue = 20000 //HARDCODEADO POR DEFECTO

let array = []

addEventListener('change', () => {
    array = []
    inputValue = Number(input.value)
    for (let i = 1; i <= inputValue; i++) {
        array.push(i)
    }
})

const botonMedia = $('#boton-calcularMediana')
const botonProme = $('#boton-calcularPromedio')
const botonMult2 = $('#boton-multiplos2')
const botonMult3 = $('#boton-multiplos3')
const boxPromMed = $('#promedio-mediana')
const vistaResul = $('#vista')
const templateNm = $('template')
let mediana = 0

let mlt2 = 0;
let mlt3 = 0;



//MOSTRAR LA MEDIANA DE LA LISTA DE NUMEROS GENERADA SEGUN EL VALOR DEL INPUT
//_____________________________________________
botonMedia.addEventListener('click', () => {
    if (inputValue <= 20000) {
        if (array.length % 2 === 0) { // SI EL NUMERO A EVALUAR ES UN NUMERO PAR
            boxPromMed.style.display = 'block'
            vistaResul.innerHTML = ''
            let division = array.length / 2 
            elementosCentrales = array.filter( (el) => el === division || el === division + 1)
            boxPromMed.innerHTML = `La mediana de ${inputValue} es: ${calcularPromedio(elementosCentrales)}`
        } else{
            boxPromMed.style.display = 'block' 
            vistaResul.innerHTML = ''
            mediana = array.filter( (el) => el === (array.length + 1) / 2 ) //FUNCION QUE CALCULA LA MEDIANA
            boxPromMed.innerHTML = `La mediana de ${inputValue} es: ${mediana}`
        }
    } else {
        mensajeDeError()
    }
})




//FUNCION QUE CALCULA EL PROMEDIO
const calcularPromedio = (list) => {
    return list.reduce((a, b) => a + b) / list.length
}



//MOSTRAR EL PROMEDIO DE LA LISTA DE NUMEROS GENERADA SEGUN EL VALOR DEL INPUT
//_____________________________________________

botonProme.addEventListener('click', () => {
    if (inputValue <= 20000) {
        const promedio = calcularPromedio(array)
        boxPromMed.innerHTML = `El promedio de ${inputValue} es: ${promedio}`
    } else {
        mensajeDeError()
    }
})








//MOSTRAR MULTIPLOS DE 2 DE LA LISTA DE NUMEROS
//_____________________________________________
botonMult2.addEventListener('click', () => {
    //2 HARDCODEADO. PUDIERA SER AUTOMATIZADO
    mostrarMultiplos(2) //ENVIAMOS EL MULTIPLO QUE QUEREMOS QUE SE OBTENGA DE LA LISTA
})




//MOSTRAR MULTIPLOS DE 3 DE LA LISTA DE NUMEROS
//_____________________________________________
botonMult3.addEventListener('click', () => {
    //3 HARDCODEADO. PUDIERA SER AUTOMATIZADO
    mostrarMultiplos(3) //ENVIAMOS EL MULTIPLO QUE QUEREMOS QUE SE OBTENGA DE LA LISTA
})





//FUNCIONES NECESARIAS_________________________
//_____________________________________________


//FUNCIÓN QUE CALCULA UN MÚLTIPLO.
const calcularMultiplo = (num, n) => num * n;
//FUNCION QUE GENERA UN TEMPLATE
function templateNumbers(elemento) {
    const div = document.createElement('div')
    const text = document.createTextNode(elemento)
    div.append(text)
    vistaResul.append(div)
}



//FUNCION QUE RENDERIZA UNA LISTA DE MULTIPLOS EN PANTALLA
const mostrarMultiplos = (mlt) => {
    if (inputValue <= 20000) { //ESTABLECEMOS EL LÍMITE EN 20.000. SINO, RETORNA UNA ALERTA
        vistaResul.innerHTML = '' //LIMPIAMOS LA CAJA HTML PARA LA VISTA
        boxPromMed.style.display = 'none' //LIMPIAMOS LA CAJA HTML PARA LA VISTA
        for (let i = 1; i <= inputValue; i++) { //CICLO QUE SE EJECUTA TANTOS ELEMENTOS CONTIENE EL VALOR EN EL IMPUT
            const mltAct = calcularMultiplo(mlt, i) //LLAMADO A LA FUNCION QUE CALCULA EL MULTIPLO, Y GUARDADO EN UN MULTIPLO ACTUAL
            if (mltAct <= inputValue) { //CONDICIONAL CON EL FIN DE DETENER LA EJECUCIÓN DEL CICLO EN CUANTO EL VALOR DEL MULTIPLO SOBREPASE EL VALOR DEL INPUT
                templateNumbers(mltAct) //TEMPLATE CREADO PARA GENERAR HTML Y MOSTRAR UNA LISTA CON CADA 
            } else {
                break
            }
        }       
    } else { //MENSAJES DE ERROR
        mensajeDeError()
    }
}




//FUNCION PARA MOSTRAR ERROR AL ESTABLECER UN NUMERO FUERA DEL RANGO 1 al 20.000
const mensajeDeError = () => {
    boxPromMed.style.display = 'none'
    vistaResul.innerText = '! Fuera de rango'
    console.warn('! FUERA DE RANGO. El número que se ingresó es mayor al límite establecido')
}