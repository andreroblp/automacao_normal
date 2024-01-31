import gerarNumero from "./geradorNumero";
let cep;
let tipoL;
let logradouro;
let logradouroFull;
let bairro;
let bairroFull;
let cidade;
let cidadeFull;
let uf;
let ibge;

export default async function gerarDadosBancarios() {
  await gerarCep();
  
  return {
    "cep": cep.replace(/(\d{5})(\d{3})/, "$1-$2"),
    'tipoL' : tipoL,
    "logradouro" : logradouro,
    "logradouroInteiro" : logradouroFull,
    "numero" : gerarNumero(1,9999),
    "bairro" : bairro,
    "bairroInteiro" : bairroFull,
    "cidade" : cidade,
    "cidadeInteiro" : cidadeFull,
    "uf" : uf,
    "complemento" : complemento[gerarNumero(0,3)],
    "ibge" : ibge,
  };
}

function gerarCep() {
  return new Promise((resolve, reject) => {
    cy.task('executeDbStatement', {
      statement: `SELECT * FROM(
        SELECT c.numero AS CEP, 
        tl.NOME AS TIPO_LOGRADOURO, 
        l.NOME AS LOGRADOUROFULL, 
        l.NOME_ABREVIADO_SEM_TIPO_LOGR AS LOGRADOURO,
        b.NOME AS BAIRROFULL, 
        b.NOME_ABREVIADO AS BAIRRO,
        l2.NOME AS CIDADEFULL,
        l2.NOME_ABREVIADO AS CIDADE,
        l2.SIGLA_UNIDADE_FEDERAL AS ESTADO,
        l2.CODIGO_MUNICIPIO_IBGE AS IBGE
        FROM  CORPORATIVO.CEP c 
        INNER JOIN CORPORATIVO.LOGRADOURO l ON l.NUMERO_CEP = c.NUMERO 
        INNER JOIN corporativo.TIPO_LOGRADOURO tl ON tl.ID = l.ID_TIPO_LOGRADOURO
        INNER JOIN CORPORATIVO.BAIRRO b ON b.ID = l.ID_BAIRRO 
        INNER JOIN corporativo.LOCALIDADE l2 ON l2.ID = b.ID_LOCALIDADE 
        WHERE c.NUMERO_TIPO_CEP = 1
        ORDER BY dbms_random.value) 
        WHERE ROWNUM <=1`,
    })
      .then((resposta) => {
        if (resposta && resposta.rows && resposta.rows.length > 0) {
          cep = resposta.rows[0].CEP;
          tipoL = resposta.rows[0].TIPO_LOGRADOURO;
          logradouroFull = resposta.rows[0].LOGRADOUROFULL;
          logradouro = resposta.rows[0].LOGRADOURO;
          bairroFull = resposta.rows[0].BAIRROFULL;
          bairro = resposta.rows[0].BAIRRO;
          cidadeFull = resposta.rows[0].CIDADEFULL;
          cidade = resposta.rows[0].CIDADE;
          uf = resposta.rows[0].ESTADO;
          ibge = resposta.rows[0].IBGE;
          resolve(); // Resolve a promessa após obter o CEP
        } else {
          console.error('CEP não encontrado ou resposta inválida:', resposta);
          reject(new Error('CEP não encontrado ou resposta inválida'));
        }
      })
  });
}
var bloco = ['A', 'B', 'C', 'D', 'E', 'F']
var complemento = ['', 'Ap' + gerarNumero(0,129) + ' ' + bloco[gerarNumero(0,5)] , 'CASA ' + gerarNumero(0,8), 'FUNDOS ' + gerarNumero(0,4)]
