const elem = require('./elements').ELEMENTS;
import printDaTela from '../parametrosPrints/';
import lStorage from '../localStorage';

class ImpressaoContrato {

    validarAcesso() {
        cy.contains(elem.titulo).should('be.visible');
    }

    validarDadosBeneficiario(item) {
        let ext = '';
        if(lStorage.obterObjetoLocalStorage('preBenef').nomeSocial !== ""){
        cy.xpath(elem.xpathNomeSocial).invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage('preBenef').nomeSocial.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        } else{
            ext = 'SemNomeSocial';
        }
            cy.xpath(elem['xpathNomeBenef'+ext]).invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage(item).nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.xpath(elem['xpathNomeMae'+ext]).invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage(item).nomeMae.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.xpath(elem['xpathDataNasc'+ext]).invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage(item).dataNascimento);
        cy.xpath(elem['xpathCPF'+ext]).invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage(item).documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
        cy.xpath(elem['xpathRG'+ext]).invoke('text')
            .should('eq', Cypress.env('rg'));
        cy.xpath(elem['xpathEmail'+ext]).invoke('text')
            .should('eq', Cypress.env('emailAndre'));
        cy.xpath(elem['xpathCelular'+ext]).invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage('preBenef').cel);
        cy.xpath(elem['xpathAdesao'+ext]).invoke('text')
            .should('eq', 'Boleto - (envio automático por e-mail)');
        cy.xpath(elem['xpathMensal'+ext]).invoke('text')
            .should('eq', 'Débito automático');
    }

    validarExibirMensagemErro() {
        cy.get(elem.botaoAvancar).click();
        cy.get(elem.mensagemErro).should('be.visible');
        cy.get(elem.mensagemErro).invoke('text')
            .should('eq', elem.mensagemErroContrato);
        cy.get(elem.mensagemErroBotaoFechar).click();
    }

    clicarBotaoContrato(directory) {
        cy.get(elem.botaoContrato).should('be.visible').click();
        cy.get(elem.classeModal).should('be.visible');
        cy.wait(5000)
        printDaTela.documentos(directory);
        cy.get(elem.idPreBenef).invoke('attr', 'value').then($id => {
            lStorage.armazenarLocalStorage($id, 'idPreBenef')
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

    clicarAvancar() {
        cy.get(elem.botaoAvancar).click();
        cy.get(elem.mensagemErro).should('not.exist');
    }
}

export default new ImpressaoContrato();