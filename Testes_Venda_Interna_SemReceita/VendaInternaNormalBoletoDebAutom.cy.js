import login from '../pages/login/';
import parametrosVenda from '../pages/parametrosVenda/';
import novaVenda from '../pages/novaVenda/';
import formulario from '../pages/formularioContato/';
import preCadastro from '../pages/preCadastro/';
import dadosBeneficiario from '../pages/dadosBeneficiario/'
import envioArquivo from '../pages/envioArquivo/';
import declaracao from '../pages/declaracaoSaude/';
import agendamento from '../pages/agendamentoAssinatura/';
import conferencia from '../pages/conferencia/';
import revisao from '../pages/revisao/';
import impressaoContrato from '../pages/impressaoContrato/';
import assinatura from '../pages/assinaturaDigital/';
import carteirinha from '../pages/impressaoCarteirinha/';
import pagamento from '../pages/pagamento/';
import printDaTela from '../pages/parametrosPrints/';
import home from '../pages/homePortal/';
import lStorage from '../pages/localStorage/'
import geradorPessoa from '../geradores/geradorPessoas'
const directory = Cypress.spec.name.replace('.cy.js', '')

describe('Venda Normal / Assinatura Digital (s/ assinatura com Unico) / Vendedor Interno'
    + '/ Com Débito Automático / Sem Nome Social / Sem Receita Federal',
    () => {

        context('Cenário: Logar no Sistema da Prevent Senior.', () => {

            it('DADO \n o acesso para a tela principal do Portal Web em Homologação', () => {
                login.acessarValidarTelaLogin();
            })

            it('QUANDO \n o usuário insere o usuário e a senha do Vendedor', () => {
                login.realizarLogin();
            })

            it('ENTÃO \n o acesso é concedido para a tela principal', () => {
                home.validarAcessoRealizado();
                home.ArmazenarTicketLocalStorage();
            })
        })

        context('Cenário: Checar os parâmetros de Venda', () => {

            it('DADO \n o acesso para a tela "Parâmetros de Venda', {
                retries: {
                    runMode: 3,
                    openMode: 3,
                },
            }, () => {
                parametrosVenda.acessarTelaViaEnderecoComTicket();
            })

            it('QUANDO \n o usuário checar para "Sim" o item "Habilitar débito automático como forma de pagamento das mensalidades?"', () => {
                parametrosVenda.checarDebitoSemIframe();
            })

            it('E \n o usuário checar para "Não" o item "Pode consultar pessoa fisica receita federal?"', () => {
                parametrosVenda.checarReceitaSemIframe();
            })

            it('ENTÃO \ndeve salvar as configurações estabelecidas', () => {
                parametrosVenda.salvarMudancasSemIframe();
            })

            it('E exibir a mensagem de Sucesso "Parâmetro(s) alterado(s) com sucesso."', () => {
                parametrosVenda.exibirMensagemSucesso();
            })
        })
        Cypress._.times(2, (n) => {
            let contagem = (n+1)
            context('Cenário: Tela Nova Venda  ## Venda '+ (contagem), () => {
                it('DADO \n o início do fluxo pela tela Nova Venda', () => {
                    novaVenda.acessarNovaVenda();
                })
                it('QUANDO \n o usuário inserir o nome no campo "Nome ou CPF" e clicar no botão "Pesquisar"', () => {
                    novaVenda.escreverNome();
                })
                it('E \n clicar no botão "Pesquisar"', () => {
                    novaVenda.pesquisar();
                })
                it('ENTÃO \n o nome tem que constar no campo "Nome ou CPF"', () => {
                    novaVenda.verificarNome();
                })
                it('E \n Clicar em "Cadastrar Novo Contato" acessará a tela "Formulário de Contato"', () => {
                    novaVenda.novoCadastro();
                    formulario.verificarTela();
                })
            })

            context('Cenário: Preencher as informações do Formulario de Contato', () => {
                it('DADO \n o acesso a tela do Formulario de Contato com o nome do contato já preenchido no campo "Nome"', () => {
                    formulario.verificarCampoNome();
                })
                it('QUANDO \n o usuário preencher todos os demais campos', () => {
                    formulario.preencherDados();
                })

                it('ENTÃO \n a tela permitirá avançar para o "Pré-Cadastro"', () => {
                    formulario.iniciarVenda();
                })

            })

            context('Cenário: Preencher a tela Pré Cadastro', () => {
                it('DADO \n o acesso a tela "Pré-Cadastro" com o nome do contato já preenchido no campo "Nome"', () => {
                    preCadastro.validarNomeEntrada();
                })

                it('QUANDO \n o usuário vai trocar o nome gerado pela automação', () => {
                    lStorage.armazenarLocalStorage(geradorPessoa(0,false,false), 'preBenef');
                    preCadastro.reescreverNome();
                })

                it('E \n preencher os demais campos da tela', () => {
                    preCadastro.preencherCPFDataNasc(false, 'preBenef');
                    preCadastro.preencherDadosGeral();
                })

                it('ENTÃO \n a tela permitirá avançar para a tela "Dados do Beneficiário"', () => {
                    printDaTela.printarTela(directory);
                    preCadastro.avancarParaDadosBeneficiario();
                })
            })
            context('Cenário: Preencher os Dados do Beneficiario', () => {
                it('DADO \n o acesso a tela "Dados do Beneficiario" com o Nome, CPF e data de nascimento já preenchidos', () => {
                    dadosBeneficiario.validarAcessoNaPagina();
                    dadosBeneficiario.validarDados('preBenef');
                })
                it('QUANDO \n preencher os dados do beneficiário', () => {
                    dadosBeneficiario.preencherDadosBeneficiario('preBenef');
                })

                it('E \n O campos"Nome Social" deverá ficar vazio e o Gênero Social como "Nenhum"', () =>{
                    dadosBeneficiario.nomeGeneroSocialVazio();
                })

                it('E \n preencher os dados do débito automático', () => {
                    dadosBeneficiario.preencherDebitoAutomatico();
                })

                it('ENTÃO \n validar regras do Débito Automático', () => {
                    dadosBeneficiario.validarRegrasDebitoAutomatico();
                })

                it('AND \n a tela permitirá avançar para o "Envio do documento"', () => {
                    printDaTela.printarTela(directory);
                    dadosBeneficiario.avancarParaEnvioArquivo();
                })

                it('AND \n não exibirá o alerta de obrigatoriedade de preenchimento', () => {
                    dadosBeneficiario.naoExibirAlertaObrigatoriedade();
                })
            })
            context('Cenário: Selecionar Arquivo', () => {
                it('DADO \n o acesso a tela "Envio Arquivo"', () => {
                    envioArquivo.validarAcessoPagina();
                })
                it('QUANDO \n  selecionar Arquivo', () => {
                    envioArquivo.selecionarArquivo();
                })

                it('ENTÃO \n exibirá mensagem de sucesso', () => {
                    envioArquivo.verificarMensagemSucesso();
                })

                it('E \n permitirá o avanço para a tela "Declaração de Saúde"', () => {
                    envioArquivo.avancarParaDeclaracaoSaude();
                })
            })
            context('Cenário: Acessar e Responder uma pergunta na tela "Declaração de Saúde"', () => {
                it('DADO \n o acesso a tela "Declaração de Saúde"', () => {
                    declaracao.validarAcesso();
                })
                it('QUANDO \n  marcar "Sim" para uma pergunta', () => {
                    declaracao.marcarUmaPerguntaComoSim();
                })

                it('E \n responder a justificativa da Pergunta marcada como "Sim"', () => {
                    declaracao.responderJustificativa();
                })

                it('ENTÃO \n permitirá o avanço para a tela "Agendamento de Assinatura"', () => {
                    declaracao.avancarParaAgendamento();
                })
            })
            context('Cenário: Acessar o Agendamento de Assinatura e selecionar o dia do Vencimento', () => {
                it('DADO \n o acesso a tela "Agendamento de Assinatura"', () => {
                    agendamento.validarAcesso();
                })

                it('QUANDO \n E validar a opção "Assinatura no Local da Venda" selecionada', () => {
                    agendamento.validarOpcaoSelecionada();
                })

                it('E \n  selecionar um dia para o vencimento', () => {
                    agendamento.selecionarDiaVencimento();
                })

                it('ENTÃO \n permitirá o avanço para a tela "Conferência"', () => {
                    agendamento.salvarAvancar();
                })
            })
            context('Cenário: Validar as Informações preenchidas nas telas Anteriores', () => {
                it('DADO \n o acesso a tela "Conferência de Arquivos"', () => {
                    conferencia.validarAcesso();
                })

                it('QUANDO \n preencher a "Parceria da Venda" e Assinatura Digital como "sim"', () => {
                    conferencia.preencherParceriaVenda();
                    conferencia.preencherAssinaturaDigital();
                })

                it('E \n preencher a forma de pagamento da Adesão como Boleto', () => {
                    conferencia.preencherPagamentoAdesao();
                })

                it('E \n preencher a forma de pagamento da Mensalidade como Débito Automático', () => {
                    conferencia.preencherPagamentoMensalidade();
                })

                it('ENTÃO \n as informações do Beneficiário preenchida em telas anteriores deverão ser validadas', () => {
                    conferencia.validarDadosBeneficiario('preBenef');
                })

                it('E \n O campos"Nome Social" deverá ficar vazio e o Gênero Social como "Nenhum"', () =>{
                    conferencia.nomeGeneroSocialVazio();
                })

                it('E \n as informações referente ao Débito Automático deverão ser validadas', () => {
                    conferencia.validarDadosDebitoAutomatico('preBenef');
                })

                it('E \n a justificativa da declaração de Saúde deverá ser validada', () => {
                    conferencia.validarJustificativaDeclaracaoSaude();
                })

                it('E \n permitirá o avanço para a tela "Revisão"', () => {
                    printDaTela.printarTela(directory);
                    conferencia.botaoSalvar();
                })
            })
            context('Cenário: Validar as Informações preenchidas nas telas Anteriores, incluindo Conferência', () => {
                it('DADO \n o acesso a tela "Revisão do beneficiário"', () => {
                    revisao.validarAcesso();
                })

                it('QUANDO \n os dados do Proponente deverão ser validados', () => {
                    revisao.validarDadosBeneficiario('preBenef');
                })

                it('E \n O campos"Nome Social" deverá ficar vazio e o Gênero Social como "Nenhum"', () =>{
                    revisao.nomeGeneroSocialVazio();
                })

                it('E \n o Termo Aditivo deverá ser validado', () => {
                    revisao.validarTermoAditivo();
                })

                it('E \n a Assinatuta Digital deverá ser validada', () => {
                    revisao.validarAssinaturaDigital();
                })
                it('E \n a Forma de Pagamento da Adesão e Mensalidade deverão ser validadas', () => {
                    revisao.validarPagamentoAdesao();
                    revisao.validarPagamentoMensalidade();
                })
                it('E \n as informações referente ao Débito Automático deverão ser validadas', () => {
                    revisao.validarDadosDebitoAutomatico('preBenef');
                })
                it('E \n a justificativa da declaração de Saúde deverá ser validada', () => {
                    revisao.validarJustificativaDeclaracaoSaude();
                })

                it('ENTÃO \n permitirá o avanço para a tela "Impressão do Contrato"', () => {
                    printDaTela.printarTela(directory);
                    revisao.botaoSalvar();
                })
            })
            context('Cenário: Validar as Informações exibidas na Tela e gerar Contrato', () => {
                it('DADO \n o acesso a tela "Impressão do Contrato"', () => {
                    printDaTela.printarTela(directory);
                    impressaoContrato.validarAcesso();
                })
                it('E \n as informações do beneficiário exibidas em tela', () => {
                    impressaoContrato.validarDadosBeneficiario('preBenef');
                })
                it('E \n a impossibilidade de Avançar sem gerar o contrato', () => {
                    impressaoContrato.validarExibirMensagemErro();
                })

                it('QUANDO \n clicar no botão para Gerar Contrato', () => {
                    impressaoContrato.clicarBotaoContrato(directory);
                })

                it('ENTÃO \n o Contrato deverá ser exibido', () => {
                    impressaoContrato.exibirContrato();
                })
                it('E \n o botão Avançar liberado para Assinatura Digital', () => {
                    impressaoContrato.clicarAvancar();
                })
            })
            context('Cenário: Validar as Informações exibidas na Tela e gerar Boleto após a conclusão da Assinatura Digital', () => {
                it('DADO \n o acesso a tela "Assinatura Digital"', () => {
                    assinatura.validarAcesso();
                })
                it('E \n as informações do beneficiário exibidas em tela', () => {
                    assinatura.validarDadosBeneficiarioSemNomeSocial('preBenef');
                })
                it('E \n o status da Assinatura Digital em "Pendente de Envio"', () => {
                    assinatura.validarStatusPendenteSemNomeSocial();
                })
                it('E \n exibir a Mensagem de Erro ao tentar Avançar sem realizar Assinatura Digital', () => {
                    assinatura.mensagemErroPendenteEnvio();
                })

                it('QUANDO \n solicitar Assinatura Digital', () => {
                    assinatura.solicitarAssinaturaDigital();
                })

                it('ENTÃO \n exibir Mensagem de Erro ao tentar Avançar com Status "Enviado"', () => {
                    assinatura.mensagemErroStatusEnviadoSemNomeSocial();
                })

                it('E \n o status deverá ser trocado de "ENVIADO" para "CONCLUIDO"', () => {
                    assinatura.trocarStatusSemNomeSocial();
                })

                it('E \n exibir Mensagem de Erro ao tentar Avançar sem gerar o Boleto', () => {
                    assinatura.mensagemErroBoleto();
                })

                it('E \n o botão de Gerar Boleto deverá ser exibido gerando um boleto', () => {
                    assinatura.gerarBoleto(directory);
                })
                it('E \n permitirá avançar para a tela "Impressão da Carteirinha" sem exibir mensagem de erro', () => {
                    printDaTela.printarTela(directory);
                    assinatura.botaoAvancar();
                    assinatura.mensagemErroOculta();
                })
            })
            context('Cenário: Realizar o Envio do Kit de Boas Vindas e Impressao da Carteirinha', () => {
                it('DADO \n o acesso a tela "Impressão da Carteirinha"', () => {
                    carteirinha.validarAcesso();
                })
                it('QUANDO \n cliclar em "Avançar" deverá exibir mensagem de erro referente a Impressão', () => {
                    carteirinha.exibirMensagemErroImpressao();
                })
                it('E \n clicar em "Gerar PDF"', () => {
                    carteirinha.clicarGerarPDF();
                })
                it('E \n cliclar em "Avançar" deverá exibir mensagem de erro referente ao Kit.', () => {
                    carteirinha.exibirMensagemErroKit();
                 })
                it('E \n clicar em "ENVIAR KIT"', () => {
                   carteirinha.clicarGerarKit();
                })
                it('ENTÃO \n exibirá Mensagem de Sucesso no Envio do Kit ', () => {
                    carteirinha.validarMensagemSucesso();
                })

                it('E \n permitirá avançar para a tela "Pagamento"', () => {
                   carteirinha.avancarTela(directory);
                })
            })
            context('Cenário: Validar e Finalizar a Venda', () => {
                it('DADO \n  o acesso a tela "Pagamento"', () => {
                    printDaTela.printarTela(directory);
                    pagamento.validarAcesso();
                })
                it('QUANDO \n validar as informações', () => {
                    pagamento.validarDadosBeneficiarioSemNomeSocial('preBenef');
                    pagamento.validarDebAutomatico('preBenef');
                    pagamento.validarDemaisInfos();
                })
                it('E \n clicar em "Finalizar Pagamento"', () => {
                   pagamento.finalizarVenda();
                })
               
                it('ENTÃO \n a venda será concluída', () => {
                    pagamento.validarSucessoEncerramento();
                })
            })
        })
    })