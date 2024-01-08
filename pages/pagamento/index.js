const elem = require('./elements').ELEMENTS;
import lStorage from '../localStorage/'
import homePortal from '../homePortal/';

class Pagamento {

    validarAcesso() {
        cy.contains(elem.titulo).should('be.visible')
    }


    validarDadosBeneficiario(item) {
        cy.xpath(elem.xpathNomeBenef).invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage(item).nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.get(elem.datNasc).should('have.value', lStorage.obterObjetoLocalStorage(item).dataNascimento);
        cy.xpath(elem.xpathNomeSocial).invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage('preBenef').nomeSocial.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.xpath(elem.xpathAdesao).invoke('text')
            .should('eq', 'Boleto - (deve ser encaminhado junto com o contrato)');
        cy.xpath(elem.xpathMensal).invoke('text')
            .should('eq', 'Débito automático');
    }

    validarDadosBeneficiarioSemNomeSocial(item) {
        cy.xpath(elem.xpathNomeBenefSemNomeSocial).invoke('text')
        .should('eq', lStorage.obterObjetoLocalStorage(item).nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
    cy.get(elem.datNasc).should('have.value', lStorage.obterObjetoLocalStorage(item).dataNascimento);
        cy.xpath(elem.xpathAdesaoSemNomeSocial).invoke('text')
            .should('eq', 'Boleto - (deve ser encaminhado junto com o contrato)');
        cy.xpath(elem.xpathMensalSemNomeSocial).invoke('text')
            .should('eq', 'Débito automático');
    }

    validarDebAutomatico(item) {
        cy.xpath(elem.xpathNomeDebAutom).invoke('text')
        .should('eq', lStorage.obterObjetoLocalStorage(item).nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.xpath(elem.xpathBancoDebAutom).invoke('text')
            .should('eq', Cypress.env('banco'));
        cy.xpath(elem.xpathAgenciaDebAutom).invoke('text')
            .should('eq', Cypress.env('agencia'));
        cy.xpath(elem.xpathCCDebAutom).invoke('text')
            .should('eq', Cypress.env('cc'));
    }

    validarDemaisInfos() {
        cy.get(elem.formaPgto + ' option:selected').invoke('text')
            .should('eq', 'Boleto');
    }

    finalizarVenda() {
        cy.get(elem.botaoAvancar).click();
    }

    validarSucessoEncerramento() {
        homePortal.validarAcesso();
        homePortal.validarMensagemFinalizacaoVenda();
    }
}

export default new Pagamento();