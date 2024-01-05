const elem = require('./elements').ELEMENTS;

class AgendamentoAssinatura{

    validarAcesso(){
        cy.contains(elem.titulo).should('be.visible');
    }

    validarAcessoCorretora(){
        cy.contains(elem.tituloCorretora).should('be.visible');
    }

    selecionarArrastarDataAssinatura(){
        cy.get(elem.elementoAssinatura).click();
    }

    validarOpcaoSelecionada(){
        cy.get(elem.contratoDropMenu + ' option:selected').invoke('text').then(($opcao) => {
            if($opcao.match('Agendar assinatura')){
                cy.get(elem.contratoDropMenu).select('Assinatura no local da venda')
            }
        })
    }

    selecionarDiaVencimento(){
        cy.get(elem.diaCheckbox).click({ force: true }).should('be.checked');
        cy.wait(2000);
    }

    salvarAvancar(){
        cy.get(elem.botaoSalvar).click();
    }

    salvarAvancarCorretora(){
        cy.get(elem.botaoSalvarCorretora).click();
    }
}

export default new AgendamentoAssinatura();