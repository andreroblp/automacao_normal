@PreventSenior
Feature: Fluxo da Venda Interna Normal Com Boleto (Adesao) e Débito Automático (Mensalidades)

@LoginAnaListaAjuste
Scenario: Logar no Sistema Como Analista
    Given o acesso para a tela principal do Portal Web em Homologação
    When o usuário insere o usuário e a senha do Analista
    Then o acesso é concedido para a tela principal

@ParametrosVenda
Scenario: Checar os parâmetros de Venda
    Given o acesso para a tela "Parâmetros de Venda"
    When o usuário checar para "Sim" o item "Habilitar débito automático como forma de pagamento das mensalidades?"
    And o usuário checar para "Não" o item "Pode consultar pessoa fisica receita federal?"
    Then deve salvar as configurações estabelecidas
    And Realizar Logout

@LoginCorretora
Scenario: Logar no Sistema Como Analista
    Given o acesso para a tela principal do Portal Web em Homologação
    When o usuário insere o usuário e a senha da Corretora
    Then o acesso é concedido para a tela principal

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
    And Um pré-beneficiário gerado
    When o usuário vai trocar o nome gerado pela automação
    And preencher os demais campos da tela
    Then a tela permitirá avançar para a tela "Dados do Beneficiário"

@DadosBeneficiario
Scenario: Preencher os Dados do Beneficiario
    Given o acesso a tela "Dados do Beneficiario" com o Nome, CPF e data de nascimento já preenchidos
    And Nome Social já preenchido
    When preencher os dados do beneficiário
    And preencher o campo dos Cuidados Anteriores
    And o Gênero Social
    And preencher os dados do débito automático
    Then validar aviso do Débito Automático
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
    When Não preencher a declaração e validar todos os campos em branco
    Then permitirá o avanço para a tela "Agendamento de Assinatura"

@DeclaracaoSaudeFinalização
Scenario: Finalizar o Fluxo da Corretora
    Given o passo para a última dela do fluxo da Corretora
    When clicar no botão "Avançar"
    Then será redirecionado para a tela principal

@LoginAnaLista
Scenario: Logar no Sistema Como Analista
    Given o acesso para a tela principal do Portal Web em Homologação
    When o usuário insere o usuário e a senha do Analista
    Then o acesso é concedido para a tela principal

@MinhasAtividades
Scenario: Acessar a tela "Minhas Atividades" para reabrir a atividade
    Given o acesso para a tela Minhas Atividades
    When Validar a existência da venda realizada pela Corretora
    Then deverá acessá-la

@ConferenciaCorretora
Scenario: Validar as Informações preenchidas nas telas Anteriores
    Given o acesso a tela "Conferência de Arquivos"
    When preencher a "Parceria da Venda"  e Assinatura Digital como "sim"
    AND preencher a forma de pagamento da Adesão como Boleto
    AND preencher a forma de pagamento da Mensalidade como Débito Automático
    Then as informações do Beneficiário preenchida em telas anteriores deverão ser validadas
    AND as informações referente ao Débito Automático deverão ser validadas
    AND todas as justificativas deverão estar em branco
    AND permitirá o avanço para a tela "Revisão"

@EndereçoItinerário
Scenario: Acessar a tela Endereço Itinerário para preenchimento da Data e Confirmação do Endereço
    Given o acesso a tela "Endereço do Itinerário"
    When inserir a data Itinerário
    AND clicar no checkbox para preenchimento automático do endereço
    AND selecionar a Zona do Endereço
    Then permitirá o avanço para a tela "Agendamento da Assinatura"

@AgendamentoAssinatura
Scenario: Acessar o Agendamento de Assinatura e selecionar o dia do Vencimento
    Given o acesso a tela "Agendamento de Assinatura"
    When selecionar a data da assinatura
    E selecionar um dia para o vencimento
    Then permitirá o avanço para a tela "Conferência"

@MRevisaoDesconto
Scenario: Validar os descontos Concedidos na tela "Revisão do Desconto"
    Given o acesso para a tela "Revisão do Desconto"
    When validar nenhum desconto concedido
    Then deverá acessar a Impressão do Contrato

@ImpressaoContrato
Scenario: Validar as Informações exibidas na Tela e gerar Contrato
    Given o acesso a tela "Impressão do Contrato"
    And as informações do beneficiário exibidas em tela
    And a impossibilidade de Avançar sem gerar o contrato
    When clicar no botão para Gerar Contrato
    Then o Contrato deverá ser exibido
    And o botão Avançar liberado para Assinatura Digital

@AssinaturaDigital
Scenario: Validar as Informações exibidas na Tela e gerar Boleto após a conclusão da Assinatura Digital
    Given o acesso a tela "Assinatura Digital"
    And as informações do beneficiário exibidas em tela
    And o status da Assinatura Digital em "Pendente de Envio"
    And exibir a Mensagem de Erro ao tentar Avançar sem realizar Assinatura Digital
    When solicitar Assinatura Digital
    Then exibir Mensagem de Erro ao tentar Avançar com Status "Enviado"
    And o status deverá ser trocado de "ENVIADO" para "CONCLUIDO"
    And exibir Mensagem de Erro ao tentar Avançar sem gerar o Boleto
    And o botão de Gerar Boleto deverá ser exibido gerando um boleto
    And permitirá avançar para a tela "Impressão da Carteirinha" sem exibir mensagem de erro

@ImpressaoCarteirinha
Scenario: Realizar o Envio do Kit de Boas Vindas e Impressao da Carteirinha
    Given o acesso a tela "Impressão da Carteirinha"
    When cliclar em "Avançar" deverá exibir mensagem de erro referente a Impressão
    And clicar em "Gerar PDF"
    And cliclar em "Avançar" deverá exibir mensagem de erro referente ao Kit.
    And clicar em "ENVIAR KIT"
    Then exibirá Mensagem de Sucesso no Envio do Kit 
    And permitirá avnaçar para a tela "Pagamento"

@Pagamento
Scenario: Validar e Finalizar a Venda
    Given o acesso a tela "Pagamento"
    When validar as informações
    And clicar em "Finalizar Pagamento"
    Then a venda será concluída




