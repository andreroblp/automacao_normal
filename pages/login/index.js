const elem = require('./elements').ELEMENTS;
import excecao from '../excecao'

class Login {

  acessarValidarTelaLogin() {
    localStorage.clear();
    cy.clearCookies();
    cy.visit(Cypress.env('site'));
    cy.get(elem.username + ',' + elem.usernameAntigo).should('be.visible')
  }

  acessarLoginNovamenteAnalista() {
    cy.visit(Cypress.env('site'));
    cy.clearCookies();
    cy.get(elem.username + ',' + elem.usernameAntigo).should('be.visible')
  }

  realizarLogin() {
    cy.get(elem.username + ',' + elem.usernameAntigo).type(Cypress.env('user_name'));
    cy.wait(1000)
    cy.get('body').then(($body) => {
      if ($body.find(elem.username).length > 0) {
        cy.get(elem.botaoContinuar).should('be.visible').click();
      }
    });
    cy.get(elem.password + ',' + elem.passwordAntigo).type(Cypress.env('user_password'));
    cy.wait(1000)
    cy.get('body').then(($body) => {
      if ($body.find(elem.username).length > 0) {
        console.log('Login Novo')
        cy.get(elem.botaoContinuar).should('be.visible').click({ multiple: true, force: true });
      } else {

        console.log("Antigo")
        cy.get(elem.botaoEntrar).click();
      }
    })
  }

  realizarLoginSegundaVez() {
    cy.visit(Cypress.env('site'));
    cy.get(elem.username + ',' + elem.usernameAntigo).type(Cypress.env('user_name'));
    cy.wait(1000)
    cy.get('body').then(($body) => {
      if ($body.find(elem.username).length > 0) {
        cy.get(elem.botaoContinuar).should('be.visible').click();
      }
    });
    cy.get(elem.password + ',' + elem.passwordAntigo).type(Cypress.env('user_password'));
    cy.wait(1000)
    cy.get('body').then(($body) => {
      if ($body.find(elem.username).length > 0) {
        console.log('Login Novo')
        cy.get(elem.botaoContinuar).should('be.visible').click({ multiple: true, force: true });
      } else {

        console.log("Antigo")
        cy.get(elem.botaoEntrar).click();
      }
    })
  }

  realizarLogout() {
    cy.get(elem.botaoAcoesUser).should('be.visible').click();
    cy.get(elem.logout).should('be.visible').click();
    cy.get(elem.logoCenter).should('be.visible');
  }

  realizarLoginCorretora() {
    cy.get(elem.username + ',' + elem.usernameAntigo).type(Cypress.env('corretora_name'));
    cy.wait(1000)
    cy.get('body').then(($body) => {
      if ($body.find(elem.username).length > 0) {
        cy.get(elem.botaoContinuar).should('be.visible').click();
      }
    });
    cy.get(elem.password + ',' + elem.passwordAntigo).type(Cypress.env('corretora_senha'));
    cy.wait(1000)
    cy.get('body').then(($body) => {
      if ($body.find(elem.username).length > 0) {
        console.log('Login Novo')
        cy.get(elem.botaoContinuar).should('be.visible').click({ multiple: true, force: true });
      } else {

        console.log("Antigo")
        cy.get(elem.botaoEntrar).click();
      }
    })
  }
}


export default new Login();