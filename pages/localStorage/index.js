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
}

export default new LocalStorage();