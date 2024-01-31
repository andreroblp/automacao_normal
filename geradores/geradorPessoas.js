import cpf  from './geradorCpf.js'
import cns  from './geradorCNS.js'
import cel  from './geradorCelular.js'
import nome from  './geradorNome.js'
import estCivil from './gerarEstadoCivil.js'
import gerarNumero from './geradorNumero.js'
import {GENEROS} from './genero.js'
import gerarDadosBancarios from './geradorDadosBancario.js'
import gerarEndereco from './geradorEndereco.js'
import gerarDataNascimento from './geradorNascimento.js'
import gerarRG from './geradorRG.js'

async function gerarDadosPessoa(sexo,temNomeSocial, temGeneroSocial) {
 
    return {
        "nome": (sexo === GENEROS.MASCULINO) ? nome("M", false) : nome("F", false),
        "sexo": (sexo === GENEROS.MASCULINO) ? "Masculino" : "Feminino",
        "documento": cpf(),
        "cns": cns(),
        "cel": cel(),
        "estadoCivil": estCivil(),
        "nomeMae": nome(true, "F", false),
        "nomeSocial" : (temNomeSocial === false) ? "" : (sexo === GENEROS.FEMININO) ? nome("M", true) : nome("F", true),
        "generoSocial" : (temGeneroSocial === false) ? "Nenhum" : (sexo === GENEROS.FEMININO) ? "Masculino" : "Feminino",
        "dataNascimento" : gerarDataNascimento(),
        "dadosBanco" : await gerarDadosBancarios(),
        "endereco" : await gerarEndereco(),
        "rg" : gerarRG()
    };
}

export default async function gerarPessoa(tipoPessoa, temNomeSocial, temGeneroSocial) {
    if (tipoPessoa === GENEROS.ESCOLHER) {
        tipoPessoa = gerarNumero(1,2)
    }
    return await gerarDadosPessoa(tipoPessoa, temNomeSocial, temGeneroSocial)
}