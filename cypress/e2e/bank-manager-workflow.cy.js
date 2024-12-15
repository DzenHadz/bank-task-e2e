import BankManagerHomePage from "../page-object/bank-manager/bank-home.page";
import AddCustomerPage from "../page-object/bank-manager/add-customer.page";
import CustomersPage from "../page-object/bank-manager/customers.page";
import OpenAccountPage from "../page-object/bank-manager/open-account.page";
import { faker } from "@faker-js/faker";

const bankHome = new BankManagerHomePage();
const addCustomer = new AddCustomerPage();
const customer = new CustomersPage();
const openAccount = new OpenAccountPage();

describe("Bank manager workflow", () => {
  const testCustomer = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postCode: faker.location.zipCode(),
  };

  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/");
    cy.loginAsBankManager();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("Add Customer", () => {
    bankHome.addCustomerButton.should("be.visible");
    bankHome.addCustomerButton.click();

    cy.url().should("contain", "/manager/addCust");
    addCustomer.formWrapper.should("be.visible");
    addCustomer.enterFormData(testCustomer);
    addCustomer.submitButton.click();
    cy.on("window:alert", (str) => {
      expect(str).to.contains(`Customer added successfully with customer id`);
    });
    // Verify that user is presented in Customers table
    bankHome.customersButton.click();
    customer.searchInput.should("be.visible");
    customer.validateUsersIsPresent(testCustomer);
  });

  it("Open customer account", () => {
    bankHome.openAccountButton.click();
    openAccount.selectAccountDropdown.select(
      testCustomer.firstName + " " + testCustomer.lastName
    );
    openAccount.currencyDropdown.select("Dollar");
    openAccount.processButton.click();
    cy.on("window:alert", (str) => {
      expect(str).to.contains(
        `Account created successfully with account Number`
      );
      const accountId = str.match(/:(\d+)/)[1];
      cy.task("setAccountId", accountId);
    });
    bankHome.customersButton.click();

    cy.task("getAccountId").then((id) => {
      customer.validateUserHaveAccountId(testCustomer, id);
    });
  });
});
