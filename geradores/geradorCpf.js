import gerarNumero from "./geradorNumero";
var numeros = [];

export default function gerarCPF() {

    gerarNumeros();

    while (verificarTodosRepetidos() == true) {
        gerarNumeros();
    }

    numeros[9] = primeiroDV();
    numeros[10] = segundoDV();

   return gerarCPFSemMascara()
}

function gerarNumeros() {
    for (var x = 0; x < 9; x++) {
        numeros[x] = gerarNumero(0,9)
    }
}

function verificarTodosRepetidos() {
    for (var x = 0; x < 8; x++) {
        if (numeros[x] != numeros[x + 1]) {
            return false;
        }
    }
    return true;
}

function primeiroDV() {
    let soma = 0;
    for (var x = 0; x < 9; x++) {
        soma += numeros[x] * (10 - x);
    }
    const r = soma % 11
    if (r < 2) {
        return 0;
    } else {
        return 11 - r;
    }
}

function segundoDV() {
    let soma = 0;
    for (var x = 0; x < 10; x++) {
        soma += numeros[x] * (11 - x);
    }
    const r = soma % 11
    if (r < 2) {
        return 0;
    } else {
        return 11 - r;
    }
}

function gerarCPFSemMascara(){
    var cpfString = "";

    for (var x = 0; x < 11; x++) {
        cpfString += (numeros[x]).toString();
    }
    return cpfString;
}

function gerarCPFComMascara(){
    var cpf = gerarCPFSemMascara();
    
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
}

function gerarCPFComMascaraMinha(){
    var cpfComMascara = "";
    var cpfMascaraArray = [];
    cpfMascaraArray[3] = '.';
    cpfMascaraArray[7] = '.';
    cpfMascaraArray[11] = '-';

    for(var x=0; x<11; x++){
        if(x>8){
            cpfMascaraArray[x+3] = numeros[x]
        } else if(x>5){
            cpfMascaraArray[x+2] = numeros[x]
        } else if(x>2){
            cpfMascaraArray[x+1] = numeros[x]
    } else{
            cpfMascaraArray[x] = numeros[x]
    }   
}
    for (var x = 0; x < 14; x++) {
        cpfComMascara += (cpfMascaraArray[x]).toString();
    }
    return cpfComMascara;
}
