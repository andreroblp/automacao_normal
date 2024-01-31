import geradorNumero from './geradorNumero'

var agencia = '';
var banco = '';
var nome = ';'

export default async function gerarDadosBancarios() {
    await gerarBancoAgencia();
    return {
        "agencia" : agencia,
        "banco" : banco,
        "contaCorrente": gerarContaCorrente(),
        "nome" : nome,
    }
}

async function gerarBancoAgencia() {
    const $teste = await cy.task('executeDbStatement', {
        statement: `SELECT * FROM (SELECT AGENCIA, BANCO, NOME FROM CORPORATIVO.AGENCIA_DEBITO_AUTOMATICO ada INNER JOIN CORPORATIVO.BANCO_DEBITO_AUTOMATICO bda ON 
          bda.id = ada.id_banco
          ORDER BY dbms_random.value) 
          where ROWNUM <= 1`,
    });
    agencia = $teste.rows[0].AGENCIA;
    banco = $teste.rows[0].BANCO;
    nome = $teste.rows[0].NOME;
}

function gerarContaCorrente() {
    let numero = "";
    let quant = geradorNumero(6, 11);
    for (let x = 0; x < quant; x++) {
        numero += geradorNumero(0, 9)
    }
    var regex = new RegExp(`(\\d{${quant - 1}})(\\d{1})`)
    return numero.replace(regex, '$1-$2');

}
