import {Given, When, Then} from "cypress-cucumber-preprocessor/steps";
import login from '../pages/login/';
import parametrosVenda from "../pages/parametrosVenda";

//Realizar Login
Given(/^o acesso para a tela principal do Portal Web em Homologação$/, () => {
      login.acessarValidarTelaLogin();
});

When(/^o usuário insere o usuário e a senha do Vendedor$/, () => {
      login.realizarLogin();
});

Then(/^o acesso é concedido para a tela principal$/, () => {
      login.validarAcessoRealizado();
});

//Configurar a tela Parâmetros da Venda
Given(/^o acesso para a tela "([^"]*)"$/, (args1) => {
	console.log(args1);
	parametrosVenda.acessarTela();
});

When(/^o usuário checar para "([^"]*)" o item "([^"]*)"$/, (args1,args2) => {
	console.log(args1,args2);     
      parametrosVenda.getIframe();
	parametrosVenda.checarDebito();
});

When(/^o usuário checar para "([^"]*)" o item "([^"]*)"$/, (args1,args2) => {
	console.log(args1,args2);
	parametrosVenda.checarReceita();
});

Then(/^deve salvar as confiugurações estabelecidas$/, () => {
     parametrosVenda.salvarMudancas();
});

