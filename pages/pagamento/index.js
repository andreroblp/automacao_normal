const elem = require('./elements').ELEMENTS;
import preCadastro from '../preCadastro';
import homePortal from '../homePortal/';

class Pagamento {

    validarAcesso() {
        cy.contains(elem.titulo).should('be.visible')
    }

    validarDadosNotRF() {
        cy.xpath(elem.xpathNomeBenef).invoke('text')
            .should('eq', preCadastro.obterObjetoLocalStorage().nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.get(elem.datNasc).should('have.value', Cypress.env('dtNasc'));
    }

    validarDadosNotRFSemNomeSocial() {
        cy.xpath(elem.xpathNomeBenefSemNomeSocial).invoke('text')
            .should('eq', preCadastro.obterObjetoLocalStorage().nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.get(elem.datNasc).should('have.value', Cypress.env('dtNasc'));
    }

    validarDadosReceita() {
        cy.xpath(elem.xpathNomeBenef).invoke('text')
            .should('eq', preCadastro.obterReceitaLocalStorage().nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.get(elem.datNasc).should('have.value', preCadastro.obterReceitaLocalStorage().dataNascimento);
    }

    validarDadosReceitaSemNomeSocial() {
        cy.xpath(elem.xpathNomeBenefSemNomeSocial).invoke('text')
            .should('eq', preCadastro.obterReceitaLocalStorage().nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.get(elem.datNasc).should('have.value', preCadastro.obterReceitaLocalStorage().dataNascimento);
    }

    validarDadosBeneficiario() {
        cy.xpath(elem.xpathNomeSocial).invoke('text')
            .should('eq', preCadastro.obterObjetoLocalStorage().nomeSocial.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.xpath(elem.xpathAdesao).invoke('text')
            .should('eq', 'Boleto - (deve ser encaminhado junto com o contrato)');
        cy.xpath(elem.xpathMensal).invoke('text')
            .should('eq', 'Débito automático');
    }

    validarDadosBeneficiarioSemNomeSocial() {
        cy.xpath(elem.xpathAdesaoSemNomeSocial).invoke('text')
            .should('eq', 'Boleto - (deve ser encaminhado junto com o contrato)');
        cy.xpath(elem.xpathMensalSemNomeSocial).invoke('text')
            .should('eq', 'Débito automático');
    }

    validarNomeReceitaDebAutom() {
        cy.xpath(elem.xpathNomeDebAutom).invoke('text')
            .should('eq', preCadastro.obterReceitaLocalStorage().nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
    }

    validarNomeDebAutomNotRF() {
        cy.xpath(elem.xpathNomeDebAutom).invoke('text')
            .should('eq', preCadastro.obterObjetoLocalStorage().nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
    }

    validarDebAutomatico() {
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