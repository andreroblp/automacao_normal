const elem = require('./elements').ELEMENTS;

class RevisaoDesconto{

    validarAcesso(){
        cy.contains(elem.titulo).should('be.visible')
    }

    revisarDesconto(){
        cy.get(elem.porcentagemConcedida).should('have.value', '0,00');
        cy.get(elem.porcentagemDesconto).should('have.value', '0');
    }

    botaoSalvar(){
        cy.get(elem.botaoSalvar).should('be.visible').click();
    }
}

export default new RevisaoDesconto();