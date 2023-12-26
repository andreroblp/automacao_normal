const elem = require('./element').ELEMENTS;
import preCadastro from '../preCadastro/';
import gerarNomeFerminino from '../../geradores/geradorPessoas.js';

class DadosBeneficiario{

    validarAcessoNaPaginaEDadosBeneficiario(){
        cy.contains(elem.titulo).should('be.visible');
        cy.get(elem.nome).should('have.value', preCadastro.obterObjetoLocalStorage().nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.get(elem.dataNascimento).should('have.value', elem.dtNasc);
        cy.get(elem.cpf).should('have.value', preCadastro.obterObjetoLocalStorage().cpf.comMascara)
    }

    validarNomeGeneroSocial(){
        cy.get(elem.nomeSocial).should('have.value', preCadastro.obterObjetoLocalStorage().nomeSocial.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.get(elem.generoSocial + ' option:selected').invoke('text')
        .should('eq', preCadastro.obterObjetoLocalStorage().generoSocial);
    }

    preencherDadosBeneficiario(){
        localStorage.setItem('nomeMae', gerarNomeFerminino().nome)
        var nomeDaMae = localStorage.getItem('nomeMae');
        cy.get(elem.nomeMae).type(nomeDaMae).should('have.value', nomeDaMae);
        cy.get(elem.estadoCivil).select(1);
        cy.get(elem.estadoCivil + ' option:selected').invoke('text')
        .should('eq', elem.estadoCivilText);
        cy.get(elem.rg).type(elem.rgValue).should('have.value', elem.rgValue);
        cy.get(elem.cns).type(preCadastro.obterObjetoLocalStorage().cns).should('have.value', preCadastro.obterObjetoLocalStorage().cns);
        cy.get(elem.sexo).select(preCadastro.obterObjetoLocalStorage().sexo);
        cy.get(elem.sexo + ' option:selected').invoke('text')
        .should('eq', preCadastro.obterObjetoLocalStorage().sexo);
        cy.get(elem.orgaoEmissor).select(elem.orgaoEmissorText).should('have.value', elem.orgaoEmissorValue)
        cy.get(elem.elementoProfissao).invoke("show");
        cy.get(elem.classeProfissao)
          .within(() => {
            return cy.get(elem.subElementoProfissao).should('have.class', elem.classeDivSubElemento)
              .first()
              .click().type("ACESSOR {enter}")
          })
        cy.get(elem.ufOrgaoEmissor).select(elem.ufOrgaoEmissorValueText);

        cy.get(elem.email).type(Cypress.env('emailAndre')).should('have.value', Cypress.env('emailAndre'));
        cy.get(elem.cep).type(Cypress.env('cep')).should('have.value', Cypress.env('cep'));
        cy.get(elem.logradouro).invoke('val').should('not.be.empty')
        cy.get(elem.numeroEnd).type("67");
        cy.get(elem.checkboxEnd).click({ force: true }).should('be.checked');
        cy.get(elem.cepCorrespondencia).should('have.value', Cypress.env('cep'));
        cy.get(elem.cuidadoAnterior).select(elem.cuidadoAnteriorText).should('have.value', elem.cuidadoAnteriorValue)
    }

    preencherDebitoAutomatico(){
        cy.get(elem.radioDebitoAuomaticoSim).invoke('show').check('true').should('be.checked');
        cy.get(elem.debAutomDadosBenefCheckbox).invoke('show').check().should('be.checked');
        cy.get(elem.banco).select('341');
        cy.get(elem.banco + ' option:selected').invoke('text')
        .should('eq', elem.bancoText);
        var quantAgencia = Cypress.env('agencia').length - 1;
        cy.get(elem.agencia).type(Cypress.env('agencia')).should('have.value', Cypress.env('agencia'));
        cy.get(elem.cc).type(Cypress.env('cc')).should('have.value', Cypress.env('cc'))
    }

    validarRegrasDebitoAutomatico(){
        cy.get(elem.avisoDebitoAutomatico).should('be.visible');
        cy.get(elem.checkboxDocumentos).uncheck({ force: true }).should('not.be.checked');
        cy.get(elem.botaoAvancar).click();
        cy.get(elem.janelaDeAviso).should('be.visible')
        cy.get(elem.checkboxDocumentos).check({ force: true }).should('be.checked');
    }

    naoExibirAlertaObrigatoriedade(){
        cy.get(elem.janelaDeAviso).should('not.exist');
    }

    avancarParaEnvioArquivo(){
        cy.get(elem.botaoAvancar).click();
    }
}

export default new DadosBeneficiario();

       
        