const elem = require('./elements').ELEMENTS;

class LocalStorage {

    obterObjetoLocalStorage(item) {
        var jsonBenef = window.localStorage.getItem(elem[item]);
        return  JSON.parse(jsonBenef);
    }

    async armazenarLocalStorage(objeto, item) {
        let objetoPreBenef = objeto;
        var jsonAux = JSON.stringify(objetoPreBenef);
        localStorage.setItem(elem[item], jsonAux);
    }
}

export default new LocalStorage();