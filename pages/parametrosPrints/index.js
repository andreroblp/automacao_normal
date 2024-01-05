const print = require('./elements').ADRESS_PRINT;

class ParametroPrint {

    printarTela(cenario) {
        cy.get('.footer').invoke('hide')
        cy.screenshot(print[`${cenario}`] + print.arquivo, { capture: 'fullPage' });
        cy.get('.footer').invoke('show')
    }

    documentos(cenario) {
        cy.get('.footer').invoke('hide')
        cy.screenshot(print[`${cenario}`] + print.docNormal + print.arquivo, { capture: 'fullPage' });
        cy.get('.footer').invoke('show')
    }

}

export default new ParametroPrint();