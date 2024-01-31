import gerarNumero from "./geradorNumero";

const hoje = new Date;

export default function gerarDataNascimento(){
    let ano = gerarAno();
    let mes = ('0' + gerarMes()).slice(-2)
    let dia = ('0' + gerarDia(mes, ano)).slice(-2);
    return dia+'/'+mes+'/'+ano
}

function gerarAno(){
    const min = (hoje.getFullYear())-85;
    const max = (hoje.getFullYear())-65;
    return gerarNumero(min, max);
}

function gerarMes(){
    return gerarNumero(1,12)
}

function gerarDia(mes, ano){
    console.log(mes)
    console.log(ano)
    if(mes===2 && ano % 4 === 0){
        return gerarNumero(1,29)
    } else if(mes === 2 && ano % 4 !== 0){
        return gerarNumero(1,28)
    } else if(mes === 4 || mes === 6 || mes === 9 || mes === 11){
        return gerarNumero(1,30)
    } else{
        return gerarNumero(1,31)
    }
}