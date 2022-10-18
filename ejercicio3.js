//VARIABLES NECESARIAS EN LA APLICACION
//________________________________________

const $ = (e) => document.querySelector(e) //PARA SIMPLIFICAR LA MANIPULACIÓN DEL DOM

let input = $('#inputN')
let inputValue = 20000 //HARDCODEADO POR DEFECTO

let array = []
let generarAleatorio = (max=1000, min=1) => { //FUNCION QUE GENERA UN NÚMERO ALEATORIO ENTRE EL 1 Y 10000 //HARCODEADO. SE ENCUENTRA EN ESTE LUGAR PARA EVITAR PROBLEMAS DE ASINCRONIMO
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
let numAleatorio = 0

const generarArray = (valor) => { //GUARDA EN EL ARRAY UNA CANTIDAD DE VALORES RANDOM DE ACUERDO AL LIMITE ESTABLECIDO EN EL INPUT
    array = [] //LIMPIA EL ARRAY
    for (let i = 1; i <= valor; i++) { //EJECUTA TANTAS VECES SEA EL VALOR DEL INPUT
        numAleatorio = generarAleatorio() //LLAMA A LA FUNCION ALEATORIA
        array.push(numAleatorio) //EN CADA ITERACION AGREGA EL NUMERO ALEATORIO ANTES GENERADO
    }
}
generarArray(inputValue) //EJECUTA LA FUNCION ANTERIOR.

input.addEventListener('change', () => { //ESCUCHA CADA CAMBIO REALIZADO EN EL INPUT Y MODIFICA EL VALOR DEL ARRAY
    array = [] //LIMPIA EL ARRAY
    inputValue = Number(input.value) //OBTIENE Y CONVIERTE EL VALOR STRING DEL INPUT EN UN NÚMERO ENTERO
    generarArray(inputValue) //MODIFICA EL ARRAY CON UNA CANTIDAD DE ELEMENTOS RANDOM DE ACUERDO AL VALOR DEL INPUT
})


//ELEMENTOS VARIOS DEL DOM
const botonMedia = $('#boton-calcularMediana')
const botonProme = $('#boton-calcularPromedio')
const botonMult2 = $('#boton-multiplos2')
const botonMult3 = $('#boton-multiplos3')
const boxPromMed = $('#promedio-mediana')
const vistaResul = $('#vista')
const templateNm = $('template')


//VARIABLES NECESARIAMENTE GLOBALES
let mediana = 0
let mlt2 = 0;
let mlt3 = 0;












//FUNCIONES NECESARIAS EN LA APLICACIÓN
//________________________________________


//FUNCIÓN QUE CALCULA EL PROMEDIO
const calcularPromedio = (list) => { //RECIBE EL ARRAY
    return list.reduce((a, b) => a + b) / list.length //SUMA CADA ELEMENTO Y DIVIDE EL RESULTADO ENTRE LA CANTIDAD DE ELEMENTOS EN EL ARRAY
}

//FUNCIÓN QUE CALCULA UN MÚLTIPLO.
const calcularMultiplo = (num, n) => num * n; //CALCULA LOS MULTIPLOS DE n NÚMERO(2 Y 3), MULTIPLICANDOLO POR 1 EN ADELANTE

const esMultiplo = ( elemento, mult ) => elemento % mult === 0 //CALCULA SI UN NUMERO (elemento) ES MULTIPLO DE OTRO (mult)

//FUNCIÓN QUE GENERA UN TEMPLATE
function templateNumbers(elemento) { //ESTO, PARA GENERAR TANTAS CAJAS HTML SEAN NECESARIAS, MAS SU VALOR. RECIBE ESTE VALOR
    const div = document.createElement('div') //CREA EL ELEMENTO HTML
    const text = document.createTextNode(elemento) //CONVIERTE EL ELEMENTO RECIBIDO EN TEXTO
    div.append(text) //INCLUYE EL TEXTO DENTRO DEL ELEMENTO HTML
    vistaResul.append(div) //INCLUYE EL NUEVO ELEMENTO HTML CON SU TEXTO DENTRO DEL DOM
}

//FUNCIÓN QUE RENDERIZA UNA LISTA DE MÚLTIPLOS EN PANTALLA
const mostrarMultiplos = (mlt) => {
    if (inputValue <= 20000) { //ESTABLECEMOS EL LÍMITE EN 20.000. SINO, RETORNA UNA ALERTA
        vistaResul.innerHTML = '' //LIMPIAMOS LA CAJA HTML PARA LA VISTA DE PROMEDIOS Y MEDIANA
        boxPromMed.style.display = 'none' //LIMPIAMOS LA CAJA HTML PARA LA VISTA DE MÚLTIPLOS
        for (let i = 1; i <= inputValue; i++) { //CICLO QUE SE EJECUTA TANTOS ELEMENTOS CONTIENE EL VALOR EN EL IMPUT
            const mltAct = calcularMultiplo(mlt, i) //LLAMADO A LA FUNCIÓN QUE CALCULA EL MULTIPLO, Y GUARDADO EN UN MULTIPLO ACTUAL
            if (mltAct <= inputValue) { //CONDICIONAL CON EL FIN DE DETENER LA EJECUCIÓN DEL CICLO EN CUANTO EL VALOR DEL MULTIPLO SOBREPASE EL VALOR DEL INPUT
                templateNumbers(mltAct) //TEMPLATE CREADO PARA GENERAR HTML Y MOSTRAR UNA LISTA CON CADA ELEMENTO
            } else {
                break
            }
        }       
    } else { //MENSAJES DE ERROR
        mensajeDeError()
    }
}

//FUNCIÓN PARA MOSTRAR ERROR AL ESTABLECER UN NÚMERO FUERA DEL RANGO 1 al 20.000
const mensajeDeError = () => {
    boxPromMed.style.display = 'none'
    vistaResul.innerText = '! Fuera de rango'
    console.warn('! FUERA DE RANGO. El número que se ingresó es mayor al límite establecido')
    console.error('! FUERA DE RANGO. numero mayor a 20.000')
}




















//MOSTRAR LA MEDIANA DE LA LISTA DE NUMEROS GENERADA SEGÚN EL VALOR DEL INPUT
//_____________________________________________
botonMedia.addEventListener('click', () => {
    if (inputValue <= 20000) {
        if (array.length % 2 === 0) { // SI EL NÚMERO A EVALUAR ES UN NÚMERO PAR
            generarArray(inputValue)
            array.sort((a, b) => a - b)
            boxPromMed.style.display = 'block'
            vistaResul.innerHTML = ''
            let division = array.length / 2 
            elementosCentrales = array.slice(division, division + 2)
            boxPromMed.innerHTML = `La mediana de la lista generada con ${inputValue} elementos es: ${calcularPromedio(elementosCentrales)}`
        } else{
            boxPromMed.style.display = 'block' 
            vistaResul.innerHTML = ''
            array.sort((a, b) => a - b)
            mediana = ((array.length + 1) / 2) + 1
            boxPromMed.innerHTML = `La mediana de la lista generada con ${inputValue} elementos es: ${mediana}`
        }
    } else {
        mensajeDeError()
    }
})


















//MOSTRAR EL PROMEDIO DE LA LISTA DE NUMEROS GENERADA SEGÚN EL VALOR DEL INPUT
//_____________________________________________

botonProme.addEventListener('click', () => {
    boxPromMed.style.display = 'block'
    vistaResul.innerHTML = ''
    if (inputValue <= 20000) {
        generarArray(inputValue)
        let promedio = calcularPromedio(array)
        boxPromMed.innerHTML = `El promedio de la lista generada con ${inputValue} elementos, es: ${promedio}`
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