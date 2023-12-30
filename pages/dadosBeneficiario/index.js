const elem = require('./elements.js').ELEMENTS;
import preCadastro from '../preCadastro/';

class DadosBeneficiario{

    validarAcessoNaPaginaEDadosBeneficiario(){
        cy.contains(elem.titulo).should('be.visible');
        cy.get(elem.numeroCel).should('have.value', preCadastro.obterObjetoLocalStorage().cel);
    }

    validarNomeGeneroSocial(){
        cy.get(elem.nomeSocial).should('have.value', preCadastro.obterObjetoLocalStorage().nomeSocial.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
    }

    preencherGeneroSocial(){
        cy.get(elem.generoSocial).select(preCadastro.obterObjetoLocalStorage().generoSocial);
    }

    validarDadosNotRF(){
        cy.get(elem.nome).should('have.value', preCadastro.obterObjetoLocalStorage().nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.get(elem.dataNascimento).should('have.value', elem.dtNasc);
        cy.get(elem.cpf).should('have.value', preCadastro.obterObjetoLocalStorage().cpf.comMascara)
    }

    validarDadosReceita(){
        cy.get(elem.nome).should('have.value', preCadastro.obterReceitaLocalStorage().nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.get(elem.dataNascimento).should('have.value', preCadastro.obterReceitaLocalStorage().dataNascimento);
        cy.get(elem.cpf).should('have.value', preCadastro.obterReceitaLocalStorage().documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"))
        cy.get(elem.nomeMae).should('have.value', preCadastro.obterReceitaLocalStorage().nomeMae.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
    }

    preencherSexoReceita(){
        cy.get(elem.sexo).select(preCadastro.obterReceitaLocalStorage().sexo);
        cy.get(elem.sexo + ' option:selected').invoke('text')
        .should('eq', preCadastro.obterReceitaLocalStorage().sexo);
    }

    preencherSexoMaeNotRF(){
        cy.get(elem.nomeMae).type(preCadastro.obterObjetoLocalStorage().nomeMae).should('have.value', preCadastro.obterObjetoLocalStorage().nomeMae);
        cy.get(elem.sexo).select(preCadastro.obterObjetoLocalStorage().sexo);
        cy.get(elem.sexo + ' option:selected').invoke('text')
        .should('eq', preCadastro.obterObjetoLocalStorage().sexo);
    }

    preencherDadosBeneficiarioGeral(){
        cy.get(elem.estadoCivil).select(preCadastro.obterObjetoLocalStorage().estadoCivil);
        cy.get(elem.estadoCivil + ' option:selected').invoke('text')
        .should('eq', preCadastro.obterObjetoLocalStorage().estadoCivil);
        cy.get(elem.rg).type(Cypress.env('rg')).should('have.value', Cypress.env('rg'));
        cy.get(elem.cns).type(preCadastro.obterObjetoLocalStorage().cns).should('have.value', preCadastro.obterObjetoLocalStorage().cns);
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
        cy.get(elem.janelaDeAviso).invoke('text')
        .should('eq', elem.mensagemErroDocumentos);
        cy.get(elem.botaoFecharJanelErro).click();
        cy.get(elem.janelaDeAviso).should('not.exist')
        cy.get(elem.checkboxDocumentos).check({ force: true }).should('be.checked');
    }

    nomeGeneroSocialVazio(){
        cy.get(elem.nomeSocial).should('have.value', '');
        cy.get(elem.generoSocial + ' option:selected').invoke('text')
        .should('eq', 'Nenhum');
    }

    naoExibirAlertaObrigatoriedade(){
        cy.get(elem.janelaDeAviso).should('not.exist');
    }

    avancarParaEnvioArquivo(){
        cy.get(elem.botaoAvancar).click();
    }
}

export default new DadosBeneficiario();

       
        