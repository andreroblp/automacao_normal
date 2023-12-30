const print = require('./elements').ADRESS_PRINT;

class ParametroPrint {

    internaNormalBoletoDebAutmNomeSocial() {
        cy.get('.footer').invoke('hide')
        cy.screenshot(print.internaNormalDebAutomNomeSocial, { capture: 'fullPage', scale: true });
        cy.get('.footer').invoke('show')
    }

    internaNormalDebAutomReceitaNomeSocial() {
        cy.get('.footer').invoke('hide')
        cy.screenshot(print.internaNormalDebAutomReceitaNomeSocial, { capture: 'fullPage', scale: true });
        cy.get('.footer').invoke('show')
    }

    internaNormalDebAutom() {
        cy.get('.footer').invoke('hide')
        cy.screenshot(print.internaNormalDebAutom, { capture: 'fullPage', scale: true });
        cy.get('.footer').invoke('show')
    }

    internaNormalDebAutomReceita() {
        cy.get('.footer').invoke('hide')
        cy.screenshot(print.internaNormalDebAutomReceita, { capture: 'fullPage', scale: true });
        cy.get('.footer').invoke('show')
    }

}

export default new ParametroPrint();