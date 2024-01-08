export default function gerarNumero(num) {
    return Math.floor(Math.random() * (num + 1))
}

function gerarNumeros() {
    for (let x = 0; x < 100; x++) {
        console.log(gerarNumero(9))
    }
}