const elem = require('./elements').ELEMENTS;
import lStorage from '../localStorage/';


class MinhasAtividades{

    validarAcesso(){
        const end1 = Cypress.env('urlMinhasAtividades1');
        const end2 = Cypress.env('urlMinhasAtividades2');
        const ticket = lStorage.obterTicket();
        cy.visit(`${end1}${ticket}${end2}`);
        cy.contains(elem.titulo).should('be.visible')
    }

    localizarVendaCorretora(){
        const id = lStorage.ObterIdPreBenef();
        cy.get(elem.seletorQuantidade).select('100')
        cy.get(elem.seletorQuantidade + ' option:selected').invoke('text')
        .should('eq', '100');
        cy.get(`tr[id="${id}"]`,).should('be.visible')
        cy.wait(2000)
        cy.get(`tr[id="${id}"]`).click()
    }

    abrirAtividade(){
        cy.get(elem.abrirAtividade).should('be.visible').click();
    }

}

export default new MinhasAtividades();