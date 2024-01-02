import cpf from './geradorCpf.js'
import cns from './geradorCNS.js'
import cel from './geradorCelular.js'
import nome from './geradorNome.js'
import gerarNumero from './geradorNumero.js'



function gerarNomeMasculino() {
    return {
        "nome": nome(true, "M", false),
        "sexo": "Masculino",
        "cpf": cpf(),
        "cns": cns(),
        "cel": cel(),
        "estadoCivil": estadoCivil[gerarNumero(8)],
        "nomeMae": nome(true, "F", false)
    };
}

function gerarNomeFeminino() {
    return {
        "nome": nome(true, "F", false),
        "sexo": "Feminino",
        "cpf": cpf(),
        "cns": cns(),
        "cel": cel(),
        "estadoCivil": estadoCivil[gerarNumero(8)],
        "nomeMae": nome(true, "F", false),
    };
}

function gerarNomeMasculinoComNomeSocial(nomeSocial) {
    return {
        "nome": nome(true, "M", false),
        "sexo": "Masculino",
        "cpf": cpf(),
        "cns": cns(),
        "cel": cel(),
        "nomeSocial": nome(nomeSocial, "F", false),
        "generoSocial": "Feminino",
        "estadoCivil": estadoCivil[gerarNumero(8)],
        "nomeMae": nome(true, "F", false),
    };
}

function gerarNomeFemininoComNomeSocial(nomeSocial) {
    return {
        "nome": nome(true, "F", false),
        "sexo": "Feminino",
        "cpf": cpf(),
        "cns": cns(),
        "cel": cel(),
        "nomeSocial": nome(nomeSocial, "M", false),
        "generoSocial": "Masculino",
        "estadoCivil": estadoCivil[gerarNumero(8)],
        "nomeMae": nome(true, "F", false),
    };
}

function gerarNomeMasculinoComNomeSocialSemGenero(nomeSocial) {
    return {
        "nome": nome(true, "M", false),
        "sexo": "Masculino",
        "cpf": cpf(),
        "cns": cns(),
        "cel": cel(),
        "nomeSocial": nome(nomeSocial, "F", false),
        "generoSocial": "Nenhum",
        "estadoCivil": estadoCivil[gerarNumero(8)],
        "nomeMae": nome(true, "F", false),
    };
}

function gerarNomeFemininoComNomeSocialSemGenero(nomeSocial) {
    return {
        "nome": nome(true, "F", false),
        "sexo": "Feminino",
        "cpf": cpf(),
        "cns": cns(),
        "cel": cel(),
        "nomeSocial": nome(nomeSocial, "M", false),
        "generoSocial": "Nenhum",
        "estadoCivil": estadoCivil[gerarNumero(8)],
        "nomeMae": nome(true, "F", false),
    };
}

export default function gerarPessoa(tipoPessoa, temNomenomeSocial, temGeneroSocial) {
    if (tipoPessoa === 0) {
        tipoPessoa = Math.floor(Math.random() * 2) + 1;
    }

    if (tipoPessoa === 1) {
        if (temNomenomeSocial === false && temGeneroSocial === false) {
            return gerarNomeMasculino();
        } else if (temGeneroSocial === true) {
            return gerarNomeMasculinoComNomeSocial(temNomenomeSocial);
        } else {
            return gerarNomeMasculinoComNomeSocialSemGenero(temNomenomeSocial);
        }
    } else {
        if (temNomenomeSocial === false && temGeneroSocial === false) {
            return gerarNomeFeminino();
        } else if (temGeneroSocial === true) {
            return gerarNomeFemininoComNomeSocial(temNomenomeSocial);
        } else {
            return gerarNomeFemininoComNomeSocialSemGenero(temNomenomeSocial);
        }
    }
};

var estadoCivil = ['Solteiro(a)', 'Casado(a)', 'Separado(a)', 'Divorciado(a)', 'Viuvo(a)', 'Marital', 'Desquitado', 'Não informado', 'União estável'];