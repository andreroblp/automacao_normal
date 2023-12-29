const elem = require('./elements').ELEMENTS;
const print = require('../parametrosPrints/elements').ADRESS_PRINT;
import preCadastro from '../preCadastro';

class ImpressaoContrato {

    validarAcesso() {
        cy.contains(elem.titulo).should('be.visible');
    }

    validarNomeSocial(){
        cy.xpath(elem.xpathNomeSocial).invoke('text')
            .should('eq', preCadastro.obterObjetoLocalStorage().nomeSocial.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
    }

    validarDadosBeneficiario() {
        cy.xpath(elem.xpathNomeBenef).invoke('text')
            .should('eq', preCadastro.obterObjetoLocalStorage().nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.xpath(elem.xpathNomeMae).invoke('text')
            .should('eq', preCadastro.obterObjetoLocalStorage().nomeMae.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.xpath(elem.xpathDataNasc).invoke('text')
            .should('eq', Cypress.env('dtNasc'));
        cy.xpath(elem.xpathRG).invoke('text')
            .should('eq', Cypress.env('rg'));
        cy.xpath(elem.xpathCPF).invoke('text')
            .should('eq', preCadastro.obterObjetoLocalStorage().cpf.comMascara);
        cy.xpath(elem.xpathEmail).invoke('text')
            .should('eq', Cypress.env('emailAndre'));
        cy.xpath(elem.xpathCelular).invoke('text')
            .should('eq', preCadastro.obterObjetoLocalStorage().cel);
        cy.xpath(elem.xpathAdesao).invoke('text')
            .should('eq', 'Boleto - (envio automático por e-mail)');
        cy.xpath(elem.xpathMensal).invoke('text')
            .should('eq', 'Débito automático');
    }

    validarExibirMensagemErro() {
        cy.get(elem.botaoAvancar).click();
        cy.get(elem.mensagemErro).should('be.visible');
        cy.get(elem.mensagemErro).invoke('text')
            .should('eq', elem.mensagemErroContrato);
        cy.get(elem.mensagemErroBotaoFechar).click();
    }

    clicarBotaoContrato(){
        cy.get(elem.botaoContrato).should('be.visible').click();
        cy.get(elem.classeModal).should('be.visible');
        cy.wait(5000)
        cy.screenshot(print.internaNormalDebAutomNomeSocial, { capture: 'fullPage' });
        cy.get(elem.idPreBenef).invoke('attr', 'value').then($id => {
            var jsonAux = JSON.stringify($id);
            window.localStorage.setItem('id', jsonAux);
        })
    }

    exibirContrato() {
        cy.get(elem.classeModal).should('be.visible');
        cy.get(elem.classeModal)
            .within(() => {
                return cy.get(elem.subselector).should('have.class', elem.subclasseSelector)
                    .last()
                    .click();
            })
    }

    clicarAvancar(){
        cy.get(elem.botaoAvancar).click();
        cy.get(elem.mensagemErro).should('not.exist');
    }
}

export default new ImpressaoContrato();