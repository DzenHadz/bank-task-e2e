const { defineConfig } = require("cypress");


let accountId;

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    baseUrl: 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
      require("cypress-localstorage-commands/plugin")(on, config);
      on('task', {
        getAccountId() {
          return accountId;
        },
        setAccountId: val => {
          accountId = val;
          return null;
      }});
    },
  },
});
