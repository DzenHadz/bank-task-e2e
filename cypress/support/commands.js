Cypress.Commands.add("loginAsCustomer", () => {
  cy.get('button[ng-click="customer()"]').click();
  cy.url().should("contain", "/customer");
});

Cypress.Commands.add("loginAsBankManager", () => {
  cy.get('button[ng-click="manager()"]').click();
  cy.url().should("contain", "/manager");
});

Cypress.Commands.add("createNewCustomer", () => {
  cy.window().then((item) => {
    console.log(item);
  });
});

Cypress.Commands.add("addUserWithAccount", (user) => {
  cy.window().then((win) => {
    // Retrieve existing users and accounts from localStorage
    const users = JSON.parse(win.localStorage.getItem("User")) || {};
    const accounts = JSON.parse(win.localStorage.getItem("Account")) || {};

    // Generate a new User ID
    const newUserId =
      Object.keys(users).length > 0
        ? Math.max(...Object.keys(users).map(Number)) + 1
        : 1;

    // Generate a new Account Number
    const newAccountNo =
      Object.keys(accounts).length > 0
        ? Math.max(...Object.keys(accounts).map(Number)) + 1
        : 1001;

    // Add the new user
    users[newUserId] = {
      fName: user.firstName,
      lName: user.lastName,
      postCd: user.zipCode,
      id: newUserId,
      date: new Date().toISOString(),
      accountNo: [newAccountNo], // Link the account directly
      $$hashKey: `object:${newUserId}`,
    };

    // Add the associated account
    accounts[newAccountNo] = {
      accountNo: newAccountNo,
      currency: user.accountCurrency,
      userId: newUserId,
      date: new Date().toISOString(),
      amount: user.balance,
    };

    // Save updated data back to localStorage
    win.localStorage.setItem("User", JSON.stringify(users));
    win.localStorage.setItem("Account", JSON.stringify(accounts));
    cy.reload();
  });
});
