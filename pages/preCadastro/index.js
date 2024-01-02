const elem = require('../preCadastro/elements').ELEMENTS;
const elemNovaVenda = require('../novaVenda/elements.js').ELEMENTS;
import gerarPessoa from '../../geradores/geradorPessoas.js';

class PreCadastro {

    consultarReceitaFederal(cpf) {
        if (this.obterReceitaLocalStorage() === null) {
            const parte1 = Cypress.env('parte1RF');
            const parte2 = Cypress.env('parte2RF');
            cy.request({ method: 'GET', url: parte1 + cpf + parte2, failStatusCode: false, }).should(({ body }) => {
                var jsonAux = JSON.stringify(body);
                localStorage.setItem('receita', jsonAux);
            })
        }
    }

    armazenarLocalStorage(tipoPessoa, temNomeSocial, temGeneroSocial) {
        let objetoPreBenef = gerarPessoa(tipoPessoa, temNomeSocial, temGeneroSocial);
        var jsonAux = JSON.stringify(objetoPreBenef);
        localStorage.setItem('pre_benef', jsonAux);
    }

    validarNomeEntrada() {
        cy.get(elem.nome).should('have.value', elemNovaVenda.nomeEntrada.toUpperCase())
    }

    obterObjetoLocalStorage() {
        var jsonBenef = window.localStorage.getItem('pre_benef')
        let benef = JSON.parse(jsonBenef);
        return benef
    }

    obterReceitaLocalStorage() {
        var jsonBenef = window.localStorage.getItem('receita')
        let rf = JSON.parse(jsonBenef);
        return rf
    }

    reescreverNome() {
        cy.get(elem.nome).clear().type(this.obterObjetoLocalStorage().nome)
            .should('have.value', this.obterObjetoLocalStorage()
                .nome);
    }

    validarNomeDataNascimentoReceita() {
        cy.get(elem.nome).should('have.value', this.obterReceitaLocalStorage().nome);
        cy.get(elem.dataNascimento).should('have.value', this.obterReceitaLocalStorage().dataNascimento);
    }

    preencherCPFReceita() {
        cy.get(elem.cpf).type(this.obterReceitaLocalStorage().documento)
            .should('have.value', this.obterReceitaLocalStorage().documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"))
        cy.get(elem.recemNascidoMenu).select('Sim')
        cy.get(elem.recemNascidoMenu).select('Não')
    }

    preencherDados() {
        cy.get(elem.cpf).type(this.obterObjetoLocalStorage().cpf.semMascara)
            .should('have.value', this.obterObjetoLocalStorage().cpf.comMascara)
        cy.get(elem.dataNascimento).type(elem.dtNasc).should('have.value', elem.dtNasc);
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
        cy.get(elem.celular).clear().type(this.obterObjetoLocalStorage().cel)
            .should('have.value', this.obterObjetoLocalStorage().cel)
    }

    preencherDadosGeralCorretora() {
        cy.get(elem.planos).find(elem.planosElemento).should('have.class', elem.planosClass).and('be.visible');
        cy.get(elem.radioPlano).invoke('show').check(elem.valuePlano1002Enfermaria)
        cy.get(elem.radioPlano).invoke('hide')
        cy.get(elem.labelPlano1002Enfermaria).click();
        cy.get(elem.celular).clear().type(this.obterObjetoLocalStorage().cel)
            .should('have.value', this.obterObjetoLocalStorage().cel)
    }

    preencherNomeGeneroSocial() {
        if (this.obterObjetoLocalStorage().nomeSocial !== '') {
            cy.get(elem.nomeSocial).type(this.obterObjetoLocalStorage().nomeSocial)
                .should('have.value', this.obterObjetoLocalStorage().nomeSocial);
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