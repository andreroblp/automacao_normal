@PreventSenior
Feature: Fluxo da Venda Interna Normal Com Boleto (Adesao) e Débito Automático (Mensalidades)

@Login
Scenario: Logar no Sistema
    Given o acesso para a tela principal do Portal Web em Homologação
    When o usuário insere o usuário e a senha do Vendedor
    Then o acesso é concedido para a tela principal

@ParametrosVenda
Scenario: Checar os parâmetros de Venda
    Given o acesso para a tela "Parâmetros de Venda"
    When o usuário checar para "Sim" o item "Habilitar débito automático como forma de pagamento das mensalidades?"
    And o usuário checar para "Não" o item "Pode consultar pessoa fisica receita federal?"
    Then deve salvar as confiugurações estabelecidas

@NovaVenda
Scenario: Tela Nova Venda
    Given o início do fluxo pela tela Nova Venda
    When o usuário inserir o nome no campo "Nome ou CPF"
    And clicar no botão "Pesquisar"
    Then o nome tem que continuar constando no campo "Nome ou CPF"
    And ao Clicar em "Cadastrar Novo Contato" acessará a tela "Formulário de Contato"

@FormularioContato
Scenario: Preencher as informações do Formulario de Contato
    Given o acesso a tela do Formulario de Contato com o nome do contato já preenchido no campo "Nome"
    When o usuário preencher todos os demais campos
    Then a tela permitirá avançar para o "Pré-Cadastro"
