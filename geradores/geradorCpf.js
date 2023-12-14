
var numeros = [];

export default function gerarCPF() {

    gerarNumeros();

    while (verificarTodosRepetidos() == true) {
        gerarNumeros();
    }

    numeros[9] = primeiroDV();
    numeros[10] = segundoDV();

    var cpfString = "";

    for (var x = 0; x < 11; x++) {
        cpfString += (numeros[x]).toString();
    }

    return cpfString;
}

function gerarNumeros() {
    for (var x = 0; x < 9; x++) {
        numeros[x] = Math.floor(Math.random() * 10);
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