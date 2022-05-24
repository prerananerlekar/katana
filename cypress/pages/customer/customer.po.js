import  customerLocator from '../../locators/customer.json';
import commonLocator from '../../locators/common.json';
import common from '../../fixtures/common.json';
export class CustomerPage{

    addCustomer(firstName,lastName,company){
        cy.get(commonLocator.globalAddButton).click();
        cy.get(customerLocator.addCustomerButton).should('be.visible');
        cy.get(customerLocator.addCustomerButton).click();
        this.addCustomerDetails(firstName,lastName,company)

    }

    addBillingAddress() {
        cy.findByTestId(customerLocator.billingAddress).click();
        cy.get(customerLocator.addressDetails.addressHeader).should('contain.text',common.billingAddressDetails.addressTitle);
        this.billingAddressDetails();
    }

    addShippingAddress() {
        cy.findByTestId(customerLocator.shippingAddress).click();
        cy.get(customerLocator.addressDetails.addressHeader).should('contain.text', common.shippingAddressDetails.addressTitle);
        this.shippingAddressDetails();
    }
        submitAddress(){

            cy.get(customerLocator.addressDetails.submitAddress).should('be.visible');
            cy.get(customerLocator.addressDetails.submitAddress).click();
        }

        validateBillingAddress(){
            cy.findByTestId(customerLocator.billingAddress).within(()=>{
                cy.findByTestId(customerLocator.contactInformation).should('contain.text', common.billingAddressDetails.firstName +
                    " " + common.billingAddressDetails.lastName + ", "
                    + common.billingAddressDetails.company);
                cy.findByTestId(customerLocator.addressInformation).should("contain.text",
                    common.billingAddressDetails.addressLine1 + ", " + common.billingAddressDetails.addressLine2 + ", "
                    + common.billingAddressDetails.city + ", " + common.billingAddressDetails.state + ", "
                    + common.billingAddressDetails.zip + ", " + common.billingAddressDetails.country);
                cy.findByTestId(customerLocator.phoneInformation).should("contain.text", common.billingAddressDetails.phone);
            });
        }

        validateShippingAddress(){
            cy.findByTestId(customerLocator.shippingAddress).within(()=>{
                cy.findByTestId(customerLocator.contactInformation).should('contain.text', common.shippingAddressDetails.firstName + " " +
                    common.shippingAddressDetails.lastName + ", " + common.shippingAddressDetails.company);
                cy.findByTestId(customerLocator.addressInformation).should("contain.text",
                    common.shippingAddressDetails.addressLine1 + ", " + common.shippingAddressDetails.addressLine2 + ", "
                    + common.shippingAddressDetails.city + ", " + common.shippingAddressDetails.state + ", "
                    + common.shippingAddressDetails.zip + ", " + common.shippingAddressDetails.country);
                cy.findByTestId(customerLocator.phoneInformation).should("contain.text", common.shippingAddressDetails.phone);
            });
        }

        addCustomerDetails(firstName,lastName,company){
            cy.findByTestId(customerLocator.firstName).click().type(firstName);
            cy.findByTestId(customerLocator.lastName).click().type(lastName);
            cy.findByTestId(customerLocator.companyName).click().type(company);
            cy.get(customerLocator.displayName).should("contain.value",firstName+" "+lastName);
        }

        billingAddressDetails() {


            cy.get(customerLocator.addressDetails.addressDialogLocator).within(() => {
                cy.get(customerLocator.addressDetails.firstName).click().type(common.billingAddressDetails.firstName);
                cy.get(customerLocator.addressDetails.lastName).click().type(common.billingAddressDetails.lastName);
                cy.get(customerLocator.addressDetails.companyName).click().type(common.billingAddressDetails.company);
                cy.get(customerLocator.addressDetails.addressLine1).click().type(common.billingAddressDetails.addressLine1);
                cy.get(customerLocator.addressDetails.addressLine2).click().type(common.billingAddressDetails.addressLine2);
                cy.get(customerLocator.addressDetails.city).click().type(common.billingAddressDetails.city);
                cy.get(customerLocator.addressDetails.state).click().type(common.billingAddressDetails.state);
                cy.get(customerLocator.addressDetails.country).click().type(common.billingAddressDetails.country);
                cy.get(customerLocator.addressDetails.zip).click().type(common.billingAddressDetails.zip);
                cy.get(customerLocator.addressDetails.phone).click().type(common.billingAddressDetails.phone);
            });
        }
          shippingAddressDetails(){
                cy.get(customerLocator.addressDetails.addressDialogLocator).within(() => {
                    cy.get(customerLocator.addressDetails.firstName).click().type(common.shippingAddressDetails.firstName);
                    cy.get(customerLocator.addressDetails.lastName).click().type(common.shippingAddressDetails.lastName);
                    cy.get(customerLocator.addressDetails.companyName).click().type(common.shippingAddressDetails.company);
                    cy.get(customerLocator.addressDetails.addressLine1).click().type(common.shippingAddressDetails.addressLine1);
                    cy.get(customerLocator.addressDetails.addressLine2).click().type(common.shippingAddressDetails.addressLine2);
                    cy.get(customerLocator.addressDetails.city).click().type(common.shippingAddressDetails.city);
                    cy.get(customerLocator.addressDetails.state).click().type(common.shippingAddressDetails.state);
                    cy.get(customerLocator.addressDetails.country).click().type(common.shippingAddressDetails.country);
                    cy.get(customerLocator.addressDetails.zip).click().type(common.shippingAddressDetails.zip);
                    cy.get(customerLocator.addressDetails.phone).click().type(common.shippingAddressDetails.phone);
                });
            }



}