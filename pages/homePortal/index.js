const elem = require('./elements').ELEMENTS;
import excecao from '../excecao';

class HomePortal {

    ArmazenarTicketLocalStorage() {
        cy.iframe(elem.iframe)
            .find(elem.ticket)
            .invoke('attr', 'value').then($ticket => {
                var jsonAux = JSON.stringify($ticket);
                localStorage.setItem('ticket', jsonAux);
            })
    }

    validarAcesso(){
        cy.get(elem.elemPainel).contains(elem.tituloPainel).should('be.visible');
    }

    validarMensagemFinalizacaoVenda(){
        cy.get(elem.mensagemSucesso).should('be.visible')
        cy.get(elem.mensagemSucesso).invoke('text')
            .should('eq', elem.mensagemSucessoTexto)
    }

    validarAcessoRealizado() {
        excecao.tratarExcecao();
        cy.get(elem.validarAcesso).should('be.visible');
        cy.wait(4000);
      }
}

export default new HomePortal();