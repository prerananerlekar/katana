import {LoginPage} from "../../pages/login.po";
import {SalesPage} from "../../pages/salesOrder/sales.po";
import salesLocator from "../../locators/sales.json";
import salesData from "../../fixtures/sales.json";
import common from '../../fixtures/common.json'

describe('Sales Order',()=> {

	const login = new LoginPage();
	const sales = new SalesPage();

	before(() => {
		login.login();

	})

	it('User can create sales order for exiting customer',()=>{
		sales.createCustomerforSalesOrder(salesData.firstName,salesData.lastName,salesData.companyName)
		sales.navigateToSalesOrder();
		sales.fetchUser(salesData.firstName,salesData.lastName);
		cy.contains(salesLocator.optionValue, salesData.firstName + " " + salesData.lastName).click();
		cy.findByTestId(salesLocator.salesOrderHeader).should('contain', salesData.firstName + " " + salesData.lastName)
		cy.findByTestId(salesLocator.dropdown).within(()=>{
			cy.get(salesLocator.dropdownValue).type(salesData.orderItem);
		})
		cy.get(salesLocator.userLoadingIcon).should('be.visible');
		cy.get(salesLocator.selectOption).should('be.visible');
		cy.contains(salesLocator.optionValue, salesData.orderItemCode).click();
		cy.findByTestId(salesLocator.dropdown).should('contain',salesData.orderItemFullName);

	});

	it('User can create new Customer on sales order page',()=>{

		sales.navigateToSalesOrder();
		cy.contains(salesLocator.optionValue, 'Create new "'+ salesData.firstName2+' '+salesData.lastName2+'"').click();
		cy.findByText(salesData.dataSaved).should('be.visible');
	})

	it('User can add billing Address on sales order page',()=>{

		sales.navigateToSalesOrder();
		sales.fetchUser(salesData.firstName2,salesData.lastName2);
		cy.contains(salesLocator.optionValue, salesData.firstName2 + " " + salesData.lastName2).click();
		cy.findByText(salesData.dataSaved).should('be.visible');
		sales.addBillingAddress();
		cy.findByTestId(salesLocator.billingAddress).within(()=>{
		sales.validateAddress(common.billingAddressDetails.firstName,
			common.billingAddressDetails.lastName,
			common.billingAddressDetails.company,
			common.billingAddressDetails.addressLine1,
			common.billingAddressDetails.addressLine2 ,
			common.billingAddressDetails.city,
			common.billingAddressDetails.state ,
			common.billingAddressDetails.zip,common.billingAddressDetails.country,
			common.billingAddressDetails.phone);
			});
		});

	it('User can add shipping Address on sales order page',()=>{

		sales.navigateToSalesOrder();
		sales.fetchUser(salesData.firstName2,salesData.lastName2);
		cy.contains(salesLocator.optionValue, salesData.firstName2 + " " + salesData.lastName2).click();
		cy.findByText(salesData.dataSaved).should('be.visible');
		sales.addShippingAddress();
		cy.findByTestId(salesLocator.shippingAddress).within(()=>{
			sales.validateAddress(common.shippingAddressDetails.firstName,
				common.shippingAddressDetails.lastName,
				common.shippingAddressDetails.company,
				common.shippingAddressDetails.addressLine1,
				common.shippingAddressDetails.addressLine2 ,
				common.shippingAddressDetails.city,
				common.shippingAddressDetails.state ,
				common.shippingAddressDetails.zip,common.shippingAddressDetails.country,
				common.shippingAddressDetails.phone);
			});
		});
	})