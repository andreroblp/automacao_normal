const elem = require('../preCadastro/elements').ELEMENTS;

class PreCadastro {

    armazenarLocalStorage() {
        let myObj = elem.pessoa;
        var jsonAux = JSON.stringify(myObj);
        localStorage.setItem('key', jsonAux);
    }

    preencherDados() {
        var jsonBenef = window.localStorage.getItem('key')
        var benef = JSON.parse(jsonBenef);

        cy.get(elem.nome).clear().type(benef.nome);
        cy.get(elem.cpf).type(benef.cpf);
    }
}
export default new PreCadastro();