const elem = require('./elements').ELEMENTS;
import printDaTela from '../parametrosPrints/';
import lStorage from '../localStorage'
import homePortal from '../homePortal';

class AssinaturaDigital {

    validarAcesso() {
        cy.contains(elem.titulo).should('be.visible');
    }

    validarDadosBeneficiario(item) {
        let ext = "";
        if (lStorage.obterObjetoLocalStorage('preBenef').nomeSocial !== "") {
            cy.xpath(elem.xpathNomeSocial).invoke('text')
                .should('eq', lStorage.obterObjetoLocalStorage('preBenef').nomeSocial.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        } else {
            ext = "SemNomeSocial";
        }
        cy.xpath(elem['xpathNomeBenef' + ext]).invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage(item).nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.xpath(elem['xpathNomeMae' + ext]).invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage(item).nomeMae.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.xpath(elem['xpathDataNasc' + ext]).invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage(item).dataNascimento);
        cy.xpath(elem['xpathCPF' + ext]).invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage(item).documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
        cy.xpath(elem['xpathRG' + ext]).invoke('text')
            .should('eq', Cypress.env('rg'));
        cy.xpath(elem['xpathEmail' + ext]).invoke('text')
            .should('eq', Cypress.env('emailAndre'));
        cy.xpath(elem['xpathCelular' + ext]).invoke('text')
            .should('eq', lStorage.obterObjetoLocalStorage('preBenef').cel);
        cy.xpath(elem['xpathAdesao' + ext]).invoke('text')
            .should('eq', 'Boleto - (deve ser encaminhado junto com o contrato)');
        cy.xpath(elem['xpathMensal' + ext]).invoke('text')
            .should('eq', 'Débito automático');
    }

    validarStatusPendente() {
        if (lStorage.obterObjetoLocalStorage('preBenef').nomeSocial !== "") {
            cy.xpath(elem.xpathStatusAssinatura).invoke('text')
                .should('eq', 'Pendente de envio');
        } else {
            cy.xpath(elem.xpathStatusAssinaturaSemNomeSocial).invoke('text')
                .should('eq', 'Pendente de envio');
        }
    }

    solicitarAssinaturaDigital() {
        let idPreBenef = lStorage.obterObjetoLocalStorage('idPreBenef');
        let siteAssinaturaDigital = Cypress.env('siteAssinaturaDigital');
        cy.get(elem.botaoAssinaturaDigital).click();
        homePortal.validarAcesso();
        cy.visit(`${siteAssinaturaDigital}${idPreBenef}`)
    }

    trocarStatus() {
        let idPreBenef = lStorage.obterObjetoLocalStorage('idPreBenef');
        let status = "CONCLUIDO";
        let statusEnviado = "ENVIADO";
        cy.task('executeDbStatement', {
            statement: `update vendas.info_documento_venda_envelope set STATUS = '` + status + `' where ID_PRE_BENEFICIARIO=${idPreBenef} AND STATUS='` + `${statusEnviado}'`,
        })
        cy.reload();
        if(lStorage.obterObjetoLocalStorage('preBenef').nomeSocial !== ""){
        cy.xpath(elem.xpathStatusAssinatura).invoke('text')
            .should('eq', status);
    } else{
        cy.xpath(elem.xpathStatusAssinaturaSemNomeSocial).invoke('text')
        .should('eq', status);
    }
}

    gerarBoleto(directory) {
        cy.get(elem.botaoPrint).click();
        cy.get(elem.iframeBoleto).then(($iframe) => {

            const iframe = $iframe.contents();
            cy.stub(iframe[0].defaultView, 'print').as('printStub');
        });

        cy.get('@printStub').should('not.be.called');

        cy.wait(4000);
        printDaTela.documentos(directory);
        cy.get(elem.elementoIframe)
            .within(() => {
                return cy.get(elem.subElementoIframe).should('have.class', elem.botaoFecharIframe)
                    .last()
                    .click();
            })
        cy.wait(2000);
    }

    botaoAvancar() {
        cy.get(elem.botaoAvancar).click();
    }

    mensagemErroOculta() {
        cy.get(elem.mensagemErro).should('not.exist');
    }

    mensagemErroPendenteEnvio() {
        this.botaoAvancar();
        cy.get(elem.mensagemErro).should('be.visible');
        cy.get(elem.mensagemErro).invoke('text')
            .should('eq', elem.textoErroSemAssinatura);
        cy.get(elem.mensagemErroBotaoFechar).click();
    }

    mensagemErroStatusEnviado() {
        if(lStorage.obterObjetoLocalStorage('preBenef').nomeSocial !== ""){
        cy.xpath(elem.xpathStatusAssinatura).invoke('text')
            .should('eq', 'ENVIADO');
        }else{
            cy.xpath(elem.xpathStatusAssinaturaSemNomeSocial).invoke('text')
            .should('eq', 'ENVIADO');
        }
        this.botaoAvancar();
        cy.get(elem.mensagemErro).should('be.visible');
        cy.get(elem.mensagemErro).invoke('text')
            .should('eq', elem.textoErroSemAssinatura);
        cy.get(elem.mensagemErroBotaoFechar).click();
    }

    mensagemErroBoleto() {
        this.botaoAvancar();
        cy.get(elem.mensagemErro).should('be.visible');
        cy.get(elem.mensagemErro).invoke('text')
            .should('eq', elem.textoErroBoleto);
        cy.get(elem.mensagemErroBotaoFechar).click();
    }

}

export default new AssinaturaDigital();