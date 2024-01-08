const elem = require('./elements').ELEMENTS;
import lStorage from '../localStorage';

class NovaVenda{

    acessarNovaVenda(){
      localStorage.removeItem('pre_benef');
      let ticket = lStorage.obterObjetoLocalStorage('ticket');
      let site = Cypress.env('urlNovaVenda');
      cy.visit(`${site}${ticket}&menuAcesso=29`);
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
        // cy.screenshot('../../../screenshots/nomeSocial',{capture: 'fullPage'})
          .click();
    }


}
export default new NovaVenda();