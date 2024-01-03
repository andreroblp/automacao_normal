const elem = require('./elements').ELEMENTS;
import homePortal from '../homePortal';

class DeclaracaoSaudeFinalizacao {

    validarAcesso() {
        cy.contains(elem.titulo);
    }

    finalizar() {
        cy.get(elem.botao).should('be.visible').click();
    }

    confirmarFinalizacaoCorretora(){
        homePortal.validarAcesso();
    }
}

export default new DeclaracaoSaudeFinalizacao();