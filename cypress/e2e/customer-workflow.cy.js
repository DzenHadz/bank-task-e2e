import CustomerLogin from '../page-object/customer/customer-login.page';
import CustomerHome from '../page-object/customer/customer-home.page';
import DepositPage from '../page-object/customer/deposit.page';
import { faker } from '@faker-js/faker';
import { findKey } from '../utils/findKey';

const customerLogin = new CustomerLogin();
const home = new CustomerHome();
const deposit = new DepositPage();

describe('Customer workflow login', () => {
  const testCustomer = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postCode: faker.location.zipCode(),
    balance: faker.number.int({ min: 1500, max: 6000 }),
    accountCurrency: 'Dollar',
  };

  beforeEach(() => {
    cy.visit('/');
    cy.addUserWithAccount(testCustomer);
    cy.loginAsCustomer();
    customerLogin.selectUser.select(
      testCustomer.firstName + ' ' + testCustomer.lastName,
    );
    customerLogin.submitButton.click();
  });

  it('Login as Customer', () => {
    home.accountName.should(
      'contain',
      testCustomer.firstName + ' ' + testCustomer.lastName,
    );
    home.balanceNumber.should('have.text', testCustomer.balance);
    home.currency.should('have.text', testCustomer.accountCurrency);
  });

  it('Transaction Validation', () => {
    const amount = 50;
    home.depositButton.click();
    home.balanceNumber.invoke('text').then(val => {
      cy.wrap(val).as('initialAccountBalance');
    });
    deposit.depositAmount.type(amount);
    deposit.depositButton.click();
    // Validate transaction in UI
    deposit.successMessage.should('have.text', 'Deposit Successful');
    cy.get('@initialAccountBalance').then(initialAccountBalance => {
      home.balanceNumber.invoke('text').then(newAccountBalance => {
        expect(parseInt(newAccountBalance)).to.equal(
          parseInt(initialAccountBalance) + amount,
        );
      });
    });

    // Verify transactions in local storage
    deposit.transactionButton.click();
    home.accountNumber.invoke('text').then(val => {
      cy.window().then(win => {
        const transactions =
          JSON.parse(win.localStorage.getItem('Transaction')) || {};

        let myTransactions = findKey(transactions, parseInt(val));
        expect(myTransactions[0].amount).to.equal(amount);
        expect(myTransactions[0].success).to.equal(true);
        expect(myTransactions[0].deposit).to.equal(true);
        expect(myTransactions[0].type).to.equal('Credit');
      });
    });
  });
});
