const print = require('./elements').ADRESS_PRINT;

class ParametroPrint{

internaNormalBoletoDebAutmNomeSocial(){
    cy.get('.footer').invoke('hide')
    cy.screenshot(print.internaNormalDebAutomNomeSocial, { capture: 'fullPage', scale:true  });
    cy.get('.footer').invoke('show')
}

}

export default new ParametroPrint();