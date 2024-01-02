const elem = require('./elements').ELEMENTS;

class ParamsVenda {

  acessarTelaViaMenu() {
    cy.get(elem.menuAplicacoes).click()
    cy.get(elem.acessarModuloVendas).click()
    cy.get(elem.hamburguer).should('be.visible').click()
    cy.get(elem.configuracoesVenda).should('be.visible').click()
    cy.get(elem.parametrosVenda).should('be.visible').click()
    cy.contains('Parâmetros de vendas').should('be.visible');
  }

  acessarTelaViaEnderecoComTicket() {
    var jsonBenef = window.localStorage.getItem('ticket');
    var ticketPortal = JSON.parse(jsonBenef);
    let site = Cypress.env('urlParametrosVenda')
    cy.visit(`${site}${ticketPortal}&menuAcesso=35`);
    
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
  }

  obterTicketArmazenar() {
    cy.iframe(elem.iframe)
      .find(elem.ticket)
      .invoke('attr', 'value').then($ticket => {
        var jsonAux = JSON.stringify($ticket);
        localStorage.setItem('ticket', jsonAux);
      })
  }
  checarReceitaSemIframe() {
    cy.get(elem.naoReceitaSemIframe,).check({ force: true }).should('be.checked');
  }

  checarReceitaSemIframeSim() {
    cy.get(elem.SimReceitaSemIframe,).check({ force: true }).should('be.checked');
  }

  checarDebitoSemIframe() {
    cy.get(elem.simDebitoSemIframe).check({ force: true }).should('be.checked');
  }

  salvarMudancasSemIframe() {
    cy.get(elem.botaoSalvar).click();
  }

  exibirMensagemSucesso() {
    cy.get(elem.mensagemSucesso).should('be.visible');
  }

  exibirMensagemSucessoComIframe(){
    cy.get(elem.iframe).find(elem.mensagemSucessoIframe).should('be.visible');
  }
}
export default new ParamsVenda();