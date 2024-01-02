const elem = require('../formularioContato/elements').ELEMENTS;
const elemNovaVenda = require('../novaVenda/elements').ELEMENTS;

class Formulario {

    verificarTela() {
        cy.contains(elem.nomeCabecalho).should('be.visible');
    }

    verificarCampoNome() {
        cy.get(elem.nome).should('have.value', elemNovaVenda.nomeEntrada.toUpperCase());
    }

    preencherDados() {
        cy.get(elem.celular).clear().type('11111111111').should('have.value', '(11) 11111-1111');
        cy.get(elem.idade).clear().type('33').should('have.value', '33');
        cy.get(elem.conheceu).select(elem.opcaoComoConheceu).invoke('val').should('eq', elem.valueConheceu);
        cy.get(elem.parentesco).select(elem.opcaoParentesco).invoke('val').should('eq', elem.valueParentesco);
        cy.get(elem.propaganda).invoke('show').check('1');
        cy.get(elem.propaganda)
            .invoke('hide');
        cy.get(elem.historico).type('Teste');
    }

    preencherDadosCorretora(){
            cy.get(elem.celular).clear().type('11111111111').should('have.value', '(11) 11111-1111');
            cy.get(elem.idade).clear().type('33').should('have.value', '33');
        }

    iniciarVenda(){
        cy.get(elem.botaoIniciarVenda).click();
    }
}

export default new Formulario();