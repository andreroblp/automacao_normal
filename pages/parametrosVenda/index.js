const elem = require('./elements').ELEMENTS;

class ParamsVenda {

  acessarTela() {
    cy.get(elem.menuAplicacoes).click()
    cy.get(elem.acessarModuloVendas).click()
    cy.get(elem.hamburguer).should('be.visible').click()
    cy.get(elem.configuracoesVenda).should('be.visible').click()
    cy.get(elem.parametrosVenda).should('be.visible').click()
    cy.contains('Parâmetros de vendas').should('be.visible');
  }

  checarReceita() {
    cy.iframe(elem.iframe)
      .find(elem.naoReceita).should('be.visible').click();
      cy.iframe(elem.iframe)
      .find(elem.naoReceitarChecar).should('be.checked')
  }

  checarDebito() {
    cy.iframe(elem.iframe)
      .find(elem.simDebito).should('be.visible').click();
      cy.iframe(elem.iframe)
      .find(elem.simDebitoChecar).should('be.checked')
  }

  salvarMudancas() {
    cy.iframe(elem.iframe)
      .find(elem.botaoSalvar).click();
    cy.wait(5000)
    cy.get(elem.iconePreventSenior).click();
    cy.wait(2000)
  }
}

export default new ParamsVenda();