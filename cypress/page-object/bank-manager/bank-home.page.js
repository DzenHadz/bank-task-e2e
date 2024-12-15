import BasePage from '../base.page';

export default class BankManagerHomePage extends BasePage {
  get addCustomerButton() {
    return cy.get('div.center  button[ng-click="addCust()"]');
  }

  get openAccountButton() {
    return cy.get('div.center  button[ng-click="openAccount()"]');
  }

  get customersButton() {
    return cy.get('div.center  button[ng-click="showCust()"]');
  }
}
