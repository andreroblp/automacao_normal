const elem = require('./elements').ELEMENTS;
import lStorage from '../localStorage'

class EnderecoItinerario{

    validarAcesso(){
        cy.contains(elem.titulo).should('be.visible')
    }

    inserirData(){
        let hoje = new Date();
        let dia = ("0" + hoje.getDate()).slice(-2)
        let mes = ("0" + (hoje.getMonth() + 1)).slice(-2)
        let ano = hoje.getFullYear();
        let dataCompleta = dia + mes + ano.toString();
        cy.get(elem.dataItinerario).clear().type( '{home}')
        cy.get(elem.dataItinerario).type(dataCompleta).should('have.value',
        dataCompleta.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3'))
    }

    carregarEndereco(){
        cy.get(elem.cep).should('be.empty');
        cy.get(elem.checkBoxEnd).check({force: true});
        cy.get(elem.cep).should('have.value', lStorage.obterObjetoLocalStorage('preBenef').endereco.cep)
    }

    selecionarZona(){
        cy.get(elem.zona).select('NORTE')
        cy.get(elem.zona + ' option:selected').invoke('text')
        .should('eq', 'NORTE')
    }

    clicarBotaoAvancar(){
        cy.get(elem.botao).should('be.visible').click()
    }
}

export default new EnderecoItinerario();