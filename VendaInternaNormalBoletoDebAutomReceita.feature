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
    And o usuário checar para "Sim" o item "Pode consultar pessoa fisica receita federal?"
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
    And Um pré-beneficiário gerado
    When inserir o CPF do Beneficiário, Nome e Data de Nascimento deverão ser preenchidos automaticamente
    And preencher os demais campos da tela
    Then Nome e Data de Nascimento deverão ter sido preenchidos automaticamente'
    And a tela permitirá avançar para a tela "Dados do Beneficiário"

@DadosBeneficiario
Scenario: Preencher os Dados do Beneficiario
    Given o acesso a tela "Dados do Beneficiario" com o Nome, CPF, data de nascimento E Nome da Mãe já preenchidos da RF
    When preencher os dados do beneficiário
    And preencher o campo dos Cuidados Anteriores
    And O campos"Nome Social" deverá ficar vazio e o Gênero Social como "Nenhum"
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
Scenario: Validar as Informações preenchidas nas telas Anteriores
    Given o acesso a tela "Conferência de Arquivos"
    When preencher a "Parceria da Venda"  e Assinatura Digital como "sim"
    AND preencher a forma de pagamento da Adesão como Boleto
    AND preencher a forma de pagamento da Mensalidade como Débito Automático
    Then as informações do Beneficiário preenchida em telas anteriores deverão ser validadas
    And O campos"Nome Social" deverá ficar vazio e o Gênero Social como "Nenhum"
    AND as informações referente ao Débito Automático deverão ser validadas
    AND a justificativa da declaração de Saúde deverá ser validada
    AND permitirá o avanço para a tela "Revisão"

@Revisão
Scenario: Validar as Informações preenchidas nas telas Anteriores, incluindo Conferência
    Given o acesso a tela "Revisão do beneficiário"
    When os dados do Proponente deverão ser validados
    And O campos"Nome Social" deverá ficar vazio e o Gênero Social como "Nenhum"
    AND o Termo Aditivo deverá ser validado
    AND a Assinatuta Digital deverá ser validada
    AND a Forma de Pagamento da Adesão e Mensalidade deverão ser validadas
    AND as informações referente ao Débito Automático deverão ser validadas
    AND a justificativa da declaração de Saúde deverá ser validada
    THEN permitirá o avanço para a tela "Impressão do Contrato"

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




