const elem = require('./elements').ELEMENTS;
import excecao from '../excecao'

class Login {

  acessarValidarTelaLogin() {
    localStorage.clear();
    cy.clearCookies();
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
    cy.wait(1000)
    cy.get(elem.botaoContinuar).should('be.visible').click();
    cy.get(elem.password).type(Cypress.env('user_password'));
    cy.wait(1000)
    cy.get(elem.botaoContinuar).should('be.visible').click({ multiple: true, force:true });
  }

  realizarLoginSegundaVez() {
    cy.visit(Cypress.env('site'));
    cy.get(elem.username).type(Cypress.env('user_name'));
    cy.wait(1000)
    cy.get(elem.botaoContinuar).should('be.visible').click();
    cy.get(elem.password).type(Cypress.env('user_password'));
    cy.wait(1000)
    cy.get(elem.botaoContinuar).should('be.visible').click({ multiple: true, force:true });
  }

  realizarLogout(){
    cy.get(elem.botaoAcoesUser).should('be.visible').click();
    cy.get(elem.logout).should('be.visible').click();
    cy.get(elem.logoCenter).should('be.visible');
  }

  realizarLoginCorretora(){
    cy.get(elem.username).type(Cypress.env('corretora_name'));
    cy.wait(1000)
    cy.get(elem.botaoContinuar).should('be.visible').click();
    cy.get(elem.password).type(Cypress.env('corretora_senha'));
    cy.wait(1000)
    cy.get(elem.botaoContinuar).should('be.visible').click({ multiple: true, force:true });
  }

}

export default new Login();