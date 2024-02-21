const elem = require('./elements').ELEMENTS;
import lStorage from '../localStorage/'
import homePortal from '../homePortal/';

class Pagamento {

    validarAcesso() {
        cy.contains(elem.titulo).should('be.visible')
    }


    validarDadosBeneficiario(item) {
        let ext = ""
        if(lStorage.obterObjetoLocalStorage('preBenef').nomeSocial !== ""){
            cy.xpath(elem.xpathNomeSocial).invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage('preBenef').nomeSocial.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        } else{
            ext = 'SemNomeSocial';
        }
        cy.xpath(elem['xpathNomeBenef' + ext]).invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage(item).nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.get(elem.datNasc).should('have.value', lStorage.obterObjetoLocalStorage(item).dataNascimento);
        
        cy.xpath(elem['xpathAdesao' + ext]).invoke('text')
            .should('eq', 'Boleto - (deve ser encaminhado junto com o contrato)');
        cy.xpath(elem['xpathMensal' + ext]).invoke('text')
            .should('eq', 'Débito automático');
    }

    validarDebAutomatico(item) {
        cy.xpath(elem.xpathNomeDebAutom).invoke('text')
        .should('eq', lStorage.obterObjetoLocalStorage(item).nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.xpath(elem.xpathBancoDebAutom).invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage('preBenef').dadosBanco.banco + ' - ' + lStorage.obterObjetoLocalStorage('preBenef').dadosBanco.nome);
        cy.xpath(elem.xpathAgenciaDebAutom).invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage('preBenef').dadosBanco.agencia);
        cy.xpath(elem.xpathCCDebAutom).invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage('preBenef').dadosBanco.contaCorrente);
    }

    validarDemaisInfos() {
        cy.get(elem.formaPgto + ' option:selected').invoke('text')
            .should('eq', 'Boleto');
    }

    finalizarVenda() {
        cy.get(elem.botaoAvancar).click();
    }

    validarSucessoEncerramento() {
        homePortal.validarAcesso();
        homePortal.validarMensagemFinalizacaoVenda();
    }
}

export default new Pagamento();