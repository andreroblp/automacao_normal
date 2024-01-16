import gerarNumero from "./geradorNumero";

var numero = [];

export default function gerarCelular(){
    gerarDDD();
    gerarNumeroCelular();
    return criarMascaraCelular();
}

function gerarDDD(){
    numero[0] = gerarNumero(1,9);
    numero[1] = '1';
    numero[2] = '9';
}

function gerarNumeroCelular(){
    let numeroString = "";
    for(var x=3; x<11; x++){
      numero[x] =  gerarNumero(0, 9);
    }
    for(var y=0; y<11; y++){
        numeroString += numero[y]
    }

    return numeroString;
}

function criarMascaraCelular(){
   return gerarNumeroCelular().replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}
