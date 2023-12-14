import login from '../pages/login/';
import parametrosVenda from "../pages/parametrosVenda";
import excecao from "../pages/excecao/";
import novaVenda from '../pages/novaVenda/';
import formulario from '../pages/formularioContato/';
import preCadastro from '../pages/preCadastro/'

describe('Venda Normal / Boleto / Assinatura Digital (s/ assinatura com Unico) / Vendedor Interno'
    + '/ Com Débito Automático', function () {

        Cypress._.times(2, (n) => {

            context('Cenário: Logar no Sistema da Prevent Senior. Teste ' + (n + 1), () => {

                it('DADO \n o acesso para a tela principal do Portal Web em Homologação', () => {
                    login.acessarValidarTelaLogin();
                })

                it('QUANDO \n o usuário insere o usuário e a senha do Vendedor', () => {
                    login.realizarLogin();
                })

                it('ENTÃO \n o acesso é concedido para a tela principal', () => {
                    excecao.tratarExcecao();
                    login.validarAcessoRealizado();
                })
            })

            context('Cenário: Checar os parâmetros de Venda', () => {

                it('DADO \n o acesso para a tela "Parâmetros de Venda', () => {
                    excecao.tratarExcecao();
                    parametrosVenda.acessarTela();
                })

                it('QUANDO \n o usuário checar para "Sim" o item "Habilitar débito automático como forma de pagamento das mensalidades?"', () => {
                    excecao.tratarExcecao();
                    parametrosVenda.checarDebito();
                })

                it('E \n o usuário checar para "Não" o item "Pode consultar pessoa fisica receita federal?"', () => {
                    parametrosVenda.checarReceita();
                })

                it('ENTÃO \ndeve salvar as configurações estabelecidas', () => {
                    parametrosVenda.salvarMudancas();
                })
            })

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
                it('teste', () => {
                    preCadastro.armazenarLocalStorage();
                    preCadastro.preencherDados();
                    localStorage.clear();
                    cy.get('#ticket')
                        .invoke('attr', 'value').then($ticket => {
                            let ticketPortal = $ticket;
                            let site = Cypress.env('site2');
                            cy.visit(`${site}vendas/triagem?ticket=${ticketPortal}&menuAcesso=29`)
                        })
                })
            })
        })
    })