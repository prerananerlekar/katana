import {CustomerPage} from "../../pages/customer/customer.po";
import {LoginPage} from "../../pages/login.po";
import customerLocator from "../../locators/customer.json"
import customerData from "../../fixtures/customer.json"

describe('Add Customer',()=> {

    const customer = new CustomerPage();
    const login = new LoginPage();

    before(() => {
        login.login();
    });

    it('User can add the customer without adding the Address',()=>{
        customer.addCustomer(customerData.firstName,customerData.lastName,customerData.companyName);
        cy.findByTestId(customerLocator.headerName).should("contain.text",customerData.firstName+" "+customerData.lastName)
    });

    it('Address information should not be saved if user cancels the actions',()=>{
        customer.addCustomer(customerData.firstName,customerData.lastName,customerData.companyName);
        cy.findByTestId(customerLocator.headerName).should("contain.text",customerData.firstName+" "+customerData.lastName);
        customer.addBillingAddress();
        cy.get(customerLocator.addressDetails.cancel).should('be.visible');
        cy.get(customerLocator.addressDetails.cancel).click();
        cy.findByTestId(customerLocator.billingAddress).should('have.value','');
    });

    it('User can add the customer with Address',()=>{
        customer.addCustomer(customerData.firstName,customerData.lastName,customerData.companyName);
        cy.findByTestId(customerLocator.headerName).should("contain.text",customerData.firstName+" "+customerData.lastName);
        customer.addBillingAddress();
        customer.submitAddress();
        customer.validateBillingAddress();
        cy.get(customerLocator.defaultShippingAddress).invoke('attr', 'placeholder').should('contain',"Same as billing address");
    });

    it('User can add different billing and shipping address while creating a customer', () => {

        customer.addCustomer(customerData.firstName,customerData.lastName,customerData.companyName);
        cy.findByTestId(customerLocator.headerName).should("contain.text", customerData.firstName + " " + customerData.lastName);
        customer.addBillingAddress();
        customer.submitAddress();
        customer.validateBillingAddress();
        customer.addShippingAddress();
        customer.submitAddress();
        customer.validateShippingAddress();
    });


});