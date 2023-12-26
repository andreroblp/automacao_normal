const elem = require('./elements').ELEMENTS;

class EnvioArquivo {

    validarAcessoPagina(){
        cy.contains(elem.titulo).should('be.visible');
    }
    
    selecionarArquivo(){
    cy.get(elem.botaoSelecaoArquivo).as('fileInput');
    cy.get(elem.alias).attachFile(elem.arquivo);
    }

    verificarMensagemSucesso(){
        cy.get(elem.notificacao).should('be.visible');
    }

    avancarParaDeclaracaoSaude(){
        cy.get(elem.botaoAvancar).click();
    }
}

export default new EnvioArquivo();