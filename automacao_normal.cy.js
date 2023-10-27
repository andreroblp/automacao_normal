// import * as cns from './geradorCNS.js';
// import * as cpf from './geradorCPF.js';

describe('Venda Normal', function () {

  it('Realizar Login', function () {
    cy.on("uncaught:exception", (e, runnable) => {
      console.log("error", e);
      console.log("runnable", runnable);
      return false;
    });
    cy.visit(Cypress.env('site'));
    cy.get('#login').type(Cypress.env('user_name'));
    cy.get('#passwd').type(Cypress.env('user_password'));
    cy.get('#btn-validar')
      .click();
    cy.get('[unselectable="on"]').should('be.visible')
    // cy.iframe('#ug-modal-frame').invoke('hide')
    // cy.get('[pointer-events="all"]').invoke('hide')
  })

  it('Conferindo e Desabilitando Conferência com a Receita Federal', function () {
    cy.get(".application-menu-area ").click()
    cy.get('[data-aplicacao-contexto="vendas"] > .fa').click()
    cy.get('.hamburguer-menu-area').should('be.visible').click()
    cy.get('[data-menu-item-id="34"] > .menu__link').should('be.visible').click()
    cy.get('[data-menu-item-id="35"] > .menu__link').should('be.visible').click()
    cy.wait(2000)
    cy.iframe('[class="child-page atual"]')
      .as('iframe')
      .find('#item-is_consultar_pessoa_fisica_receita_federal-VENDAS > :nth-child(3) > .default').click()
    cy.get('@iframe')
      .find('#item-is_consultar_pessoa_fisica_receita_federal-VENDAS > :nth-child(3) > .prevent').should('be.checked')
    cy.get('.icon-logo-prevent-senior').click()
    cy.wait(2000)
  })

  it('Acessar Nova Venda', function () {
    cy.iframe('[class="child-page atual"]')
      .find('#uTicket')
      .invoke('attr', 'value').then($ticket => {
        let ticketPortal = $ticket;
        let site = Cypress.env('site2');
        cy.visit(`${site}vendas/triagem?ticket=${ticketPortal}&menuAcesso=29`)
      })
    cy.contains('Nova Venda').should('be.visible');
  })

  it('Avançar para Formulário de Contato', function () {

    cy.get('#nomeCpf').type('André Teste');
    cy.get('#buscar')
      .click()
    cy.get('#novo-cadastro').should('be.visible')
      .click()
  })
  it('Preenchendo o Formulário de Contato', function () {
    cy.contains('Formulário de Contato').should('be.visible')
    cy.get('#celular')
      .type('11111111111')
    cy.get('#valor-idade')
      .type('33')
    cy.get('#comoConheceu').select('AMBEV')
    cy.get('#parentesco').select('Esposa')
    cy.get('#checkboxPropaganda input[type="checkbox"]').invoke('show').check('1')
    cy.get('#checkboxPropaganda input[type="checkbox"]')
      .invoke('hide')
    cy.get('#observacao')
      .type('Teste')

    cy.get('#venda')
      .click()
  })

  it('Preenchendo o Pré-Cadastro', function () {
    cy.request({
      method: 'GET',
      url: 'https://api.invertexto.com/v1/faker?token=' + Cypress.env('token') + '&fields=name%2Ccpf&locale=pt_BR'
    }).then(({ status, body }) => {
      expect(status).to.eq(200);
      cy.get('#prebeneficiario-cpf').type(body.cpf);
    })
    cy.get('#data-nascimento').type('16/09/1951');
    cy.get('#parceriaVenda').select("Nenhuma");
    cy.get('[type="radio"]').invoke('show').check('3195')
    cy.wait(2000)
    cy.get('[type="radio"]').invoke('hide')
    cy.get('[id="PREVENT SENIOR PREMIUM 1002 ENFERMARIA"]').click() 
    cy.wait(5000)
    cy.get('#avancar').click();
    cy.wait(10000)
  })

})