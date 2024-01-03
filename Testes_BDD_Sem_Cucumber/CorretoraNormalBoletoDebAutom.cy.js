import login from '../pages/login/';
import parametrosVenda from '../pages/parametrosVenda/';
import novaVenda from '../pages/novaVenda/';
import formulario from '../pages/formularioContato/';
import preCadastro from '../pages/preCadastro/';
import dadosBeneficiario from '../pages/dadosBeneficiario/'
import envioArquivo from '../pages/envioArquivo/';
import declaracao from '../pages/declaracaoSaude/';
import declFinalizacao from '../pages/declaracaoSaudeFinalizacao/';
import agendamento from '../pages/agendamentoAssinatura/';
import conferencia from '../pages/conferencia/';
import impressaoContrato from '../pages/impressaoContrato/';
import assinatura from '../pages/assinaturaDigital/';
import carteirinha from '../pages/impressaoCarteirinha/';
import pagamento from '../pages/pagamento/';
import printDaTela from '../pages/parametrosPrints/';
import home from '../pages/homePortal/';
import minhasAtividades from '../pages/minhasAtividades/';
import enderecoItinerario from '../pages/enderecoItinerario/';

describe('Venda Normal / Assinatura Digital (s/ assinatura com Unico) / CORRETORA'
    + '/ Com Débito Automático / Sem Nome Social / Sem Receita Federal',
    () => {

        context('Cenário: Logar no Sistema Como Analista.', () => {

            it('DADO \n o acesso para a tela principal do Portal Web em Homologação', () => {
                login.acessarValidarTelaLogin();
            })

            it('QUANDO \n o usuário insere o usuário e a senha do Vendedor', () => {
                login.realizarLogin();
            })

            it('ENTÃO \n o acesso é concedido para a tela principal', () => {
                home.validarAcessoRealizado();
            })
        })

        context('Cenário: Checar os parâmetros de Venda', () => {

            it('DADO \n o acesso para a tela "Parâmetros de Venda', {
                retries: {
                    runMode: 3,
                    openMode: 3,
                },
            }, () => {
                parametrosVenda.acessarTelaViaMenu();
            })

            it('QUANDO \n o usuário checar para "Sim" o item "Habilitar débito automático como forma de pagamento das mensalidades?"', () => {
                parametrosVenda.checarDebito();
            })

            it('E \n o usuário checar para "Não" o item "Pode consultar pessoa fisica receita federal?"', () => {
                parametrosVenda.checarReceita();
            })

            it('ENTÃO \ndeve salvar as configurações estabelecidas', () => {
                parametrosVenda.salvarMudancas();
            })

            it('E realizar Logout."', () => {
                login.realizarLogout();
            })
            context('Cenário: Logar no Sistema Como Corretora.', () => {

                it('DADO \n o acesso para a tela principal do Portal Web em Homologação', () => {
                    login.acessarValidarTelaLogin();
                })

                it('QUANDO \n o usuário insere o usuário e a senha da Corretora', () => {
                    login.realizarLoginCorretora();
                })

                it('ENTÃO \n o acesso é concedido para a tela principal', () => {
                    home.validarAcessoRealizado();
                    home.ArmazenarTicketLocalStorage();
                })
            })
        })
        Cypress._.times(1, (n) => {
            let contagem = (n + 1)
            context('Cenário: Tela Nova Venda  ## Venda ' + (contagem), () => {
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
                    formulario.preencherDadosCorretora();
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
                    preCadastro.armazenarLocalStorage(0, 0);
                    preCadastro.reescreverNome();
                })

                it('E \n preencher os demais campos da tela', () => {
                    preCadastro.preencherDados();
                    preCadastro.preencherDadosGeralCorretora();
                })

                it('ENTÃO \n a tela permitirá avançar para a tela "Dados do Beneficiário"', () => {
                    printDaTela.internaNormalDebAutom(contagem);
                    preCadastro.avancarParaDadosBeneficiario();
                })
            })
            context('Cenário: Preencher os Dados do Beneficiario', () => {
                it('DADO \n o acesso a tela "Dados do Beneficiario" com o Nome, CPF e data de nascimento já preenchidos', () => {
                    dadosBeneficiario.validarAcessoNaPaginaEDadosBeneficiario();
                    dadosBeneficiario.validarDadosNotRF();
                })
                it('QUANDO \n preencher os dados do beneficiário', () => {
                    dadosBeneficiario.preencherSexoMaeNotRF();
                    dadosBeneficiario.preencherDadosBeneficiarioGeral();
                })

                it('E \n O campos"Nome Social" deverá ficar vazio e o Gênero Social como "Nenhum"', () => {
                    dadosBeneficiario.nomeGeneroSocialVazio();
                })

                it('E \n preencher os dados do débito automático', () => {
                    dadosBeneficiario.preencherDebitoAutomatico();
                })

                it('ENTÃO \n validar aviso do Débito Automático', () => {
                    dadosBeneficiario.validarAvisoDebitoAutomaticoCorretora();
                })

                it('AND \n a tela permitirá avançar para o "Envio do documento"', () => {
                    printDaTela.internaNormalDebAutom(contagem);
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
                    declaracao.obterIdBeneficiarioCorretora();
                })

                it('ENTÃO \n permitirá o avanço para a tela "Agendamento de Assinatura"', () => {
                    declaracao.avancarParaAgendamento();
                })
            })

            context('Cenário: Finalizar o Fluxo da Corretora', () => {
                it('DADO \n o passo para a última dela do fluxo da Corretora', () => {
                    declFinalizacao.validarAcesso();
                })
                it('QUANDO \n  clicar no botão "Avançar"', () => {
                    declFinalizacao.finalizar();
                })

                it('ENTÃO \n será redirecionado para a tela principal', () => {
                    declFinalizacao.confirmarFinalizacaoCorretora();
                })
            })

            context('Cenário: Logar no Sistema Como Analista.', () => {

                it('DADO \n o acesso para a tela principal do Portal Web em Homologação', () => {
                    login.acessarLoginNovamenteAnalista();
                })

                it('QUANDO \n o usuário insere o usuário e a senha do Vendedor', () => {
                    login.realizarLogin();
                })

                it('ENTÃO \n o acesso é concedido para a tela principal', () => {
                    home.validarAcessoRealizado();
                    home.ArmazenarTicketLocalStorage();
                })
            })

            context('Cenário: Acessar a tela "Minhas Atividades" para reabrir a atividade', () => {
                it('DADO \n o acesso para a tela Minhas Atividades', () => {
                    minhasAtividades.validarAcesso();
                })

                it('QUANDO \n Validar a existência da venda realizada pela Corretora', () => {
                    minhasAtividades.localizarVendaCorretora();
                })

                it('ENTÃO \n deverá acessá-la', () => {
                    minhasAtividades.abrirAtividade();
                })
            })

            context('Cenário: Validar as Informações preenchidas nas telas Anteriores', () => {
                it('DADO \n o acesso a tela "Conferência de Arquivos"', () => {
                    conferencia.validarAcessoCorretora();
                })

                it('QUANDO \n preencher a "Parceria da Venda" e Assinatura Digital como "sim"', () => {
                    conferencia.preencherParceriaVenda();
                    conferencia.preencherAssinaturaDigital();
                    conferencia.comoConheceuCorretora();
                })

                it('E \n preencher a forma de pagamento da Adesão como Boleto', () => {
                    conferencia.preencherPagamentoAdesao();
                })

                it('E \n preencher a forma de pagamento da Mensalidade como Débito Automático', () => {
                    conferencia.preencherPagamentoMensalidade();
                })

                it('ENTÃO \n as informações do Beneficiário preenchida em telas anteriores deverão ser validadas', () => {
                    conferencia.validarDebAutomNomeCPFNotRFCorretora();
                    conferencia.validarDadosDebitoAutomaticoCorretora();
                })

                it('E \n O campos"Nome Social" deverá ficar vazio e o Gênero Social como "Nenhum"', () => {
                    conferencia.nomeGeneroSocialVazio();
                })

                it('E \n as informações referente ao Débito Automático deverão ser validadas', () => {
                    conferencia.validarDebAutomNomeCPFNotRF();
                    conferencia.validarDadosDebitoAutomatico();
                })

                it('E \n a justificativa da declaração de Saúde deverá ser validada', () => {
                    conferencia.validarJustificativaDeclaracaoSaude();
                })

                it('E \n permitirá o avanço para a tela "Revisão"', () => {
                    printDaTela.internaNormalDebAutom(contagem);
                    conferencia.botaoSalvar();
                })
            })

            context('Cenário: Acessar a tela Endereço Itinerário para preenchimento da Data e Confirmação do Endereço', () => {
                it('DADO \n o acesso a tela "Endereço do Itinerário"', () => {
                    enderecoItinerario.validarAcesso();
                })

                it('QUANDO \n inserir a data Itinerário', () => {
                   enderecoItinerario.inserirData();
                })

                it('E \n clicar no checkbox para preenchimento automático do endereço', () => {
                   enderecoItinerario.carregarEndereco();
                })

                it('E \n selecionar a Zona do Endereço', () => {
                   enderecoItinerario.selecionarZona();
                })

                it('ENTÃO \n permitirá o avanço para a tela "Agendamento da Assinatura"', () => {
                    enderecoItinerario.clicarBotaoAvancar();
                })
            })

            context('Cenário: Acessar o Agendamento de Assinatura e selecionar o dia do Vencimento', () => {
                it('DADO \n o acesso a tela "Agendamento de Assinatura"', () => {
                    agendamento.validarAcesso();
                })

                it('QUANDO \n selecionar a data da assinatura', () => {
                    
                })

                it('E \n  selecionar um dia para o vencimento', () => {
                    agendamento.selecionarDiaVencimento();
                })

                it('ENTÃO \n permitirá o avanço para a tela "Conferência"', () => {
                    agendamento.salvarAvancar();
                })
            })

                 context('Cenário: Validar as Informações exibidas na Tela e gerar Contrato', () => {
                it('DADO \n o acesso a tela "Impressão do Contrato"', () => {
                    printDaTela.internaNormalDebAutom(contagem);
                    impressaoContrato.validarAcesso();
                })
                it('E \n as informações do beneficiário exibidas em tela', () => {
                    impressaoContrato.validarDadosBeneficiarioNotRFSemNomeSocial();
                    impressaoContrato.validarDadosBeneficiarioSemNomeSocial();
                })
                it('E \n a impossibilidade de Avançar sem gerar o contrato', () => {
                    impressaoContrato.validarExibirMensagemErro();
                })

                it('QUANDO \n clicar no botão para Gerar Contrato', () => {
                    impressaoContrato.clicarBotaoContratoNormal(contagem);
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
                    assinatura.validarDadosBeneficiarioNotRFSemNomeSocial();
                    assinatura.validarDadosBeneficiarioSemNomeSocial();
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
                    assinatura.gerarBoletoNormal(contagem);
                })
                it('E \n permitirá avançar para a tela "Impressão da Carteirinha" sem exibir mensagem de erro', () => {
                    printDaTela.internaNormalDebAutom(contagem);
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
                    carteirinha.avancarTelaNormal(contagem);
                })
            })
            context('Cenário: Validar e Finalizar a Venda', () => {
                it('DADO \n  o acesso a tela "Pagamento"', () => {
                    printDaTela.internaNormalDebAutom(contagem);
                    pagamento.validarAcesso();
                })
                it('QUANDO \n validar as informações', () => {
                    pagamento.validarDadosNotRFSemNomeSocial();
                    pagamento.validarDadosBeneficiarioSemNomeSocial();
                    pagamento.validarNomeDebAutomNotRF();
                    pagamento.validarDebAutomatico();
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