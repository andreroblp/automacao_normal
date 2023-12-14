const elem = require('./elements').ELEMENTS;

class NovaVenda{

    acessarNovaVenda(){
        cy.iframe(elem.iframe)
        .find(elem.ticket)
        .invoke('attr', 'value').then($ticket => {
          let ticketPortal = $ticket;
          let site = Cypress.env('site2');
          cy.visit(`${site}vendas/triagem?ticket=${ticketPortal}&menuAcesso=29`)
        })
      cy.contains(elem.nomeCabecalho).should('be.visible');
    }

    escreverNome(){
        cy.get(elem.campoNome).type(elem.nomeEntrada).should('have.value', elem.nomeEntrada);
    }

    pesquisar(){
        cy.get(elem.botaoBuscar)
        .click();
    }

    verificarNome(){
      cy.get(elem.campoNome).should('have.value', elem.nomeEntrada);
    }
    novoCadastro(){
        cy.get(elem.botaoNovoCadastro).should('be.visible')
          .click();
    }


}
export default new NovaVenda();