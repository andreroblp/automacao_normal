const elem = require('./elements').ELEMENTS;
import excecao from '../excecao'

class Login {

  acessarValidarTelaLogin() {
    localStorage.clear();
    cy.visit(Cypress.env('site'));
    cy.get(elem.username).should('be.visible')
  }

  acessarLoginNovamenteAnalista(){
    cy.visit(Cypress.env('site'));
    cy.clearCookies();
    cy.get(elem.username).should('be.visible')
  }

  realizarLogin() {
    cy.get(elem.username).type(Cypress.env('user_name'));
    cy.get(elem.password).type(Cypress.env('user_password'));
    cy.get(elem.botaoAcessar).click();
  }

  realizarLogout(){
    cy.get(elem.botaoAcoesUser).should('be.visible').click();
    cy.get(elem.logout).should('be.visible').click();
    cy.get(elem.nomeLogin).should('be.visible');
  }

  realizarLoginCorretora(){
    cy.get(elem.username).type(Cypress.env('corretora_name'));
    cy.get(elem.password).type(Cypress.env('corretora_senha'));
    cy.get(elem.botaoAcessar).click();
  }

}

export default new Login();