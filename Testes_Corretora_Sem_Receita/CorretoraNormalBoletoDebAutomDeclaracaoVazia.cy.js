import login from '../pages/login';
import parametrosVenda from '../pages/parametrosVenda';
import novaVenda from '../pages/novaVenda';
import formulario from '../pages/formularioContato';
import preCadastro from '../pages/preCadastro';
import dadosBeneficiario from '../pages/dadosBeneficiario'
import envioArquivo from '../pages/envioArquivo';
import declaracao from '../pages/declaracaoSaude';
import declFinalizacao from '../pages/declaracaoSaudeFinalizacao';
import agendamento from '../pages/agendamentoAssinatura';
import conferencia from '../pages/conferencia';
import impressaoContrato from '../pages/impressaoContrato';
import assinatura from '../pages/assinaturaDigital';
import carteirinha from '../pages/impressaoCarteirinha';
import pagamento from '../pages/pagamento';
import printDaTela from '../pages/parametrosPrints';
import home from '../pages/homePortal';
import minhasAtividades from '../pages/minhasAtividades';
import enderecoItinerario from '../pages/enderecoItinerario';
import revisaoDesconto from '../pages/revisaoDesconto';
import lStorage from '../pages/localStorage';
import geradorPessoa from '../geradores/geradorPessoas'
const directory = Cypress.spec.name.replace('.cy.js', '')

describe('Venda Normal / Assinatura Digital (s/ assinatura com Unico) / CORRETORA'
    + '/ Com Débito Automático / Sem Nome Social / Sem Receita Federal / Declaração Vazia',
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
        })
        Cypress._.times(1, (n) => {
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
                    lStorage.armazenarLocalStorage(geradorPessoa(0,false, false), 'preBenef')
                    preCadastro.reescreverNome();
                })

                it('E \n preencher os demais campos da tela', () => {
                    preCadastro.preencherCPFDataNasc(true, 'preBenef')
                    preCadastro.preencherDadosGeralCorretora();
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
                it('QUANDO \n  Não preencher a declaração e validar todos os campos em branco', () => {
                    declaracao.validarJustificativaDeclaracaoSaudeVazia('preBenef');
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

                it('QUANDO \n o usuário insere o usuário e a senha do Vendedor', {
                    retries: {
                        runMode: 3,
                        openMode: 3,
                    },
                }, () => {
                    login.realizarLoginSegundaVez();
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
                    conferencia.validarDadosBeneficiario('preBenef');
                })

                it('E \n O campos"Nome Social" deverá ficar vazio e o Gênero Social como "Nenhum"', () => {
                    conferencia.nomeGeneroSocialVazio();
                })

                it('E \n as informações referente ao Débito Automático deverão ser validadas', () => {
                    conferencia.validarDadosDebitoAutomaticoCorretora('preBenef');
                })

                it('E \n todas as justificativas deverão estar em branco', () => {
                    conferencia.validarJustificativaDeclaracaoSaudeVazia('preBenef');
                })

                it('E \n permitirá o avanço para a tela "Revisão"', () => {
                    printDaTela.printarTela(directory);
                    conferencia.botaoSalvar();
                })
            })

            context('Cenário: Acessar a tela Endereço Itinerário para preenchimento da Data e Confirmação do Endereço', () => {
                it('DADO \n o acesso a tela "Endereço do Itinerário"', () => {
                    enderecoItinerario.validarAcesso();
                })

                it('QUANDO \n inserir a data Itinerário',  {
                    retries: {
                        runMode: 3,
                        openMode: 3,
                    },
                },  () => {
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
                    agendamento.validarAcessoCorretora();
                })

                it('QUANDO \n selecionar a data da assinatura', () => {
                    agendamento.selecionarArrastarDataAssinatura();
                })

                it('E \n  selecionar um dia para o vencimento', () => {
                  agendamento.selecionarDiaVencimento();
                })

                it('ENTÃO \n permitirá o avanço para a tela "Conferência"', () => {
                   agendamento.salvarAvancarCorretora();
                })
            })

            context('Cenário: Validar os descontos Concedidos na tela "Revisão do Desconto"', () => {
                it('DADO \n o acesso para a tela "Revisão do Desconto"', () => {
                    revisaoDesconto.validarAcesso();
                })

                it('QUANDO \n validar nenhum desconto concedido', () => {
                    revisaoDesconto.revisarDesconto()
                })

                it('ENTÃO \n deverá acessar a Impressão do Contrato', () => {
                   revisaoDesconto.botaoSalvar();
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
                it('E \n o Contrato será salvo como evidência', () => {
                    impressaoContrato.salvarPDFContrato();
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
                    assinatura.validarDadosBeneficiario('preBenef');
                })
                it('E \n o status da Assinatura Digital em "Pendente de Envio"', () => {
                    assinatura.validarStatusPendente();
                })
                it('E \n exibir a Mensagem de Erro ao tentar Avançar sem realizar Assinatura Digital', () => {
                    assinatura.mensagemErroPendenteEnvio();
                })

                it('QUANDO \n solicitar Assinatura Digital', () => {
                    assinatura.solicitarAssinaturaDigital();
                })

                it('ENTÃO \n exibir Mensagem de Erro ao tentar Avançar com Status "Enviado"', () => {
                    assinatura.mensagemErroStatusEnviado();
                })

                it('E \n o status deverá ser trocado de "ENVIADO" para "CONCLUIDO"', () => {
                    assinatura.trocarStatus();
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
                    pagamento.validarDadosBeneficiario('preBenef');
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