const elem = require('./elements').ELEMENTS;

class Login {

  acessarValidarTelaLogin() {
    localStorage.clear();
    cy.visit(Cypress.env('site'));
    cy.get(elem.username).should('be.visible')
    
  }

  realizarLogin() {
    cy.get(elem.username).type(Cypress.env('user_name'));
    cy.get(elem.password).type(Cypress.env('user_password'));
  }

  validarAcessoRealizado() {
    cy.on("uncaught:exception", (e, runnable) => {
      console.log("error", e);
      console.log("runnable", runnable);
      return false;
    });
    cy.get(elem.botaoAcessar)
      .click();
    cy.get(elem.validarAcesso).should('be.visible');
    cy.wait(4000);
  }

}

export default new Login();