function diaAtual(){
    let hoje = new Date();
    let diaFormatado = ('0' + hoje.getDate()).slice(-2);
    let mes = ('0' + hoje.getMonth()+1).slice(-2);
    let ano = hoje.getFullYear();
    let hour = hoje.getHours();
    let minute = hoje.getMinutes();

      return diaFormatado+mes+ano+'_'+hour+minute;
   
    }

export const ADRESS_PRINT = {
    
    VendaInternaNormalBoletoDebAutomReceita : '../../../VendaInterna_ReceitaFederal_DebAutom '+ diaAtual(),
    VendaInternaNormalBoletoDebAutomReceitaApenasGeneroSocial : '../../../VendaInterna_ReceitaFederal_ DebAutom_GêneroSocial ' + diaAtual(),
    VendaInternaNormalBoletoDebAutomReceitaNomeSocial : '../../../VendaInterna_ReceitaFederal_ DebAutom_NomeGêneroSocial ' + diaAtual(),
    CorretoraNormalBoletoDebAutom : '../../../Corretora_DebAutom ' + diaAtual(),
    CorretoraNormalBoletoDebAutomDeclaracaoVazia : '../../../Corretora_DebAutom_DeclSaudeVazia ' + diaAtual(),
    CorretoraNormalBoletoDebAutomDeclaracaoVaziaApenasGeneroSocial : '../../../Corretora_DebAutom_DeclSaudeVazia_GeneroSocial ' + diaAtual(),
    CorretoraNormalBoletoDebAutomDeclaracaoVaziaNomeGeneroSocial : '../../../Corretora_DebAutom_DeclSaudeVazia_NomeGeneroSocial ' + diaAtual(),
    VendaInternaNormalBoletoDebAutom : '../../../VendaInterna_DebAutom ' + diaAtual(),
    VendaInternaNormalBoletoDebAutomApenasGeneroSocial : '../../../VendaInterna_DebAutom_ApenasGênero ' + diaAtual(),
    VendaInternaNormalBoletoDebAutomNomeSocial : '../../../VendaInterna_DebAutom_NomeGeneroSocial ' + diaAtual(),
    arquivo : '/teste',
    docNormal : '/docNormal',
}