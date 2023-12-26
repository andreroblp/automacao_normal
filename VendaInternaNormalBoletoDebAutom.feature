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

@PreCadastro
Scenario: Preencher as informações da Tela Pré Cadastro
    Given o acesso a tela "Pré-Cadastro" com o nome do contato já preenchido no campo "Nome"
    When o usuário vai trocar o nome gerado pela automação
    And preencher os demais campos da tela
    Then a tela permitirá avançar para a tela "Dados do Beneficiário"

@DadosBeneficiario
Scenario: Preencher os Dados do Beneficiario
    Given o acesso a tela "Dados do Beneficiario" com o Nome, CPF e data de nascimento já preenchidos
    And Nome e Gênero Sociais já preenchidos
    When preencher os dados do beneficiário
    And preencher os dados do débito automático
    Then validar regras do Débito Automático
    And a tela permitirá avançar para o "Envio do documento" 
    And não exibirá o alerta de obrigatoriedade de preenchimento

@EnvioArquivo
Scenario: Selecionar Arquivo 
    Given o acesso a tela "Envio Arquivo"
    When selecionar Arquivo
    Then exibirá mensagem de sucesso
    And permitirá o avanço para a tela "Declaração de Saúde"

@DeclaracaoSaude
Scenario: Acessar e Responder uma pergunta na tela "Declaração de Saúde"
    Given o acesso a tela "Declaração de Saúde"
    When marcar "Sim" para uma pergunta
    And responder a justificativa da Pergunta marcada como "Sim"
    Then permitirá o avanço para a tela "Agendamento de Assinatura"

@AgendamentoAssinatura
Scenario: Acessar o Agendamento de Assinatura e selecionar o dia do Vencimento
    Given o acesso a tela "Agendamento de Assinatura"
    When validar a opção "Assinatura no Local da Venda" selecionada
    E selecionar um dia para o vencimento
    Then permitirá o avanço para a tela "Conferência"

@Conferencia
Scenario: 





