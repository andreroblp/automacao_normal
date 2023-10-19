// <reference types="Cypress" />

describe('Venda Normal', function () {

  it('Realizar Login', function () {
    cy.visit(`https://portalweb-hom.preventsenior.com.br/portalweb/`);
    cy.get('#login').type('rafael.santos');
    cy.get('#passwd').type('prevent@123');
    cy.wait(5000)
    cy.get('#btn-validar')
      .click();
    cy.get('.icon-logo-prevent-senior', {
      timeout: 5000
    }).should('be.visible')
    cy.wait(5000)
    // cy.iframe('#ug-modal-frame').invoke('hide')
    // cy.get('[pointer-events="all"]').invoke('hide')
  })

  /*
    it('Conferindo e Desabilitando Conferência com a Receita Federal', function(){
      cy.get(".application-menu-area ").click()
      cy.get('[data-aplicacao-contexto="vendas"] > .fa').click()
      cy.get('.hamburguer-menu-area').click()
      cy.get('[data-menu-item-id="34"] > .menu__link').click()
      cy.get('[data-menu-item-id="35"] > .menu__link').click()
      cy.wait(2000)
      cy.iframe('[class="child-page atual"]')
      .as('iframe')
      .find('#item-is_consultar_pessoa_fisica_receita_federal-VENDAS > :nth-child(3) > .default').click()
      cy.get('@iframe')
      .find('#item-is_consultar_pessoa_fisica_receita_federal-VENDAS > :nth-child(3) > .prevent').should('be.checked')
      cy.get('.icon-logo-prevent-senior').click()
      cy.wait(2000)
    })
  
    it('Acessar Nova Venda', function() {
      cy.iframe('[class="child-page atual"]')
      .find('#uTicket')
      .invoke('attr', 'value').then($ticket => {
        let ticketDefinitivo = $ticket
        let ticketPortal = $ticket;
        cy.visit(`${site_url1}vendas/triagem?ticket=${ticketPortal}&menuAcesso=29`)
      })
      cy.get('#nomeCpf').should('be.visible')
      cy.contains('Nova Venda').should('be.visible')
    })
  
    it('Avançar para Formulário de Contato', function(){
      cy.request({
          method: 'GET',
          url: 'https://geradorbrasileiro.com/api/faker/pessoa?limit=1'
      }).then(({ status, body }) => {
          const { values} = body
          expect(status).to.eq(200); 
  
      cy.get('#nomeCpf').type(values[0].nome)
      cy.get('#buscar')
      .click()
      cy.wait(3000)
      cy.get('#novo-cadastro')
      .click()
      cy.wait(1000)
      })
    })
  
      it('Preenchendo o Formulário de Contato', function(){
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
  */
})