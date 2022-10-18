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


//VARIABLES NECESARIAMENTE GLOBALES
let mltAct = 0
let mlt2 = 0;
let mlt3 = 0;












//FUNCIONES NECESARIAS EN LA APLICACIÓN
//________________________________________


//FUNCIÓN QUE CALCULA EL PROMEDIO
const calcularPromedio = (list) => { //RECIBE EL ARRAY
    return list.reduce((a, b) => a + b) / list.length //SUMA CADA ELEMENTO Y DIVIDE EL RESULTADO ENTRE LA CANTIDAD DE ELEMENTOS EN EL ARRAY
}

//FUNCIÓN QUE GENERA UN TEMPLATE
const generarTemplate = (elem, box) => { //ESTO, PARA GENERAR TANTAS CAJAS HTML SEAN NECESARIAS, MAS SU VALOR. RECIBE ESTE VALOR, Y EL ELEMENTO DOM DONDE SE INTRODUCIRÁ
    const div = document.createElement('div') //CREA EL ELEMENTO HTML
    const text = document.createTextNode(elem) //CONVIERTE EL ELEMENTO RECIBIDO EN TEXTO
    div.append(text) //INCLUYE EL TEXTO DENTRO DEL ELEMENTO HTML
    box.append(div) //INCLUYE EL NUEVO ELEMENTO HTML CON SU TEXTO DENTRO DEL DOM
}

//FUNCIÓN QUE RENDERIZA UNA LISTA DE MÚLTIPLOS EN PANTALLA
const mostrarMultiplos = (lista, mult) => {
    if (inputValue <= 20000) { //ESTABLECEMOS EL LÍMITE EN 20.000. SINO, RETORNA UNA ALERTA
        vistaResul.innerHTML = '' //LIMPIAMOS LA CAJA HTML PARA LA VISTA DE PROMEDIOS Y MEDIANA
        boxPromMed.style.display = 'block' //OCULTA LA CAJA HTML PARA LA VISTA DE MÚLTIPLOS

        const listaDeMultiplos = lista.filter(e => e % mult === 0)

        boxPromMed.innerHTML = `Estos son los multiplos de ${mult}, contenidos en la lista generada con ${inputValue} elementos:`
        mostrarElementosEnVistaResult(listaDeMultiplos)
        
    } else { //MENSAJES DE ERROR
        mensajeDeError()
    }
}

const mostrarElementosEnVistaResult = (lista) => {
    lista.forEach( e => generarTemplate(e, vistaResul) )
}
const mostrarElementosEnBoxPromMed = (lista) => {
    lista.forEach( e => generarTemplate(e, boxPromMed) )
}

//FUNCIÓN PARA MOSTRAR ERROR AL ESTABLECER UN NÚMERO FUERA DEL RANGO DEL 1 al 20.000
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
            generarArray(inputValue) // MODIFICA EL ARRAY
            array.sort((a, b) => a - b) //ORDENA EL ARRAY EN ORDEN ASCENDENTE
            boxPromMed.style.display = 'block'
            let division = array.length / 2 
            elementosCentrales = array.slice(division, division + 2)
            boxPromMed.innerHTML = `La mediana de la lista generada con ${inputValue} elementos aleatorios es: <strong>${calcularPromedio(elementosCentrales)}</strong>`
            vistaResul.innerHTML = ''
            mostrarElementosEnVistaResult(array)
        } else{ //CUANDO EL NÚMERO A EVALUAR ES UN NÚMERO IMPAR
            boxPromMed.style.display = 'block' 
            generarArray(inputValue) // MODIFICA EL ARRAY
            array.sort((a, b) => a - b) //ORDENA EL ARRAY EN ORDEN ASCENDENTE
            let posicionCentral = ((array.length + 1) / 2) // GUARDAMOS LA POSICIÓN CENTRAL DEL ARRAY
            let mediana = array[posicionCentral - 1] // LA MEDIANA SERÁ EL ELEMENTO A LA MITAD DEL ARRAY
            boxPromMed.innerHTML = `La mediana de la lista generada con ${inputValue} elementos aleatorios es: <strong>${mediana}</strong>`
            vistaResul.innerHTML = ''
            mostrarElementosEnVistaResult(array)
        }
    } else {
        mensajeDeError()
    }
})


















//MOSTRAR EL PROMEDIO DE LA LISTA DE NÚMEROS GENERADA SEGÚN EL VALOR DEL INPUT
//_____________________________________________

botonProme.addEventListener('click', () => {
    boxPromMed.style.display = 'block'
    vistaResul.innerHTML = ''
    if (inputValue <= 20000) {
        generarArray(inputValue)
        let promedio = calcularPromedio(array)
        boxPromMed.innerHTML = `El promedio de la lista generada con ${inputValue} elementos, es: <strong>${promedio}</strong>`
        mostrarElementosEnVistaResult(array)
    } else {
        mensajeDeError()
    }
})













//MOSTRAR MULTIPLOS DE 2 DE LA LISTA DE NUMEROS
//_____________________________________________
botonMult2.addEventListener('click', () => {
    //2 HARDCODEADO. PUDIERA SER AUTOMATIZADO
    generarArray(inputValue)
    mostrarMultiplos(array, 2) //ENVIAMOS LA LISTA DE ELEMENTOS Y EL MULTIPLO HARDCODEADO
})
















//MOSTRAR MULTIPLOS DE 3 DE LA LISTA DE NUMEROS
//_____________________________________________
botonMult3.addEventListener('click', () => {
    //3 HARDCODEADO. PUDIERA SER AUTOMATIZADO
    generarArray(inputValue)
    mostrarMultiplos(array, 3) //ENVIAMOS LA LISTA DE ELEMENTO Y EL MULTIPLO HARDCODEADO
})