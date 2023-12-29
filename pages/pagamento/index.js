const elem = require('./elements').ELEMENTS;
import preCadastro from '../preCadastro';

class Pagamento {

    validarAcesso() {
        cy.contains(elem.titulo).should('be.visible')
    }

    validarDadosNomeSocial() {
        cy.xpath(elem.xpathNomeSocial).invoke('text')
            .should('eq', preCadastro.obterObjetoLocalStorage().nomeSocial.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
    }

    validarDadosBeneficiario() {

        cy.xpath(elem.xpathNomeBenef).invoke('text')
            .should('eq', preCadastro.obterObjetoLocalStorage().nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.xpath(elem.xpathAdesao).invoke('text')
            .should('eq', 'Boleto - (deve ser encaminhado junto com o contrato)');
        cy.xpath(elem.xpathMensal).invoke('text')
            .should('eq', 'Débito automático');
        cy.xpath(elem.xpathNomeDebAutom).invoke('text')
            .should('eq', preCadastro.obterObjetoLocalStorage().nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.xpath(elem.xpathBancoDebAutom).invoke('text')
            .should('eq', Cypress.env('banco'));
        cy.xpath(elem.xpathAgenciaDebAutom).invoke('text')
            .should('eq', Cypress.env('agencia'));
        cy.xpath(elem.xpathCCDebAutom).invoke('text')
            .should('eq', Cypress.env('cc'));
        cy.get(elem.datNasc).should('have.value', Cypress.env('dtNasc'));
        cy.get(elem.formaPgto + ' option:selected').invoke('text')
            .should('eq', 'Boleto');
    }

    finalizarVenda(){
        cy.get(elem.botaoAvancar).click();
    }

    validarSucessoEncerramento(){

        cy.get(elem.elemPainel).contains(elem.tituloPainel).should('be.visible');
        cy.get(elem.mensagemSucesso).should('be.visible')
        cy.get(elem.mensagemSucesso).invoke('text')
            .should('eq', elem.mensagemSucessoTexto)
    }
}

export default new Pagamento();