import gerarPessoaAleatorio, { gerarNomeFerminino, gerarNomeMasculino } from '../../geradores/geradorPessoas.js';

export const ELEMENTS = {
    pessoa : gerarPessoaAleatorio(),
    nome : '#nomeBeneficiario',
    cpf : '#prebeneficiario-cpf'
}
