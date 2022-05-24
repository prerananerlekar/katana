import credentials from '../fixtures/credentials.json';
import loginLocator from "../locators/login.json";

export class LoginPage{

    login(){
        cy.get(loginLocator.email).click().type(credentials.email);
        cy.get(loginLocator.password).click().type(credentials.password);
        cy.get(loginLocator.signin).click();
    }
}