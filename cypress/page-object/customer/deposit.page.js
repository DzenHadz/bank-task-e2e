import CustomerHome from './customer-home.page';

export default class DepositPage extends CustomerHome {
  get depositAmount() {
    return cy.get('form[ng-submit="deposit()"] input');
  }

  get depositButton() {
    return cy.get('button[type="submit"]').contains('Deposit');
  }

  get successMessage() {
    return cy.get('span[ng-show="message"]');
  }
}
