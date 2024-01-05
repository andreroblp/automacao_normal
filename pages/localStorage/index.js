const elem = require('./elements').ELEMENTS;

class LocalStorage{

    ObterIdPreBenef() {
        var jsonBenef = window.localStorage.getItem(elem.idPreBenef);
        var idUsuario = JSON.parse(jsonBenef);
        return idUsuario;
    }

    obterTicket(){
        var jsonBenef = window.localStorage.getItem(elem.ticket)
        var ticketPortal = JSON.parse(jsonBenef); 
        return ticketPortal;
    }

    obterPessoaPreBenef() {
        var jsonBenef = window.localStorage.getItem(elem.preBenef)
        let benef = JSON.parse(jsonBenef);
        return benef
    }
}

export default new LocalStorage();