import gerarPessoaAleatorio, { gerarNomeFerminino, gerarNomeMasculino } from './geradores/geradorPessoas.js';
import gerarCNS from './geradores/geradorCNS.js';
import gerarCPF from './geradores/geradorCpf.js';

var dataParaSomar = verificarDiaSomar();

function verificarDiaSomar() {
  let hoje = new Date();
  let dia = hoje.getDate();
  if (dia >= 27) {
    return 30;
  } else {
    return hoje.getDate()+4;
  }
}

describe('Venda Normal / Boleto / Assinatura Digital (s/ assinatura com Unico) / Vendedor Interno'
  + '/ Com Débito Automático', function () {

    it('Realizar Login', function () {
      cy.on("uncaught:exception", (e, runnable) => {
        console.log("error", e);
        console.log("runnable", runnable);
        return false;
      });
      cy.visit(Cypress.env('site'));
      cy.get('#login').type(Cypress.env('user_name'));
      cy.get('#passwd').type(Cypress.env('user_password'));
      cy.get('#btn-validar')
        .click();
      cy.get('[unselectable="on"]').should('be.visible')
      cy.wait(5000)
      // cy.iframe('#ug-modal-frame').invoke('hide')
      // cy.get('[pointer-events="all"]').invoke('hide')
    })

    it('Habilitando Débito Automático e Desabilitando Conferência com a Receita Federal', function () {
      cy.get(".application-menu-area ").click()
      cy.get('[data-aplicacao-contexto="vendas"] > .fa').click()
      cy.get('.hamburguer-menu-area').should('be.visible').click()
      cy.get('[data-menu-item-id="34"] > .menu__link').should('be.visible').click()
      cy.get('[data-menu-item-id="35"] > .menu__link').should('be.visible').click()
      cy.wait(2000)
      cy.iframe('[class="child-page atual"]')
        .as('iframe')
        .find('#item-is_consultar_pessoa_fisica_receita_federal-VENDAS > :nth-child(4) > .default').click()
      cy.get('@iframe')
        .find('#item-is_consultar_pessoa_fisica_receita_federal-VENDAS > :nth-child(4) > .prevent').should('be.checked')
      cy.get('@iframe')
        .find('#item-debito_automatico_forma_pagamento_mensalidades_habilitado-VENDAS > :nth-child(3) > .default').click()
      cy.get('@iframe')
        .find('#item-debito_automatico_forma_pagamento_mensalidades_habilitado-VENDAS > :nth-child(3) > .prevent').should('be.checked')
      cy.get('@iframe')
        .find('#save').click();
      cy.wait(5000)
      cy.get('.icon-logo-prevent-senior').click();
      cy.wait(2000)
    })

    it('Acessar Nova Venda', function () {
      cy.iframe('[class="child-page atual"]')
        .find('#uTicket')
        .invoke('attr', 'value').then($ticket => {
          let ticketPortal = $ticket;
          let site = Cypress.env('site2');
          cy.visit(`${site}vendas/triagem?ticket=${ticketPortal}&menuAcesso=29`)
        })
      cy.contains('Nova Venda').should('be.visible');
    })

    //Indice de repetição - A venda repetirá a partir desse ponto após a primeira passagem por todo fluxo.
    Cypress._.times(1, (n) => {

      it('### Início da Venda: ' + (n + 1) + ' ### -- Preencher e Buscar Tela Triagem', function () {
        cy.get('#nomeCpf').type('Teste Com Débito Automático by CYPRESS');
        cy.get('#buscar')
          .click()
      })
      it('Preenchendo o Formulário de Contato', function () {
        cy.get('#novo-cadastro').should('be.visible')
          .click()
        cy.contains('Formulário de Contato').should('be.visible')
        cy.get('#celular')
          .type('11111111111')
        cy.get('#valor-idade')
          .type('33')
        cy.get('#comoConheceu').select(1)
        cy.get('#parentesco').select(1)
        cy.get('#checkboxPropaganda input[type="checkbox"]').invoke('show').check('1')
        cy.get('#checkboxPropaganda input[type="checkbox"]')
          .invoke('hide')
        cy.get('#observacao')
          .type('Teste')
      })

      it('Avançar para o Pré-Cadastro', function () {
        cy.get('#venda')
          .click();
      })

      it('Preenchendo o Pré-Cadastro', {
        retries: {
          openMode: 2,
          runMode: 2,
        },
      }, function () {
        cy.get('#prebeneficiario-cpf').type(gerarCPF().semMascara);
        cy.get('#data-nascimento').type('16/09/1951');
        cy.get('#parceriaVenda').select("Nenhuma");
        cy.get('#planos-area').find('label').should('have.class', 'planos').and('be.visible');
        cy.get('[type="radio"]').invoke('show').check('3195')
        cy.get('[type="radio"]').invoke('hide')
        cy.get('[id="PREVENT SENIOR PREMIUM 1002 ENFERMARIA"]').click()
      })

      it('Preenchendo Dados do Beneficiário', function () {
        var pessoa = gerarPessoaAleatorio();
        var nomeMae = gerarNomeFerminino().nome;
        var nome = pessoa.nome;
        var sexo = pessoa.sexo;
        cy.get('#avancar').click();
        cy.contains('Dados do Beneficiário').should('be.visible');
        cy.get('[name="preBeneficiario.nome"]').clear().type(nome);
        cy.get('[name="preBeneficiario.estadoCivilE.id"]').select(1);
        cy.get('[name="preBeneficiario.nomeMae"]').type(nomeMae);
        cy.get('[name="preBeneficiario.rg"]').type('45.045.322-4608')
        cy.get('[name="preBeneficiario.cns"]').type(gerarCNS());
        cy.get('[name="preBeneficiario.sexo"]').select(sexo);
        cy.get('[name="preBeneficiario.orgaoEmissor"]').select(1);
        cy.get('[name="preBeneficiario.profissao"]').invoke("show");
        cy.get('[class="atualizar-profissao"]')
          .within(() => {
            return cy.get('div').should('have.class', 'selectize-control obrigatorio default tags-select single')
              .first()
              .click().type("ACESSOR {enter}")
          })
        cy.get('[name="preBeneficiario.ufOrgaoEmissor"]').select(26);
        cy.get('[name="preBeneficiario.email"]').type(Cypress.env('emailAndre'));
        cy.get('[name="preBeneficiario.endereco.cep"]').type(Cypress.env('cep'));
        cy.get('[name="preBeneficiario.endereco.logradouro"]').invoke('val').should('not.be.empty')
        cy.get('[name="preBeneficiario.endereco.numero"]').type("67");
        cy.get("#trasf-endereco").click({ force: true }).should('be.checked');
        cy.get('[name="preBeneficiario.tipoCuidadoAnterior"]').select(1);
        cy.get('#radioDebitoAutomaticoSim').invoke('show').check('true').should('be.checked');
        cy.get('#utilizar-dados-do-beneficiario').invoke('show').check();
        cy.get('#banco_debito_automatico').select('341');
        cy.get('#agencia_debito_automatico').type(Cypress.env('agencia'));
        cy.get('#conta_debito_automatico').type(Cypress.env('cc'));
      })

      it('Validação do Débito Automático - Exibição do alerta de Atenção', function () {
        cy.get('[class="aviso aviso-atencao"]').should('be.visible');
      })

      it('Validação da Mensagem de erro ao tentar avançar removendo o check para envio de arquivos', function () {
        cy.get('#documentos').uncheck({ force: true }).should('not.be.checked');
        cy.get('#saveAndNext').click();
        cy.get('#noty_bottomFooter_layout_container').should('be.visible')
        cy.get('#documentos').check({ force: true }).should('be.checked');
      })

      it('Enviando Arquivo', function () {
        cy.get('#saveAndNext').click();
        cy.get('input[type="file"]').as('fileInput');
        cy.get('@fileInput').attachFile('cpf.png');
        cy.get('.noty_title').should('be.visible');
      })

      it('Preenchendo Declaração de Saúde', function () {
        cy.get('#avancar').click();
        cy.get('[data-icone="user"]').contains('Declaração de Saúde').should('be.visible');
        cy.get('#lbl-option-sim-3-2893').click({ force: true });
        cy.get('#text-2893').type("Teste Justificariva Automação");
      })

      it('Agendamento da Assinatura', function () {
        cy.get('#save').click();
        cy.get(`#dia-${dataParaSomar}`).click({ force: true }).should('be.checked');
      })

      it('Preencher Conferência e Revisão', function () {
        cy.wait(2000);
        cy.get('#saveAndNext').click();
        cy.get('[data-icone]').contains('Conferência de informações').should('be.visible');
        cy.get('#parceriaVenda').select("Nenhuma");
        cy.get('#selectAssinaturaDigital').select("Sim");
        cy.get('#selectFormaPagamento').select("Boleto");
        cy.get('[name="preBeneficiario.formaPagamentoMensalidade"]').find('option:selected').should('have.text', 'Débito automático');
      })

      it('Não pode existir a opção de Boleto', function () {
        cy.get('[name="preBeneficiario.formaPagamentoMensalidade"]').should('not.have.text', 'Boleto').screenshot();
      })

      it('Finalizar Conferência e Ir para Revisão', function () {
        cy.get("#save").click();
        cy.get('[data-icone="user"]').contains('Revisão do beneficiário').should('be.visible');
      })

      it('Impressão do Contrato', function () {
        cy.get("#save").click();
        cy.get('[data-icone]').contains('Impressão do Contrato').should('be.visible');
        cy.get('#printContratoViaProponente').click();
        cy.get('[class="fancybox-skin"]').should('be.visible');
        cy.wait(5000);
        cy.get('[class="fancybox-skin"]')
          .within(() => {
            return cy.get('div').should('have.class', 'fancybox-item fancybox-close')
              .last()
              .click();
          })
      })

      it('Assinatura Digital', function () {
        cy.on("uncaught:exception", (e, runnable) => {
          console.log("error", e);
          console.log("runnable", runnable);
          return false;
        });
        cy.get('#avancar').click();
        cy.get('[data-icone]').contains('Envelope - Assinatura digital').should('be.visible');
        const id = cy.get('[name="itinerario.beneficiario.id"]')
          .invoke('attr', 'value').then($id => {
            let siteAssinaturaDigital = Cypress.env('siteAssinaturaDigital');
            let idUsuario = $id;
            cy.get('#assinatura-digital').click();
            cy.get('[class="painel-name"]').contains('Painel de vendas').should('be.visible');
            cy.visit(`${siteAssinaturaDigital}${idUsuario}`)
            let status = "CONCLUIDO";
            let statusEnviado = "ENVIADO";
            cy.task('executeDbStatement', {
              statement: `update vendas.info_documento_venda_envelope set STATUS = '` + status + `' where ID_PRE_BENEFICIARIO=${idUsuario} AND STATUS='` + `${statusEnviado}'`,
            })
          })
        cy.reload();
        cy.get('#printBoleto').click();

        cy.get('[class="fancybox-iframe"]').then(($iframe) => {

          const iframe = $iframe.contents();
          cy.stub(iframe[0].defaultView, 'print').as('printStub');
        });

        cy.get('@printStub').should('not.be.called');

        cy.wait(5000)

        cy.get('[class="fancybox-skin"]')
          .within(() => {
            return cy.get('div').should('have.class', 'fancybox-item fancybox-close')
              .last()
              .click();
          })
      })

      it('Avançar para tela da Carteirinha', function () {
        cy.get('#avancar').click();
      })

      it('Impressão da Carteirinha', {
        retries: {
          runMode: 2,
          openMode: 2,
        },
      }, function () {
        cy.contains('Impressão da carteirinha').should('be.visible');
        cy.get('#enviar-kit').click();
        cy.get('.noty_text').should('be.visible');
        cy.get('[type="radio"]').check('impressao_carteirinha_pdf').should('be.checked');
        cy.on('window:confirm', (str) => {
          expect(str).to.eq('Confirma a impressão da carteirinha?')
        })
      })

      it('Tela Pagamento e Finalização da Venda', function () {
        cy.get('#avancar').click();
        cy.get('[data-icone]').contains('Pagamento').should('be.visible');
        cy.get('#avancar').click();
        cy.get('[class="painel-name"]').contains('Painel de vendas').should('be.visible');
        cy.get('#uTicket')
          .invoke('attr', 'value').then($ticket => {
            let ticketPortal = $ticket;
            let site = Cypress.env('site2');
            cy.visit(`${site}vendas/triagem?ticket=${ticketPortal}&menuAcesso=29`)
          })
        cy.contains('Nova Venda').should('be.visible');
      })
      //  it('Ir para Nova Venda antes de finalizar ### UTILIZADO PARA VENDAS INCOMPLETAS ####', function(){
      //   cy.get('#ticket')
      //     .invoke('attr', 'value').then($ticket => {
      //       let ticketPortal = $ticket;
      //       let site = Cypress.env('site2');
      //       cy.visit(`${site}vendas/triagem?ticket=${ticketPortal}&menuAcesso=29`)
      //     })
      //   cy.contains('Nova Venda').should('be.visible');
      // })
    })
  })