const elem = require('./elements').ELEMENTS;
const print = require('../parametrosPrints/elements').ADRESS_PRINT;

class ImpressaoCarteirinha {

    validarAcesso() {
        cy.contains(elem.titulo).should('be.visible');
    }

    exibirMensagemErroKit() {
        cy.get(elem.botaoAvancar).click();
        cy.get(elem.mensagemErro).should('be.visible')
        cy.get(elem.mensagemErro).invoke('text')
            .should('eq', elem.mensagemErroKit)
    }

    exibirMensagemErroImpressao() {
        cy.get(elem.botaoAvancar).click();
        cy.get(elem.mensagemErro).should('be.visible')
        cy.get(elem.mensagemErro).invoke('text')
            .should('eq', elem.MensagemErroImpressao)
    }

    clicarGerarPDF() {
        cy.get(elem.radio).check(elem.valuePDF).should('be.checked');
        cy.wait(4000)
        cy.get('#carteirinhaPdf').screenshot(print.internaNormalDebAutomNomeSocial, { capture: 'fullPage' })
    }

    clicarGerarKit() {
        cy.get('#enviar-kit').click();
    }

    validarMensagemSucesso() {
        cy.get(elem.mensagemErro).should('be.visible');
        cy.get(elem.mensagemErro).invoke('text')
            .should('eq', elem.MensagemSucesso)
    }

    avancarTela() {
        cy.on('window:confirm', (str) => {
            expect(str).to.eq('Confirma a impressão da carteirinha?')
        })

        cy.get('#avancar').click();
    }
}

export default new ImpressaoCarteirinha();




