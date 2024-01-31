const elem = require('./elements.js').ELEMENTS;
import lStorage from '../localStorage/'

class DadosBeneficiario {

    validarAcessoNaPagina() {
        cy.contains(elem.titulo).should('be.visible');
    }

    validarNomeGeneroSocial() {
        cy.get(elem.nomeSocial).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').nomeSocial.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
    }

    preencherGeneroSocial() {
        cy.get(elem.generoSocial).select(lStorage.obterObjetoLocalStorage('preBenef').generoSocial);
    }

    validarDados(item) {
        cy.get(elem.nome).should('have.value', lStorage.obterObjetoLocalStorage(item).nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.get(elem.cpf).should('have.value', lStorage.obterObjetoLocalStorage(item).documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
        cy.get(elem.dataNascimento).should('have.value', lStorage.obterObjetoLocalStorage(item).dataNascimento);
        cy.get(elem.numeroCel).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').cel);
        if (item === 'receita') {
            cy.get(elem.nomeMae).should('have.value', lStorage.obterObjetoLocalStorage('receita').nomeMae.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        }
    }

    preencherDadosBeneficiario(item) {
        if (item === 'preBenef') {
            cy.get(elem.nomeMae).type(lStorage.obterObjetoLocalStorage('preBenef').nomeMae).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').nomeMae);
        }
        cy.get(elem.sexo).select(lStorage.obterObjetoLocalStorage(item).sexo);
        cy.get(elem.sexo + ' option:selected').invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage(item).sexo);
        cy.get(elem.estadoCivil).select(lStorage.obterObjetoLocalStorage('preBenef').estadoCivil);
        cy.get(elem.estadoCivil + ' option:selected').invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage('preBenef').estadoCivil);
        cy.get(elem.rg).type(lStorage.obterObjetoLocalStorage('preBenef').rg.numero).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').rg.numero);
        cy.get(elem.cns).type(lStorage.obterObjetoLocalStorage('preBenef').cns).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').cns);
        cy.get(elem.orgaoEmissor).select(lStorage.obterObjetoLocalStorage('preBenef').rg.orgaoEmissor)
        cy.get(elem.orgaoEmissor + ' option:selected').invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage('preBenef').rg.orgaoEmissor)
        cy.get(elem.elementoProfissao).invoke("show");
        cy.get(elem.classeProfissao)
            .within(() => {
                return cy.get(elem.subElementoProfissao).should('have.class', elem.classeDivSubElemento)
                    .first()
                    .click().type("ACESSOR {enter}")
            })
        cy.get(elem.ufOrgaoEmissor).select(lStorage.obterObjetoLocalStorage('preBenef').rg.ufEmissor);
        cy.get(elem.email).type(Cypress.env('emailAndre')).should('have.value', Cypress.env('emailAndre'));
        cy.get(elem.cep).type(lStorage.obterObjetoLocalStorage('preBenef').endereco.cep).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').endereco.cep);
        cy.get(elem.tipoLogradouro + ' option:selected').invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage('preBenef').endereco.tipoL)
        cy.get(elem.logradouro).invoke('val').should('be.oneOf', [lStorage.obterObjetoLocalStorage('preBenef').endereco.logradouro, lStorage.obterObjetoLocalStorage('preBenef').endereco.logradouroInteiro])
        cy.get(elem.numeroEnd).type(lStorage.obterObjetoLocalStorage('preBenef').endereco.numero).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').endereco.numero);

        if (lStorage.obterObjetoLocalStorage('preBenef').endereco.complemento !== '') {
            cy.get(elem.complemento).type(lStorage.obterObjetoLocalStorage('preBenef').endereco.complemento).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').endereco.complemento);
        }

        cy.get(elem.bairro).invoke('val').should('be.oneOf', [lStorage.obterObjetoLocalStorage('preBenef').endereco.bairro, lStorage.obterObjetoLocalStorage('preBenef').endereco.bairroInteiro])
        cy.get(elem.cidade).invoke('val').should('be.oneOf', [lStorage.obterObjetoLocalStorage('preBenef').endereco.cidade, lStorage.obterObjetoLocalStorage('preBenef').endereco.cidadeInteiro])
        cy.get(elem.UF).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').endereco.uf)
        cy.get(elem.ibge).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').endereco.ibge)
        cy.wait(2000)
        cy.get(elem.checkboxEnd).click({ force: true }).should('be.checked');
        cy.get(elem.cepCorrespondencia).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').endereco.cep);
        cy.get(elem.tipoLogradouroCorrespondencia + ' option:selected').invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage('preBenef').endereco.tipoL)
        cy.get(elem.logradouroCorrespondencia).invoke('val').should('be.oneOf', [lStorage.obterObjetoLocalStorage('preBenef').endereco.logradouro, lStorage.obterObjetoLocalStorage('preBenef').endereco.logradouroInteiro])
        cy.get(elem.numeroEndCorrespondencia).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').endereco.numero);
        cy.get(elem.complementoCorrespondencia).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').endereco.complemento);
        cy.get(elem.bairro).invoke('val').should('be.oneOf', [lStorage.obterObjetoLocalStorage('preBenef').endereco.bairro, lStorage.obterObjetoLocalStorage('preBenef').endereco.bairroInteiro])
        cy.get(elem.cidade).invoke('val').should('be.oneOf', [lStorage.obterObjetoLocalStorage('preBenef').endereco.cidade, lStorage.obterObjetoLocalStorage('preBenef').endereco.cidadeInteiro])
        cy.get(elem.UFCorrespondencia).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').endereco.uf)
        cy.get(elem.ibgeCorrespondencia).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').endereco.ibge)

    }

    cuidadoAnteriorParticular() {
        cy.get(elem.cuidadoAnterior).select(elem.cuidadoAnteriorText).should('have.value', elem.cuidadoAnteriorValue)
    }

    preencherDebitoAutomatico() {
        cy.get(elem.radioDebitoAuomaticoSim).invoke('show').check('true').should('be.checked');
        cy.get(elem.debAutomDadosBenefCheckbox).invoke('show').check().should('be.checked');
        cy.get(elem.banco).select(lStorage.obterObjetoLocalStorage('preBenef').dadosBanco.banco);
        cy.get(elem.banco + ' option:selected').invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage('preBenef').dadosBanco.nome);
        cy.get(elem.agencia).type(lStorage.obterObjetoLocalStorage('preBenef').dadosBanco.agencia).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').dadosBanco.agencia);
        cy.get(elem.cc).type(lStorage.obterObjetoLocalStorage('preBenef').dadosBanco.contaCorrente).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').dadosBanco.contaCorrente)
    }

    validarAvisoDebitoAutomaticoCorretora() {
        cy.get(elem.avisoDebitoAutomatico).should('be.visible');
    }

    validarRegrasDebitoAutomatico() {
        cy.get(elem.avisoDebitoAutomatico).should('be.visible');
        cy.get(elem.checkboxDocumentos).uncheck({ force: true }).should('not.be.checked');
        cy.get(elem.botaoAvancar).click();
        cy.get(elem.janelaDeAviso).should('be.visible')
        cy.get(elem.janelaDeAviso).invoke('text')
            .should('eq', elem.mensagemErroDocumentos);
        cy.get(elem.botaoFecharJanelErro).click();
        cy.get(elem.janelaDeAviso).should('not.exist')
        cy.get(elem.checkboxDocumentos).check({ force: true }).should('be.checked');
    }

    nomeGeneroSocialVazio() {
        cy.get(elem.nomeSocial).should('have.value', '');
        cy.get(elem.generoSocial + ' option:selected').invoke('text')
            .should('eq', 'Nenhum');
    }

    naoExibirAlertaObrigatoriedade() {
        cy.get(elem.janelaDeAviso).should('not.exist');
    }

    avancarParaEnvioArquivo() {
        cy.get(elem.botaoAvancar).click();
    }
}

export default new DadosBeneficiario();


