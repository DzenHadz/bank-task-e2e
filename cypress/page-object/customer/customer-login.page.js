import BasePage from "../base.page";

export default class CustomerLogin extends BasePage {
  get selectUser() {
    return cy.get('#userSelect');
  }

  get submitButton() {
    return cy.get('button[type="submit"]').contains("Login");
  }
}
