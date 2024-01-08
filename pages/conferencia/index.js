const elem = require('./elements').ELEMENTS;
import lStorage from '../localStorage/'

class Conferencia {

    validarAcesso() {
        cy.contains(elem.titulo).should('be.visible');
    }

    validarAcessoCorretora() {
        cy.contains(elem.tituloCorretora).should('be.visible');
    }

    comoConheceuCorretora(){
        cy.get(elem.comoConheceu).select(elem.opcaoConheceu);
        cy.get(elem.comoConheceu + ' option:selected').invoke('text')
        .should('eq', elem.opcaoConheceu)
    }

    preencherParceriaVenda() {
        cy.get(elem.parceriaVenda).select("Nenhuma");
        cy.get(elem.parceriaVenda + ' option:selected').invoke('text')
            .should('eq', 'Nenhuma');
    }

    preencherAssinaturaDigital() {
        cy.get(elem.assinaturaDigital).select("Sim");
        cy.get(elem.assinaturaDigital + ' option:selected').invoke('text')
            .should('eq', 'Sim');
    }

    preencherPagamentoAdesao() {
        cy.get(elem.pagamentoAdesao).select("Boleto");
        cy.get(elem.pagamentoAdesao + ' option:selected').invoke('text')
            .should('eq', 'Boleto');
    }

    preencherPagamentoMensalidade() {
        cy.get(elem.pagamentoMensalidade).find('option:selected').should('have.text', 'Débito automático');
        cy.get(elem.pagamentoMensalidade).should('not.have.text', 'Boleto');
    }

    nomeGeneroSocialVazio() {
        cy.get(elem.nomeSocial).should('have.value', '');
        cy.get(elem.generoSocial + ' option:selected').invoke('text')
            .should('eq', 'Nenhum');
    }

    validarNomeGeneroSocial() {
        cy.get(elem.nomeSocial).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').nomeSocial.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase())
        cy.get(elem.generoSocial + ' option:selected').invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage('preBenef').generoSocial);
    }

    validarDadosBeneficiario(item) {
        cy.get(elem.nome).should('have.value', lStorage.obterObjetoLocalStorage(item).nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.get(elem.dataNascimento).should('have.value', lStorage.obterObjetoLocalStorage(item).dataNascimento);
        cy.get(elem.cpf).should('have.value', lStorage.obterObjetoLocalStorage(item).documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"))
        cy.get(elem.nomeMae).should('have.value', lStorage.obterObjetoLocalStorage(item).nomeMae.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.get(elem.sexo + ' option:selected').invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage(item).sexo);
        cy.get(elem.rg).should('have.value', Cypress.env('rg'));
        cy.get(elem.cep).should('have.value', Cypress.env('cep'));
        cy.get(elem.orgaoEmissor + ' option:selected').invoke('text')
            .should('eq', elem.orgaoEmissorText);
        cy.get(elem.ufOrgaoEmissor + ' option:selected').invoke('text')
            .should('eq', elem.ufOrgaoEmissorValueText);
        cy.get(elem.cns).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').cns);
        cy.get(elem.telCelular).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').cel);
        cy.get(elem.email).should('have.value', Cypress.env('emailAndre'));
        cy.get(elem.estadoCivil + ' option:selected').invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage('preBenef').estadoCivil);
        cy.get(elem.cepCorrespondencia).should('have.value', Cypress.env('cep'));
        cy.get(elem.cuidadoAnterior + ' option:selected').invoke('text')
            .should('eq', elem.cuidadoAnteriorText);
    }

    validarDadosDebitoAutomatico(item) {
        cy.xpath(elem.xpathNomeDebAutom).invoke('text')
        .should('eq', lStorage.obterObjetoLocalStorage(item).nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
    cy.xpath(elem.xpathCPFDebAutom).invoke('text')
        .should('eq', lStorage.obterObjetoLocalStorage(item).documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
        cy.xpath(elem.xpathBancoDebAutom).invoke('text')
            .should('eq', elem.bancoDebito);
        cy.xpath(elem.xpathAgenciaDebAutom).invoke('text')
            .should('eq', Cypress.env('agencia'))
        cy.xpath(elem.xpathContaCDebAutom).invoke('text')
            .should('eq', Cypress.env('cc'))
    }

    validarDadosDebitoAutomaticoCorretora(item) {
        cy.xpath(elem.xpathNomeDebAutomCorretora).invoke('text')
        .should('eq', lStorage.obterObjetoLocalStorage(item).nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
    cy.xpath(elem.xpathCPFDebAutomCorretora).invoke('text')
        .should('eq', lStorage.obterObjetoLocalStorage(item).documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
        cy.xpath(elem.xpathBancoDebAutomCorretora).invoke('text')
            .should('eq', elem.bancoDebito);
        cy.xpath(elem.xpathAgenciaDebAutomCorretora).invoke('text')
            .should('eq', Cypress.env('agencia'))
        cy.xpath(elem.xpathContaCDebAutomCorretora).invoke('text')
            .should('eq', Cypress.env('cc'))
    }

    validarJustificativaDeclaracaoSaude() {
        cy.get(elem.justificativa3).should('have.value', "Teste Justificativa Automação");
    }

    validarJustificativaDeclaracaoSaudeVazia(item) {
        let quantidadePerguntas = 0;
        if(lStorage.obterObjetoLocalStorage(item).sexo === "Feminino"){
            quantidadePerguntas = 15;
        } else{
            quantidadePerguntas = 14
        }
        for(let x=1; x <= quantidadePerguntas; x++){
        let pergunta = x
        cy.get(elem['justificativa' + pergunta.toString()]).should('have.value', "");
        console.log(quantidadePerguntas)
    }
}

    botaoSalvar() {
        cy.get(elem.botaoAvancar).click();
    }
}

export default new Conferencia();