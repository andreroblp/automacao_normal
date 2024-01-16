import gerarNumero from "./geradorNumero";
var numeros = [];
var resto = 0;

export default function gerarCNS() {
    numeros[0] = escolherPrimeiroDigito();

    gerarNumeros();

    var ultimosDigitos = calcularUltimosDigitosDV();
    var numeroCNS = '';

    for (var x=0; x<11; x++){
        numeroCNS += numeros[x]
    }
    return numeroCNS + ultimosDigitos;
}

function escolherPrimeiroDigito() {
    var digitosAceitos = [1, 2, 7, 8, 9];
    return digitosAceitos[gerarNumero(0,4)];
}

function gerarNumeros() {
    for (var x = 1; x < 11; x++) {
        numeros[x] = gerarNumero(0,9)
    }
}

function calcularUltimosDigitosDV() {
    let soma = 0;
    for (var x = 0; x < 11; x++) {
        soma += numeros[x] * (15 - x);
    }
    resto = soma % 11
    var dv = 11 - resto;
    dv = (dv == 11) ? 0 : dv;
    
    if (dv == 10) {
        soma += 2;
        resto = soma % 11;
        dv = 11 - resto;
        return '001' + dv;
    } else {
        return '000' + dv;
    }
}