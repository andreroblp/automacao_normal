const elem = require('../preCadastro/elements').ELEMENTS;
const elemNovaVenda = require('../novaVenda/elements').ELEMENTS;
import lStorage from '../localStorage'

class PreCadastro {

    consultarReceitaFederal(cpf) {
            const parte1 = Cypress.env('parte1RF');
            const parte2 = Cypress.env('parte2RF');
            cy.request({ method: 'GET', url: parte1 + cpf + parte2, failStatusCode: false, }).should(({ body }) => {
                lStorage.armazenarLocalStorage(body, 'receita');
            })
    }

    validarNomeEntrada() {
        cy.get(elem.nome).should('have.value', elemNovaVenda.nomeEntrada.toUpperCase())
    }

   reescreverNome() {
        cy.get(elem.nome).clear().type(lStorage.obterObjetoLocalStorage('preBenef').nome)
            .should('have.value', lStorage.obterObjetoLocalStorage('preBenef')
                .nome);
    }

    validarNomeDataNascimentoReceita() {
        cy.get(elem.nome).should('have.value', lStorage.obterObjetoLocalStorage('receita').nome);
        cy.get(elem.dataNascimento).should('have.value', lStorage.obterObjetoLocalStorage('receita').dataNascimento);
    }

    preencherCPFDataNasc(isCorretora, item) {
        cy.get(elem.cpf).type(lStorage.obterObjetoLocalStorage(item).documento)
            .should('have.value', lStorage.obterObjetoLocalStorage(item).documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"))
        if(isCorretora === false){
        cy.get(elem.recemNascidoMenu).select('Sim')
        cy.get(elem.recemNascidoMenu).select('Não')
    }
    if(item === 'preBenef'){
        cy.get(elem.dataNascimento).type(lStorage.obterObjetoLocalStorage(item).dataNascimento)
        .should('have.value', lStorage.obterObjetoLocalStorage(item).dataNascimento);
    }
}

    preencherDadosGeral() {
        cy.get(elem.parceriaVenda).select(elem.opcaoParceria)
        cy.get(elem.parceriaVenda + ' option:selected').invoke('text')                               // get it's text
            .should('eq', elem.opcaoParceria);
        cy.get(elem.planos).find(elem.planosElemento).should('have.class', elem.planosClass).and('be.visible');
        cy.get(elem.radioPlano).invoke('show').check(elem.valuePlano1002Enfermaria)
        cy.get(elem.radioPlano).invoke('hide')
        cy.get(elem.labelPlano1002Enfermaria).click();
        cy.get(elem.prestadorServico).select(elem.opcaoPrestadorServico)
        cy.get(elem.prestadorServico + ' option:selected').invoke('text')
            .should('eq', elem.opcaoPrestadorServico);
        cy.get(elem.celular).clear().type(lStorage.obterObjetoLocalStorage('preBenef').cel)
            .should('have.value', lStorage.obterObjetoLocalStorage('preBenef').cel)
    }

    preencherDadosGeralCorretora() {
        cy.get(elem.planos).find(elem.planosElemento).should('have.class', elem.planosClass).and('be.visible');
        cy.get(elem.radioPlano).invoke('show').check(elem.valuePlano1002Enfermaria)
        cy.get(elem.radioPlano).invoke('hide')
        cy.get(elem.labelPlano1002Enfermaria).click();
        cy.get(elem.celular).clear().type(lStorage.obterObjetoLocalStorage('preBenef').cel)
            .should('have.value', lStorage.obterObjetoLocalStorage('preBenef').cel)
    }

    preencherNomeGeneroSocial() {
        if (lStorage.obterObjetoLocalStorage('preBenef').nomeSocial !== '') {
            cy.get(elem.nomeSocial).type(lStorage.obterObjetoLocalStorage('preBenef').nomeSocial)
                .should('have.value', lStorage.obterObjetoLocalStorage('preBenef').nomeSocial);
        }
    }

    validarNaoExibicaoAlertaCamposObrigatorios() {
        cy.get(elem.avisoCamposObrigatorios).should('not.be.visible');
    }

    avancarParaDadosBeneficiario() {
        cy.get(elem.botaoAvancar).click();
    }
}
export default new PreCadastro();