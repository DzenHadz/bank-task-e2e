Cypress.Commands.add("loginAsCustomer", () => {
  cy.get('button[ng-click="customer()"]').click();
  cy.url().should('contain',"/customer");
});

Cypress.Commands.add("loginAsBankManager", () => {
  cy.get('button[ng-click="manager()"]').click();
  cy.url().should('contain', "/manager");
});

Cypress.Commands.add('createNewCustomer', () => { 
    cy.window().then(item => { 
        console.log(item)
    })
});