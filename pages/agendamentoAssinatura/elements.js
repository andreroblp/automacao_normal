const dataParaSomar = verificarDiaSomar();

function verificarDiaSomar() {
  let hoje = new Date();
  let dia = hoje.getDate();
  if (dia >= 27) {
    return 30;
  } else {
    return hoje.getDate()+4;
  }
}

export const ELEMENTS = {
    titulo : 'Agendamento de assinatura',
    diaCheckbox : `#dia-${dataParaSomar}`,
    contratoDropMenu : '#fluxoVenda',
    botaoSalvar : '#saveAndNext'
}