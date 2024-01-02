const elem = require('./elements').ELEMENTS

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

    obterIdBeneficiarioCorretora(){
        cy.get(elem.idBenef).invoke('attr', 'value').then($id =>{
            var jsonAux = JSON.stringify($id);
            window.localStorage.setItem('id', jsonAux);
        })
    }
}

export default new DeclaracaoSaude();