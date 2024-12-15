import BasePage from "../base.page";

export default class CustomerHome extends BasePage {
  get accountName() {
    return cy.get('strong > span[class="fontBig ng-binding"]');
  }

  get accountNumber() {
    return cy.get(
      'div > div[ng-hide="noAccount"]:nth-child(3) > strong:nth-child(1)'
    );
  }

  get balanceNumber() {
    return cy.get(
      'div > div[ng-hide="noAccount"]:nth-child(3) > strong:nth-child(2)'
    );
  }

  get currency() {
    return cy.get(
      'div > div[ng-hide="noAccount"]:nth-child(3) > strong:nth-child(3)'
    );
  }

  get transactionButton() {
    return cy.get('button[ng-click="transactions()"]');
  }

  get depositButton() {
    return cy.get('button[ng-click="deposit()"]');
  }

  get withdrawlButton() {
    return cy.get('button[ng-click="withdrawl()"]');
  }
}
