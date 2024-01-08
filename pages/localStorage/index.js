const elem = require('./elements').ELEMENTS;

class LocalStorage {

    obterObjetoLocalStorage(item) {
        var jsonBenef = window.localStorage.getItem(elem[item]);
        return  JSON.parse(jsonBenef);
    }

    armazenarLocalStorage(objeto, item) {
        const sim = "Sim";
        const nao = "Não";
        let objetoPreBenef = objeto;
        var jsonAux = JSON.stringify(objetoPreBenef);
        localStorage.setItem(elem[item], jsonAux);

        if(objeto.nomeSocial !== ""){
            let objetoSim = sim;
            var jsonAux = JSON.stringify(objetoSim);
            localStorage.setItem('temNomeSocial', jsonAux);
        } else{
            let objetoNao = nao;
            var jsonAux = JSON.stringify(objetoNao);
            localStorage.setItem('temNomeSocial', jsonAux);
        }
    }
}

export default new LocalStorage();