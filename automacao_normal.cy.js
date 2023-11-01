import gerarPessoaAleatorio, { gerarNomeFerminino, gerarNomeMasculino } from './geradorPessoas.js';
import gerarCNS from './geradorCNS.js';
import gerarCPF from './geradorCpf.js';

var cpf = gerarCPF;
var cns = gerarCNS;
var nome = gerarPessoaAleatorio().nome;
var nomeMae = gerarNomeFerminino().nome;
var nomeMasculino = gerarNomeMasculino().nome;
var sexo = gerarPessoaAleatorio().sexo;

describe('Venda Normal', function () {

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
    cy.wait(2000)
    // cy.iframe('#ug-modal-frame').invoke('hide')
    // cy.get('[pointer-events="all"]').invoke('hide')
  })

  it('Conferindo e Desabilitando Conferência com a Receita Federal', function () {
    cy.get(".application-menu-area ").click()
    cy.get('[data-aplicacao-contexto="vendas"] > .fa').click()
    cy.get('.hamburguer-menu-area').should('be.visible').click()
    cy.get('[data-menu-item-id="34"] > .menu__link').should('be.visible').click()
    cy.get('[data-menu-item-id="35"] > .menu__link').should('be.visible').click()
    cy.wait(2000)
    cy.iframe('[class="child-page atual"]')
      .as('iframe')
      .find('#item-is_consultar_pessoa_fisica_receita_federal-VENDAS > :nth-child(3) > .default').click()
    cy.get('@iframe')
      .find('#item-is_consultar_pessoa_fisica_receita_federal-VENDAS > :nth-child(3) > .prevent').should('be.checked')
    cy.get('.icon-logo-prevent-senior').click()
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

  it('Preencher e Buscar Tela Triagem', function () {
    cy.get('#nomeCpf').type(nome);
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

  it('Preenchendo o Pré-Cadastro', function () {
    cy.get('#venda')
      .click()
    cy.get('#prebeneficiario-cpf').type(cpf);
    cy.get('#data-nascimento').type('16/09/1951');
    cy.get('#parceriaVenda').select("Nenhuma");
    cy.get('#planos-area').find('label').should('have.class', 'planos').and('be.visible');
    cy.get('[type="radio"]').invoke('show').check('3195')
    cy.get('[type="radio"]').invoke('hide')
    cy.get('[id="PREVENT SENIOR PREMIUM 1002 ENFERMARIA"]').click()
  })

  it('Preenchendo Dados do Beneficiário', function () {
    cy.get('#avancar').click();
    cy.get('[data-icone="user"]').contains('Dados do Beneficiário').should('be.visible');
    cy.get('[name="preBeneficiario.estadoCivilE.id"]').select(1);
    cy.get('[name="preBeneficiario.nomeMae"]').type(nomeMae);
    cy.get('[name="preBeneficiario.rg"]').type('45.045.322-4608')
    cy.get('[name="preBeneficiario.cns"]').type(cns);
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
  })

  it('Preenchendo Declaração de Saúde', function () {

    cy.get('#saveAndNext').click();
    cy.get('[data-icone="user"]').contains('Declaração de Saúde').should('be.visible');
    cy.get('#lbl-option-sim-3-2893').click({ force: true });
    cy.get('#text-2893').type("Teste Justificariva Automação");
  })

  it('Agendamento da Assinatura', function () {
    let hoje = new Date();
    let dia = hoje.getDate()+4;
    cy.get('#save').click();
    cy.get(`#dia-${dia}`).click({force: true}).should('be.checked');
  })

  it('Preencher Conferência', function() {
    cy.wait(2000);
    cy.get('#saveAndNext').click();
  })
})