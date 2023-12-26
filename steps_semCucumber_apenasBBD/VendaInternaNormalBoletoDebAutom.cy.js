import login from '../pages/login/';
import parametrosVenda from "../pages/parametrosVenda";
import novaVenda from '../pages/novaVenda/';
import formulario from '../pages/formularioContato/';
import preCadastro from '../pages/preCadastro/';
import dadosBeneficiario from '../pages/dadosBeneficiario'
import envioArquivo from '../pages/envioArquivo';
import declaracao from '../pages/declaracaoSaude';
import agendamento from '../pages/agendamentoAssinatura';

describe('Venda Normal / Assinatura Digital (s/ assinatura com Unico) / Vendedor Interno'
    + '/ Com Débito Automático / Com Nome Social / Sem Receita Federal',
    () => {

        context('Cenário: Logar no Sistema da Prevent Senior. Teste ', () => {

            it('DADO \n o acesso para a tela principal do Portal Web em Homologação', () => {
                login.acessarValidarTelaLogin();
            })

            it('QUANDO \n o usuário insere o usuário e a senha do Vendedor', () => {
                login.realizarLogin();
            })

            it('ENTÃO \n o acesso é concedido para a tela principal', () => {
                login.validarAcessoRealizado();
                parametrosVenda.obterTicketArmazenar();
            })
        })

        context('Cenário: Checar os parâmetros de Venda', () => {

            it('DADO \n o acesso para a tela "Parâmetros de Venda', {
                retries: {
                    runMode: 3,
                    openMode: 3,
                },
            },() => {
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
        Cypress._.times(1, () => {
            context('Cenário: Tela Nova Venda', () => {
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
                    preCadastro.armazenarLocalStorage(1);
                    preCadastro.reescreverNome();
                })

                it('E \n preencher os demais campos da tela', () => {
                    preCadastro.preencherDados();
                    preCadastro.preencherNomeGeneroSocial();
                })

                it('ENTÃO \n a tela permitirá avançar para a tela "Dados do Beneficiário"', () => {
                    preCadastro.avancarParaDadosBeneficiario();
                })
            })
            context('Cenário: Preencher os Dados do Beneficiario', () => {
                it('DADO \n o acesso a tela "Dados do Beneficiario" com o Nome, CPF e data de nascimento já preenchidos', () => {
                    dadosBeneficiario.validarAcessoNaPaginaEDadosBeneficiario();
                })
                it('E \n  Nome e Gênero Sociais já preenchidos', () => {
                    dadosBeneficiario.validarNomeGeneroSocial();
                })

                it('QUANDO \n preencher os dados do beneficiário', () => {
                    dadosBeneficiario.preencherDadosBeneficiario();
                })

                it('E \n preencher os dados do débito automático', () => {
                    dadosBeneficiario.preencherDebitoAutomatico();
                })

                it('ENTÃO \n validar regras do Débito Automático', () => {
                    dadosBeneficiario.validarRegrasDebitoAutomatico();
                })
                
                it('AND \n a tela permitirá avançar para o "Envio do documento"', () => {
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
        })
    })