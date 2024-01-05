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

    validarJustificativaDeclaracaoSaudeVazia() {
        let quantidadePerguntas = 0;
        if(lStorage.obterPessoaPreBenef().sexo === "Feminino"){
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
            var jsonAux = JSON.stringify($id);
            window.localStorage.setItem('id', jsonAux);
        })
    }
}

export default new DeclaracaoSaude();