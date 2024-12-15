export default class BasePage {
  get homeButton() {
    return cy.get('.mainhdr button.home');
  }
}
