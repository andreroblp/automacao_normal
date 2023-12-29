var numero = [];
let numeroString = "";


export default function gerarCelular(){
    gerarDDD();
    gerarNumeroCelular();
    return criarMascaraCelular();
}

function gerarNumero(min){
    return Math.floor(Math.random() * 9 + min)
}

function gerarDDD(){
    numero[0] = gerarNumero(1);
    numero[1] = '1';
    numero[2] = '9';
}

function gerarNumeroCelular(){
    for(var x=3; x<11; x++){
      numero[x] =  gerarNumero(0);
    }
    for(var y=0; y<11; y++){
        numeroString += numero[y]
    }
}

function criarMascaraCelular(){
   return numeroString.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}
