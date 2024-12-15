import BankManagerHomePage from "./bank-home.page";

export default class OpenAccountPage extends BankManagerHomePage {
  get selectAccountDropdown() {
    return cy.get("#userSelect");
  }

  get currencyDropdown() {
    return cy.get("#currency");
  }

  get processButton() {
    return cy.get('button[type="submit"]').contains("Process");
  }
}
