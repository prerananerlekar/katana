import {LoginPage} from "../pages/login.po";
import sell from "../locators/sales.json";

describe('Login Tests',()=>{

    const login = new LoginPage();

    it('User can login into trial system',()=>{
       login.login();
        cy.get(sell.sellIcon).should('have.attr',"aria-selected","true");
        cy.get(sell.salesListing).should('be.visible');

    });
})