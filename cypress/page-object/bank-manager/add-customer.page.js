import BankManagerHomePage from "./bank-home.page";

export default class AddCustomerPage extends BankManagerHomePage {
  get formWrapper() {
    return cy.get('form[ng-submit="addCustomer()"]');
  }

  get firstName() {
    return this.formWrapper.find('input[ng-model="fName"]');
  }

  get lastName() {
    return this.formWrapper.find('input[ng-model="lName"]');
  }

  get postCode() {
    return this.formWrapper.find('input[ng-model="postCd"]');
  }

  get submitButton() {
    return this.formWrapper.find('button[type="submit"]');
  }

  enterFormData(data) {
    this.firstName.type(data.firstName);
    this.lastName.type(data.lastName);
    this.postCode.type(data.postCode);
  }
}
