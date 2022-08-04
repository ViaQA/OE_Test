
import {creds_tenant} from './Var';
import {creds_host} from './Var';

describe('Check Sign up form', () => {

    it( "Test sign up empty validation", ()=>{

        cy.visit(creds_host.host_url)
        cy.contains('Sign up').click()
        cy.get('[placeholder="First name"]').click()
        cy.get('[placeholder="Last name"]').click()
        cy.get('[placeholder="Email"]').click()
        cy.get('[placeholder="Password"]').click()
        cy.contains('Next').click()
        cy.xpath('//input[@placeholder="First name"]/following-sibling::div').should('have.text', 'Please enter a valid first name')
        cy.xpath('//input[@placeholder="Last name"]/following-sibling::div').should('have.text', 'Please enter a valid last name')
        cy.xpath('//input[@placeholder="Email"]/following-sibling::div').should('have.text', 'Email is a required field')
        cy.xpath('//input[@placeholder="Password"]/following-sibling::div').should('have.text', 'Password is a required field')
        cy.xpath("//span[text()='I confirm and agree to the']/child::a[text()='privacy policy']").should('have.attr', 'href', '/privacy-policy')
        cy.xpath("//span[text()='I confirm and agree to the']/child::a[text()='terms']").should('have.attr', 'href', '/terms-and-conditions')


    })


    it( "Test sign up must be at least 2 chracters", ()=>{

        cy.visit(creds_host.host_url)
        cy.contains('Sign up').click()
        cy.get('[placeholder="First name"]').type("q")
        cy.get('[placeholder="Last name"]').type("q")
        cy.get('[placeholder="Email"]').type("q")
        cy.get('[placeholder="Password"]').type("q")
        cy.contains('Next').click()
        cy.xpath('//input[@placeholder="First name"]/following-sibling::div').should('have.text', 'First name must be at least 2 chracters')
        cy.xpath('//input[@placeholder="Last name"]/following-sibling::div').should('have.text', 'Last name must be at least 2 characters')
        cy.xpath('//input[@placeholder="Email"]/following-sibling::div').should('have.text', 'Email must be a valid email')
        cy.xpath('//input[@placeholder="Password"]/following-sibling::div').should('have.text', 'Password should be a minimum of 8 characters with at least one uppercase, one number, and one special character')
    })

    it("Test type valid data", ()=>{
        cy.visit(creds_host.host_url)
        cy.contains('Sign up').click()
        cy.get('[placeholder="First name"]').type(creds_tenant.firstName)
        cy.get('[placeholder="Last name"]').type(creds_tenant.lastName)
        cy.get('[placeholder="Email"]').type(creds_tenant.email_tenant)
        cy.get('[placeholder="Password"]').type(creds_tenant.password_tenant)
        cy.get('[name="policy"]').click({force: true})
        cy.contains('Next').click()
        cy.get('[name="phoneNumber"]').click()
        cy.contains('Next').click()
        cy.xpath('//input[@name="phoneNumber"]/following-sibling::div').should('have.text', 'Phone number is a required field')
        cy.get('[name="phoneNumber"]').type(2)
        cy.xpath('//input[@name="phoneNumber"]/following-sibling::div').should('have.text', 'Phone number must be at least 11 characters')
        cy.get('[name="phoneNumber"]').type(creds_tenant.phoneTenant)
        cy.contains('Next').click()
        cy.xpath('//input').type('111111')
        cy.get('[type="submit"]').click()
        cy.contains('My account')
    })




    //cy.xpath('//input[@"]/following-sibling::div').should('have.text', '')
    //cy.xpath('//input[@"]/following-sibling::div').should('have.text', '')
    //cy.xpath('//input[@"]/following-sibling::div').should('have.text', '')
    //cy.xpath('//input[@"]/following-sibling::div').should('have.text', '')


    //cy.get('[]')
   


})