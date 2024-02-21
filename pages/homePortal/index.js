const elem = require('./elements').ELEMENTS;
import excecao from '../excecao';
import lStorage from '../localStorage'

class HomePortal {

    ArmazenarTicketLocalStorage() {
        cy.iframe(elem.iframe)
            .find(elem.ticket)
            .invoke('attr', 'value').then($ticket => {
                lStorage.armazenarLocalStorage($ticket, 'ticket')
            })
    }

    validarAcesso() {
        cy.get(elem.elemPainel).invoke('text').should('be.oneOf', [elem.tituloPainel, elem.tituloPainel2]);
    }

    validarMensagemFinalizacaoVenda() {
        cy.get(elem.mensagemSucesso).should('be.visible')
        cy.get(elem.mensagemSucesso).invoke('text')
            .should('eq', elem.mensagemSucessoTexto)
    }

    validarAcessoRealizado() {
        excecao.tratarExcecao();
        cy.iframe(elem.iframe).find(elem.botao3Pontos).should('be.visible')
        cy.wait(4000);
    }
}

export default new HomePortal();