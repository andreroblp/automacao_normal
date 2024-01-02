const print = require('./elements').ADRESS_PRINT;

class ParametroPrint {

    internaNormalBoletoDebAutmNomeSocial(n) {
        cy.get('.footer').invoke('hide')
        cy.screenshot(print.internaNormalDebAutomNomeSocial+n+print.arquivo, { capture: 'fullPage'});
        cy.get('.footer').invoke('show')
    }

    internaNormalDebAutomReceitaNomeSocial() {
        cy.get('.footer').invoke('hide')
        cy.screenshot(print.internaNormalDebAutomReceitaNomeSocial+print.arquivo, { capture: 'fullPage'});
        cy.get('.footer').invoke('show')
    }

    internaNormalDebAutom(n) {
        cy.get('.footer').invoke('hide')
        cy.screenshot(print.internaNormalDebAutomNomeSocial+n+print.arquivo, { capture: 'fullPage'});
        cy.get('.footer').invoke('show')
    }

    internaNormalDebAutomReceita() {
        cy.get('.footer').invoke('hide')
        cy.screenshot(print.internaNormalDebAutomReceita+print.arquivo, { capture: 'fullPage'});
        cy.get('.footer').invoke('show')
    }

        docReceita(){
        cy.screenshot(print.docReceita+print.arquivo, { capture: 'fullPage'});
    }

        docNormal(n){
        cy.screenshot(print.docNormal+n+print.arquivo, {capture: 'fullPage'});
    }

}

export default new ParametroPrint();