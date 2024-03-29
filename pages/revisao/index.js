const elem = require('./elements').ELEMENTS;
import lStorage from '../localStorage/'


class Revisao{

    validarAcesso(){
        cy.contains(elem.titulo).should('be.visible');
    }

    validarAssinaturaDigital(){
        cy.get(elem.assinaturaDigital + ' option:selected').invoke('text')
        .should('eq', 'Sim');
    }

    nomeGeneroSocialVazio(){
        cy.get(elem.nomeSocial).should('have.value', '');
        cy.get(elem.generoSocial + ' option:selected').invoke('text')
        .should('eq', 'Nenhum');
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
        cy.get(elem.nomeSocial).should('have.value',  lStorage.obterObjetoLocalStorage('preBenef').nomeSocial.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.get(elem.generoSocial + ' option:selected').invoke('text')
        .should('eq', lStorage.obterObjetoLocalStorage('preBenef').generoSocial);
    }

    validarDadosBeneficiario(item){
        cy.get(elem.nome).should('have.value', lStorage.obterObjetoLocalStorage(item).nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.get(elem.cpf).should('have.value', lStorage.obterObjetoLocalStorage(item).documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
        cy.get(elem.dataNascimento).should('have.value', lStorage.obterObjetoLocalStorage(item).dataNascimento);
        cy.get(elem.nomeMae).should('have.value', lStorage.obterObjetoLocalStorage(item).nomeMae.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.get(elem.sexo + ' option:selected').invoke('text')
        .should('eq', lStorage.obterObjetoLocalStorage(item).sexo);
        cy.get(elem.rg).should('have.value', lStorage.obterObjetoLocalStorage(item).rg.numero);
        cy.get(elem.orgaoEmissor + ' option:selected').invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage(item).rg.orgaoEmissor);
        cy.get(elem.ufOrgaoEmissor + ' option:selected').invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage(item).rg.ufEmissor);
        cy.get(elem.cns).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').cns);
        cy.get(elem.telCelular).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').cel);
        cy.get(elem.email).should('have.value', Cypress.env('emailAndre'));
        cy.get(elem.estadoCivil + ' option:selected').invoke('text')
        .should('eq', lStorage.obterObjetoLocalStorage('preBenef').estadoCivil);
        cy.get(elem.cep).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').endereco.cep);
        cy.get(elem.tipoLogradouro + ' option:selected').invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage('preBenef').endereco.tipoL)
        cy.get(elem.logradouro).invoke('val').should('be.oneOf', [lStorage.obterObjetoLocalStorage('preBenef').endereco.logradouro, lStorage.obterObjetoLocalStorage('preBenef').endereco.logradouroInteiro])
        cy.get(elem.numeroEnd).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').endereco.numero);
        cy.get(elem.complemento).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').endereco.complemento);
        cy.get(elem.bairro).invoke('val').should('be.oneOf', [lStorage.obterObjetoLocalStorage('preBenef').endereco.bairro, lStorage.obterObjetoLocalStorage('preBenef').endereco.bairroInteiro])
        cy.get(elem.cidade).invoke('val').should('be.oneOf', [lStorage.obterObjetoLocalStorage('preBenef').endereco.cidade, lStorage.obterObjetoLocalStorage('preBenef').endereco.cidadeInteiro])
        cy.get(elem.UF).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').endereco.uf)
        cy.get(elem.ibge).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').endereco.ibge)
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

    validarTermoAditivo(){
        cy.xpath(elem.xpathCuidadoAnterior).invoke('text')
        .should('eq', elem.cuidadoAnteriorText);
    }

    validarDadosDebitoAutomatico(item){
        cy.xpath(elem.xpathNomeDebAutom).invoke('text')
        .should('eq', lStorage.obterObjetoLocalStorage(item).nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.xpath(elem.xpathCPFDebAutom).invoke('text')
        .should('eq', lStorage.obterObjetoLocalStorage(item).documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
        cy.xpath(elem.xpathBancoDebAutom).invoke('text')
        .should('eq', lStorage.obterObjetoLocalStorage('preBenef').dadosBanco.banco + ' - ' + lStorage.obterObjetoLocalStorage('preBenef').dadosBanco.nome);
    cy.xpath(elem.xpathAgenciaDebAutom).invoke('text')
        .should('eq', lStorage.obterObjetoLocalStorage('preBenef').dadosBanco.agencia);
    cy.xpath(elem.xpathContaCDebAutom).invoke('text')
        .should('eq', lStorage.obterObjetoLocalStorage('preBenef').dadosBanco.contaCorrente)
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