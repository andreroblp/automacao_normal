import gerarNumero from "./geradorNumero.js";

export default function gerarEstadoCivil(){
    return  estadoCivil[gerarNumero(8)]
}

var estadoCivil = ['Solteiro(a)', 'Casado(a)', 'Separado(a)', 'Divorciado(a)', 'Viuvo(a)', 'Marital', 'Desquitado', 'Não informado', 'União estável'];