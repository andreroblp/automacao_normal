const elem = require('./elements').ELEMENTS;

class DeclaracaoSaudeFinalizacao {

    validarAcesso() {
        cy.contains(elem.titulo);
    }

    finalizar() {
        cy.get(elem.botao).should('be.visible').click();
    }

    confirmarFinalizacaoCorretora(){
        cy.get(elem.elemPainel).contains(elem.tituloPainel).should('be.visible');
        cy.clearCookies();
    }
}

export default new DeclaracaoSaudeFinalizacao();