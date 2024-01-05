const elem = require('./elements').ELEMENTS;
import printDaTela from '../parametrosPrints/';
import preCadastro from "../preCadastro/";
import lStorage from '../localStorage';
import homePortal from '../homePortal';

class AssinaturaDigital {

    validarAcesso() {
        cy.contains(elem.titulo).should('be.visible');
    }

    validarDadosBeneficiarioNotRF() {
        cy.xpath(elem.xpathNomeBenef).invoke('text')
            .should('eq', preCadastro.obterObjetoLocalStorage().nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.xpath(elem.xpathNomeMae).invoke('text')
            .should('eq', preCadastro.obterObjetoLocalStorage().nomeMae.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.xpath(elem.xpathDataNasc).invoke('text')
            .should('eq', Cypress.env('dtNasc'));
        cy.xpath(elem.xpathCPF).invoke('text')
            .should('eq', preCadastro.obterObjetoLocalStorage().cpf.comMascara);
    }

    validarDadosBeneficiarioNotRFSemNomeSocial() {
        cy.xpath(elem.xpathNomeBenefSemNomeSocial).invoke('text')
            .should('eq', preCadastro.obterObjetoLocalStorage().nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.xpath(elem.xpathNomeMaeSemNomeSocial).invoke('text')
            .should('eq', preCadastro.obterObjetoLocalStorage().nomeMae.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.xpath(elem.xpathDataNascSemNomeSocial).invoke('text')
            .should('eq', Cypress.env('dtNasc'));
        cy.xpath(elem.xpathCPFSemNomeSocial).invoke('text')
            .should('eq', preCadastro.obterObjetoLocalStorage().cpf.comMascara);
    }

    validarDadosBeneficiarioReceita() {
        cy.xpath(elem.xpathNomeBenef).invoke('text')
            .should('eq', preCadastro.obterReceitaLocalStorage().nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.xpath(elem.xpathNomeMae).invoke('text')
            .should('eq', preCadastro.obterReceitaLocalStorage().nomeMae.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.xpath(elem.xpathDataNasc).invoke('text')
            .should('eq', preCadastro.obterReceitaLocalStorage().dataNascimento);
        cy.xpath(elem.xpathCPF).invoke('text')
            .should('eq', preCadastro.obterReceitaLocalStorage().documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
    }

    validarDadosBeneficiarioReceitaSemNomeSocial() {
        cy.xpath(elem.xpathNomeBenefSemNomeSocial).invoke('text')
            .should('eq', preCadastro.obterReceitaLocalStorage().nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.xpath(elem.xpathNomeMaeSemNomeSocial).invoke('text')
            .should('eq', preCadastro.obterReceitaLocalStorage().nomeMae.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.xpath(elem.xpathDataNascSemNomeSocial).invoke('text')
            .should('eq', preCadastro.obterReceitaLocalStorage().dataNascimento);
        cy.xpath(elem.xpathCPFSemNomeSocial).invoke('text')
            .should('eq', preCadastro.obterReceitaLocalStorage().documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
    }

    validarDadosBeneficiario() {
        cy.xpath(elem.xpathNomeSocial).invoke('text')
            .should('eq', preCadastro.obterObjetoLocalStorage().nomeSocial.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase());
        cy.xpath(elem.xpathRG).invoke('text')
            .should('eq', Cypress.env('rg'));
        cy.xpath(elem.xpathEmail).invoke('text')
            .should('eq', Cypress.env('emailAndre'));
        cy.xpath(elem.xpathCelular).invoke('text')
            .should('eq', preCadastro.obterObjetoLocalStorage().cel);
        cy.xpath(elem.xpathAdesao).invoke('text')
            .should('eq', 'Boleto - (deve ser encaminhado junto com o contrato)');
        cy.xpath(elem.xpathMensal).invoke('text')
            .should('eq', 'Débito automático');
    }
    validarDadosBeneficiarioSemNomeSocial() {
        cy.xpath(elem.xpathRGSemNomeSocial).invoke('text')
            .should('eq', Cypress.env('rg'));
        cy.xpath(elem.xpathEmailSemNomeSocial).invoke('text')
            .should('eq', Cypress.env('emailAndre'));
        cy.xpath(elem.xpathCelularSemNomeSocial).invoke('text')
            .should('eq', preCadastro.obterObjetoLocalStorage().cel);
        cy.xpath(elem.xpathAdesaoSemNomeSocial).invoke('text')
            .should('eq', 'Boleto - (deve ser encaminhado junto com o contrato)');
        cy.xpath(elem.xpathMensalSemNomeSocial).invoke('text')
            .should('eq', 'Débito automático');
    }
    validarStatusPendente() {
        cy.xpath(elem.xpathStatusAssinatura).invoke('text')
            .should('eq', 'Pendente de envio');
    }

    validarStatusPendenteSemNomeSocial() {
        cy.xpath(elem.xpathStatusAssinaturaSemNomeSocial).invoke('text')
            .should('eq', 'Pendente de envio');
    }


    solicitarAssinaturaDigital() {
        let idPreBenef = lStorage.ObterIdPreBenef();
        let siteAssinaturaDigital = Cypress.env('siteAssinaturaDigital');
        cy.get(elem.botaoAssinaturaDigital).click();
        homePortal.validarAcesso();
        cy.visit(`${siteAssinaturaDigital}${idPreBenef}`)
    }

    trocarStatus() {
        let idPreBenef = lStorage.ObterIdPreBenef();
        let status = "CONCLUIDO";
        let statusEnviado = "ENVIADO";
        cy.task('executeDbStatement', {
            statement: `update vendas.info_documento_venda_envelope set STATUS = '` + status + `' where ID_PRE_BENEFICIARIO=${idPreBenef} AND STATUS='` + `${statusEnviado}'`,
        })
        cy.reload();
        cy.xpath(elem.xpathStatusAssinatura).invoke('text')
            .should('eq', status);
    }

    trocarStatusSemNomeSocial() {
        let idPreBenef = lStorage.ObterIdPreBenef();
        let status = "CONCLUIDO";
        let statusEnviado = "ENVIADO";
        cy.task('executeDbStatement', {
            statement: `update vendas.info_documento_venda_envelope set STATUS = '` + status + `' where ID_PRE_BENEFICIARIO=${idPreBenef} AND STATUS='` + `${statusEnviado}'`,
        })
        cy.reload();
        cy.xpath(elem.xpathStatusAssinaturaSemNomeSocial).invoke('text')
            .should('eq', status);
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
        cy.xpath(elem.xpathStatusAssinatura).invoke('text')
            .should('eq', 'ENVIADO');
        this.botaoAvancar();
        cy.get(elem.mensagemErro).should('be.visible');
        cy.get(elem.mensagemErro).invoke('text')
            .should('eq', elem.textoErroSemAssinatura);
        cy.get(elem.mensagemErroBotaoFechar).click();
    }

    mensagemErroStatusEnviadoSemNomeSocial() {
        cy.xpath(elem.xpathStatusAssinaturaSemNomeSocial).invoke('text')
            .should('eq', 'ENVIADO');
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