import BankManagerHomePage from "./bank-home.page";

export default class CustomersPage extends BankManagerHomePage {
  get searchInput() {
    return cy.get('input[ng-model="searchCustomer"]');
  }

  get tableRow() {
    return cy.get('tbody > tr[ng-repeat*="cust in Customers"]');
  }

  validateUsersIsPresent(user) {
    this.searchInput.type(user.firstName);
    this.tableRow.should("have.length", 1);
    this.tableRow.should("have.length", 1);
    this.tableRow
      .find("td")
      .contains(user.firstName)
      .parent()
      .find("td:nth-child(2)")
      .contains(user.lastName);

    this.tableRow
      .find("td")
      .contains(user.firstName)
      .parent()
      .find("td:nth-child(3)")
      .contains(user.postCode);
  }

  validateUserHaveCorrectAccountId(user, accountId) {
    this.searchInput.type(user.firstName);
    this.tableRow.should("have.length", 1);
    this.tableRow
      .find("td")
      .contains(user.firstName)
      .parent()
      .find("td:nth-child(4)")
      .contains(accountId);
  }
}
