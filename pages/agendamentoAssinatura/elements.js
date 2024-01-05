const dataParaSomar = verificarDiaSomar();

const diaFormatado = diaAtual();

function verificarDiaSomar() {
  let hoje = new Date();
  let dia = hoje.getDate();
  if (dia >= 27) {
    return 30;
  } else {
    return hoje.getDate()+4;
  }
}

function diaAtual(){
let hoje = new Date();
let diaFormatado = ('0' + hoje.getDate()).slice(-2);
let mes = ('0' + hoje.getMonth()+1).slice(-2);
let ano = hoje.getFullYear();
  return ano + '-' + mes + '-' + diaFormatado;
}

export const ELEMENTS = {
    titulo : 'Agendamento de assinatura',
    diaCheckbox : `#dia-${dataParaSomar}`,
    contratoDropMenu : '#fluxoVenda',
    botaoSalvar : '#saveAndNext',
    tituloCorretora : 'Data de adesão e vencimento da mensalidade',
    elementoAssinatura : `[data-date="${diaFormatado}"]`,
    botaoSalvarCorretora : '#avancar',

}