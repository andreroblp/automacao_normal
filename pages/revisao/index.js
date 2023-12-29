const elem = require('./elements').ELEMENTS;
const print = require('../parametrosPrints/elements').ADRESS_PRINT;
import preCadastro from '../preCadastro';

class Revisao{

    validarAcesso(){
        cy.contains(elem.titulo).should('be.visible');
    }

    validarAssinaturaDigital(){
        cy.get(elem.assinaturaDigital + ' option:selected').invoke('text')
        .should('eq', 'Sim');
    }

    validarPagamentoAdesao(){
        cy.get(elem.pagamentoAdesao + ' option:selected').invoke('text')
        .should('eq', 'Boleto');
    }

    validarPagamentoMensalidade(){
        cy.get(elem.pagamentoMensalidade).find('option:selected').should('have.text', 'Débito automático');
        cy.get(elem.pagamentoMensalidade).should('not.have.text', 'Boleto');
    }

    validarNomeGeneroSocial(){
        cy.get(elem.nomeSocial).should('have.value',  preCadastro.obterObjetoLocalStorage().nomeSocial.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.get(elem.generoSocial + ' option:selected').invoke('text')
        .should('eq', preCadastro.obterObjetoLocalStorage().generoSocial);
    }

    validarDadosBeneficiario(){
        cy.get(elem.nome).should('have.value', preCadastro.obterObjetoLocalStorage().nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.get(elem.rg).should('have.value', Cypress.env('rg'));
        cy.get(elem.cep).should('have.value', Cypress.env('cep')); 
        cy.get(elem.orgaoEmissor + ' option:selected').invoke('text')
        .should('eq', elem.orgaoEmissorText);
        cy.get(elem.ufOrgaoEmissor + ' option:selected').invoke('text')
        .should('eq', elem.ufOrgaoEmissorValueText);
        cy.get(elem.cpf).should('have.value', preCadastro.obterObjetoLocalStorage().cpf.comMascara)
        cy.get(elem.dataNascimento).should('have.value', Cypress.env('dtNasc'));
        cy.get(elem.sexo + ' option:selected').invoke('text')
        .should('eq', preCadastro.obterObjetoLocalStorage().sexo);
        cy.get(elem.cns).should('have.value', preCadastro.obterObjetoLocalStorage().cns);
        cy.get(elem.telCelular).should('have.value', preCadastro.obterObjetoLocalStorage().cel);
        cy.get(elem.email).should('have.value', Cypress.env('emailAndre'));
        cy.get(elem.estadoCivil + ' option:selected').invoke('text')
        .should('eq', preCadastro.obterObjetoLocalStorage().estadoCivil);
        cy.get(elem.nomeMae).should('have.value', preCadastro.obterObjetoLocalStorage().nomeMae.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.get(elem.cepCorrespondencia).should('have.value', Cypress.env('cep'));
    }

    validarTermoAditivo(){
        cy.xpath(elem.xpathCuidadoAnterior).invoke('text')
        .should('eq', elem.cuidadoAnteriorText);
    }

    validarDadosDebitoAutomatico(){
        cy.xpath(elem.xpathNomeDebAutom).invoke('text')
        .should('eq', preCadastro.obterObjetoLocalStorage().nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.xpath(elem.xpathCPFDebAutom).invoke('text')
        .should('eq', preCadastro.obterObjetoLocalStorage().cpf.comMascara);
        cy.xpath(elem.xpathBancoDebAutom).invoke('text')
        .should('eq', elem.bancoDebito);
        cy.xpath(elem.xpathAgenciaDebAutom).invoke('text')
        .should('eq', Cypress.env('agencia'))
        cy.xpath(elem.xpathContaCDebAutom).invoke('text')
        .should('eq', Cypress.env('cc'))
    }

    validarJustificativaDeclaracaoSaude(){
        cy.get(elem.justificativa3).invoke('text')
        .should('eq', "Teste Justificativa Automação");
    }

    botaoSalvar(){
        cy.get(elem.botaoAvancar).click();
    }
}

export default new Revisao();