const elem = require('./elements').ELEMENTS
import lStorage from '../localStorage/';

class DeclaracaoSaude{

    validarAcesso(){
        cy.contains(elem.titulo).should('be.visible');
    }

    marcarUmaPerguntaComoSim(){
        cy.get(elem.botaoSimPrimeiraPergunta).click({ force: true });
    }

    responderJustificativa(){
        cy.get(elem.caixaJustificativaPrimeiraPergunta).type("Teste Justificativa Automação")
        .should('have.value', "Teste Justificativa Automação");
    }

    avancarParaAgendamento(){
        cy.get(elem.botaoAvancar).click();
    }

    validarJustificativaDeclaracaoSaudeVazia(item) {
        let quantidadePerguntas = 0;
        if(lStorage.obterObjetoLocalStorage(item).sexo === "Feminino"){
            quantidadePerguntas = 15;
        } else{
            quantidadePerguntas = 14
        }
        for(let x=1; x <= quantidadePerguntas; x++){
        let pergunta = x
        cy.get(elem['justificativa' + pergunta.toString()]).should('have.value', "");
        console.log(quantidadePerguntas)
    }
}


    obterIdBeneficiarioCorretora(){
        cy.get(elem.idBenef).invoke('attr', 'value').then($id =>{
            lStorage.armazenarLocalStorage($id, 'idPreBenef')
        })
    }
}

export default new DeclaracaoSaude();