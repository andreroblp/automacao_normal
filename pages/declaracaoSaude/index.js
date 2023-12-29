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
}

export default new DeclaracaoSaude();