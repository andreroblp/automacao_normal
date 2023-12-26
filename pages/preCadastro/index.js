const elem = require('../preCadastro/elements').ELEMENTS;
const elemNovaVenda = require('../novaVenda/elements.js').ELEMENTS;
import gerarPessoaAleatorio from '../../geradores/geradorPessoas.js';

class PreCadastro {
    
    armazenarLocalStorage(isThereSocialName) {
        let objetoPreBenef = gerarPessoaAleatorio(isThereSocialName);
        var jsonAux = JSON.stringify(objetoPreBenef);
        localStorage.setItem('pre_benef', jsonAux);
    }

    validarNomeEntrada(){
        cy.get(elem.nome).should('have.value', elemNovaVenda.nomeEntrada.toUpperCase())
    }

    obterObjetoLocalStorage(){
        var jsonBenef = window.localStorage.getItem('pre_benef')
        let benef = JSON.parse(jsonBenef);
        return benef
    }

    reescreverNome() {
        cy.get(elem.nome).clear().type(this.obterObjetoLocalStorage().nome)
        .should('have.value', this.obterObjetoLocalStorage()
        .nome);
    }

    preencherDados() {
        var jsonBenef = window.localStorage.getItem('pre_benef')
        var benef = JSON.parse(jsonBenef);
        cy.get(elem.cpf).type(this.obterObjetoLocalStorage().cpf.semMascara)
        .should('have.value', this.obterObjetoLocalStorage().cpf.comMascara)
        cy.get(elem.parceriaVenda).select(elem.opcaoParceria)
        cy.get(elem.parceriaVenda + ' option:selected').invoke('text')                               // get it's text
        .should('eq', elem.opcaoParceria)
        cy.get(elem.dataNascimento).type(elem.dtNasc).should('have.value', elem.dtNasc);
        cy.get(elem.planos).find(elem.planosElemento).should('have.class', elem.planosClass).and('be.visible');
        cy.get(elem.radioPlano).invoke('show').check(elem.valuePlano1002Enfermaria)
        cy.get(elem.radioPlano).invoke('hide')
        cy.get(elem.labelPlano1002Enfermaria).click();
        cy.get(elem.prestadorServico).select(elem.opcaoPrestadorServico)
        cy.get(elem.prestadorServico + ' option:selected').invoke('text')
        .should('eq', elem.opcaoPrestadorServico);
    }

    preencherNomeGeneroSocial(){
        cy.get(elem.nomeSocial).type(this.obterObjetoLocalStorage().nomeSocial);
        cy.get(elem.generoSocial).select(this.obterObjetoLocalStorage().generoSocial);
    }

    validarNaoExibicaoAlertaCamposObrigatorios(){
        cy.get(elem.avisoCamposObrigatorios).should('not.be.visible');
    }
    
    avancarParaDadosBeneficiario(){
        cy.get(elem.botaoAvancar).click();
    }
}
export default new PreCadastro();