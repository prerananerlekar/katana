import salesLocator from '../../locators/sales.json';
import salesData from '../../fixtures/sales.json'
import commonLocator from '../../locators/common.json'
import customerLocator from "../../locators/customer.json";
import {CustomerPage} from "../customer/customer.po";
const  customer = new CustomerPage();

export class SalesPage{


	createCustomerforSalesOrder(fname,lname,company){
		customer.addCustomer(fname,lname,company);
		cy.findByTestId(customerLocator.headerName).should("contain.text", fname + " " + lname);
	}

	navigateToSalesOrder(){
		cy.get(commonLocator.globalAddButton).click();
		cy.get(salesLocator.salesOrder).should('be.visible');
		cy.get(salesLocator.salesOrder).click();
	}

	fetchUser(firstName,lastName){
		cy.get(salesLocator.customer).click().type(firstName+" "+lastName);
		cy.get(salesLocator.userLoadingIcon).should('be.visible');
		cy.get(salesLocator.selectOption).should('be.visible');
	}

	addBillingAddress(){
		cy.findByTestId(salesLocator.billingAddress).click();
		customer.billingAddressDetails();
		customer.submitAddress();
		cy.findByText(salesData.dataSaved).should('be.visible');
	}

	addShippingAddress(){
		cy.findByTestId(salesLocator.shippingAddress).click();
		customer.shippingAddressDetails();
		customer.submitAddress();
		cy.findByText(salesData.dataSaved).should('be.visible');
	}
	validateAddress(fname, lname, company, addressLine1, addressLine2, city, state, zip, country, phone){
		cy.findByTestId(salesLocator.addressLine1,{timeout:2000}).should('contain.text',fname + " "
																					+ lname + ", " + company);
		cy.findByTestId(salesLocator.addressLine2).should("contain.text",
			addressLine1 + ", " + addressLine2 + ", "
			+ city + ", " + state + ", "
			+ zip + ", " + country);
		cy.findByTestId(salesLocator.addressLine3).should("contain.text", phone);
	}
}