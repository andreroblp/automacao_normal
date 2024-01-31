import geradorNumero from './geradorNumero.js'

let numeroString = '';

export default function gerarDocumentoRG(){

    return {
        numero: gerarNumero(),
        orgaoEmissor : gerarOrgaoEmissor(),
        ufEmissor : gerarUF()
    }
}

function gerarNumero(){
    numeroString = '';
    var numero = [];
    var soma = 0;
    for(let x=9; x>=2; x--){
        numero[9-x] = geradorNumero(0,9)

        soma += numero[9-x] * x;
    }
    soma % 11 === 10 ? numero[8] = 'X' : numero[8] = soma%11;
    console.log(soma)
    console.log(soma%11)
    numero.forEach(formar)
    return numeroString;
}

function formar(item){
    numeroString += item.toString()
}

function gerarOrgaoEmissor(){
    return orgaoEmissor[geradorNumero(0,31)][geradorNumero(0,5)];
}

function gerarUF(){
    return uf[geradorNumero(0,26)];
}

var orgaoEmissor = [['Academia Brasileira de Neurocirurgia-ABNC','Advocacia-Geral da União-AGU','Agência Nacional de Aviação Civil-ANAC','Clube de Aeronáutica-CAER','Conselho de Arquitetura e Urbanismo-CAU','Corpo de Bombeiro Militar-CBM'],
['Conselho Federal Administração-CFA','Conselho Federal de Biblioteconomia-CFB','Conselho Federal de Biologia-CFBIO','Conselho Federal de Biomedicina-CFBM','Conselho Federal de Contabilidade-CFC','Conselho Federal de Serviço Social-CFESS'],
['Conselho Regional de Farmácia-CFF','Conselho Federal de Fonoaudiologia-CFFA','Conselho Federal de Medicina-CFM','Conselho Federal de Medicina Veterinária-CFMV','Conselho Federal de Nutrição-CFN','Conselho Federal de Odontologia-CFO'],
['Conselho Federal de Psicologia-CFP','Conselho Regional de Química-CFQ','Conselho Federal dos Técnicos Industriais-CFT','Conselho Federal dos Técnicos Agrícolas-CFTA','Coordenação Geral de Privilégios e Imunidades-CGPI','Coordenadoria Geral de Polícia Marítima,  Aeronáutica e de Fronteiras-CGPMAF'],
['Centro de Inteligência da Polícia Civil-CIPC','Conselho Nacional de Imigração-CNIG','Confederação Nacional do Transporte-CNT','Confederação Nacional de Vigilantes  de Serviços-CNTV','Conselho Federal de Corretores de Imóveis-COFECI','Conselho Federal de Economia-COFECON'],
['Conselho Federal de Museologia-COFEM','Conselho Federal de Enfermagem-COFEN','Conselho Regional de Fisioterapia e Terapia Ocupacional-COFFITO','Comando da Aeronáutica-COMAER','Conselho Federal de Estatística-CONFE','Conselho Federal de Engenharia e Agronomia-CONFEA'],
['Conselho Federal de Educação Física-CONFEF','Conselho Federal dos Representantes Comerciais-CONFERE','Conselho Regional de Estatística-CONRE','Conselho Federal de Profissionais de Relações Públicas-CONRERP','Conselho Regional dos Representantes Comerciais-CORE','Conselho Regional de Economia-CORECON'],
['Conselho Regional de Museologia-COREM','Conselho Regional de Enfermagem-COREN','Conselho Regional de Administração-CRA','Centro de Referência de Assistência Social-CRAS','Conselho Regional de Biblioteconomia-CRB','Conselho Regional de Biomedicina-CRBM'],
['Conselho Regional de Contabilidade-CRC','Conselho Regional de Engenharia e Agronomia-CREA','Conselho Regional de Corretores de Imóveis-CRECI','Conselho Regional de Educação Física-CREF','Conselho Regional de Fisioterapia e Terapia Ocupacional-CREFITO','Conselho Regional de Serviço Social-CRESS'],
['Conselho Regional de Farmácia-CRF','Conselho Regional de Fonoaudiologia-CRFA','Conselho Regional de Medicina-CRM','Conselho Regional de Medicina Veterinária-CRMV','Conselho Regional de Nutrição-CRN','Conselho Regional de Odontologia-CRO'],
['Conselho Regional de Psicologia-CRP','Conselho Regional de Profissionais de Relações Públicas-CRPRE','Conselho Regional de Química-CRQ','Conselho Regional dos Técnicos Industriais-CRT','Conselho Regional de Técnicos de Administração-CRTA','Carteira de Trabalho e Previdência Social-CTPS'],
['Cartório Civil-CV','Delegacia de Polícia de Imigração-DELEMIG','Departamento Estadual de Trânsito-DETRAN','Diretoria Geral da Polícia Civil-DGPC','Diretoria de Identificação Civil-DIC','Diretoria de Identificação Civil e Criminal-DICC'],
['Diretoria Executiva-DIREX','Departamento de Polícia Federal-DPF','Divisão de Polícia Marítima,  Aérea e de Fronteiras-DPMAF','Departamento de Polícia Técnica Geral-DPT','Departamento de Polícia Técnico Científica-DPTC','Delegacia Regional Executiva-DREX'],
['Delegacia Regional do Trabalho-DRT','Exército Brasileiro-EB','Força Aérea Brasileira-FAB','Federação Nacional dos Jornalistas-FENAJ','Fundo de Garantia do Tempo de Serviço-FGTS','Fundação Instituto de Pesquisas Econômicas-FIPE'],
['Fundação Lyndolpho Silva-FLS','Fundação Nacional do Índio-FUNAI','Gerência de Estado de Justiça,  Segurança Pública e Cidadania-GEJSP','Gerência de Estado de Justiça,  Segurança Pública e Cidadania-GEJSPC','Gerência de Estado de Justiça,  Segurança Pública e Cidadania-GEJUSPC','Gerência de Estado de Segurança Pública-GESP'],
['Governo do Estado de Goiás-GOVGO','Carteira de Identidade Classista-I CLA','Instituto de Polícia Científica-ICP','Instituto de Identificação Dr. Aroldo Mendes Paiva-IDAMP','Instituto Félix Pacheco-IFP','Instituto Geral de Perícias-IGP'],
['Instituto de Identificação Aderson Conceição de Melo-IIACM','Instituto de Identificação Civil e Criminal-IICC','Instituto de Identificação Civil e Criminal Engrácia da Costa Francisco-IICCECF','Instituto de Identificação Carlos Menezes-IICM','Instituto de Identificação Gonçalo Pereira-IIGP','Instituto de Identificação João de Deus Martins-IIJDM'],
['Instituto de Identificação da Polícia Civil-IIPC','Instituto de Identificação Pedro Mello-IIPM','Instituto de Identificação Ricardo Gumbleton Daunt-IIRGD','Instituto de Identificação Raimundo Hermínio de Melo-IIRHM','Instituto de Identificação Tavares Buril-IITB','Instituto Médico-Legal-IML'],
['Instituto Nacional de Identificação-INI','Instituto Pereira Faustino-IPF','Instituto Técnico-Científico de Perícia-ITCP','Instituto Técnico-Científico de Perícia-ITEP','Ministério da Aeronáutica-MAER','Marinha do Brasil-MB'],
['Ministério da Defesa-MD','Ministério da Cidadania-MDS','Ministério da Educação e Cultura-MEC','Ministério do Exército-MEX','Ministério da Defesa-MINDEF','Ministério da Justiça-MJ'],
['Ministério da Marinha-MM','Ministério da Marinha-MMA','Ministério da Previdência e Assistência Social-MPAS','Ministério Público Estadual-MPE','Ministério Público Federal-MPF','Ministério Público do Trabalho-MPT'],
['Ministério das Relações Exteriores-MRE','Ministério do Trabalho-MT','Ministério da Economia-MTE','Ministério do Trabalho e Previdência Social-MTPS','Núcleo de Polícia de Imigração-NUMIG','Ordem dos Advogados do Brasil-OAB'],
['Ordens dos Músicos do Brasil-OMB','Polícia Civil-PC','Polícia Federal-PF','Procuradoria Geral da Fazenda Nacional-PGFN','Polícia Militar-PM','Perícia Oficial e Identificação Técnica-POLITEC'],
['Polícia Rodoviária Federal-PRF','Polícia Tecnico-Científica-PTC','Secretaria de Estado da Casa Civil-SCC','Secretaria Coordenadora de Justiça e Defesa Social-SCJDS','Secretaria de Defesa Social-SDS','Secretaria de Estado da Casa Civil-SECC'],
['Secretaria de Estado da Casa Civil e Desenvolvimento Econômico-SECCDE','Secretaria de Estado da Defesa Social-SEDS','Secretaria de Estado da Segurança Pública e da Defesa Social-SEGUP','Secretaria de Estado de Justiça e Segurança Pública-SEJSP','Secretaria de Estado da Justica-SEJUC','Secretaria de Estado de Justiça e Segurança Pública-SEJUSP'],
['Secretaria de Estado da Polícia Civil-SEPC','Secretaria de Estado da Segurança-SES','Secretaria de Estado da Segurança e Cidadania-SESC','Secretaria de Estado da Segurança,  Defesa e Cidadania-SESDC','Secretaria de Estado da Segurança,  Defesa e Cidadania-SESDEC','Secretaria Estadual de Segurança-SESEG'],
['Secretaria de Estado da Segurança Pública-SESP','Secretaria de Estado da Segurança Pública e Administração Penitenciária-SESPAP','Secretaria de Estado de Segurança Publica e Defesa do Cidadão-SESPDC','Secretaria de Estado de Segurança Pública e Defesa Social-SESPDS','Superintendência Geral de Polícia Civil-SGPC','Superintendência Geral de Polícia Judiciária-SGPJ'],
['Serviço de Identificação da Marinha-SIM','Secretaria da Justiça-SJ','Secretaria da Justiça e dos Direitos Humanos-SJCDH','Secretaria Coordenadora de Justiça e Defesa Social-SJDS','Secretaria da Justiça e Segurança-SJS','Secretaria da Justiça do Trabalho e Cidadania-SJTC'],
['Secretaria da Justiça do Trabalho e Segurança-SJTS','Secretaria Nacional de Justiça / Departamento de Estrangeiros-SNJ','Serviço de Polícia Marítima,  Aérea e de Fronteiras-SPMAF','Secretaria de Polícia Técnico-Científica-SPTC','Superintendência Regional do Departamento de Polícia Federal-SRDPF','Receita Federal-SRF'],
['Superintendência Regional do Trabalho-SRTE','Secretaria da Segurança,  Defesa e Cidadania-SSDC','Secretaria da Segurança e da Defesa Social-SSDS','Secretaria de Segurança e Informações-SSI','Secretaria de Segurança Pública-SSP','Secretaria de Segurança Pública e Coordenadoria Geral de Perícias-SSPCGP'],
['Secretaria de Segurança Pública e Defesa do Cidadão-SSPDC','Secretaria de Segurança Pública e Defesa Social-SSPDS','Secretaria de Segurança Pública Polícia Civil-SSPPC','Superintendência de Seguros Privados-SUSEP','Superintendência dos Serviços Penitenciários-SUSEPE','Tribunal de Justiça-TJ'],
['Tribunal Arbitral e Mediação dos Estados Brasileiros-TJAEM','Tribunal Regional Eleitoral-TRE','Tribunal Regional Federal-TRF','Tribunal Superior Eleitoral-TSE','Orgão Estrangeiro-XXX','Outro-ZZZ']]

var uf = ['AM', 'AC', 'AP', 'RR', 'RO', 'PA', 'TO', 'MA', 'PE', 'CE', 'SE', 'RN', 'PB', 'BA', 'AL', 'PI', 'SP', 'RJ', 'ES', 'MG', 'PR', 'SC', 'RS', 'GO', 'MT', 'MS', 'DF']

console.log(gerarDocumentoRG())