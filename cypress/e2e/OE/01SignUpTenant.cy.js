
import { err_css } from './css';
import {creds_tenant} from './Var';
import {creds_host} from './Var';




describe('Check Sign up form', () => {

    it( "Test sign up empty validation", ()=>{

        cy.visit(creds_host.host_url)
        cy.contains('Sign up').click()
        cy.get('[data_atr="signUpFirstName"]').click()
        cy.get('[data_atr="signUpLastName"]').click()
        cy.get('[data_atr="signUpEmail"]').click()
        cy.get('[data_atr="signUpPassword"]').click()
        cy.get('[data_atr="signUpPasswordConfirm"]').click()
        cy.xpath('//input[@data_atr="signUpFirstName"]/following-sibling::div').should('have.text', err_css.err_valid + 'first name').should('have.css', 'color', err_css.err_color)
        cy.xpath('//input[@data_atr="signUpLastName"]/following-sibling::div').should('have.text',  err_css.err_valid + 'last name').should('have.css', 'color', err_css.err_color)
        cy.xpath('//input[@data_atr="signUpEmail"]/following-sibling::div').should('have.text', 'Email'+err_css.err_required).should('have.css', 'color', err_css.err_color)
        cy.xpath('//input[@data_atr="signUpPassword"]/following-sibling::div').should('have.text', 'Password'+err_css.err_required).should('have.css', 'color', err_css.err_color)
        cy.xpath("//span[text()='I confirm and agree to the']/child::a[text()='privacy policy']").should('have.attr', 'href', '/privacy-policy')
        cy.xpath("//span[text()='I confirm and agree to the']/child::a[text()='terms']").should('have.attr', 'href', '/terms-and-conditions')
        cy.get('[data_atr="signUpFirstName"]').should('have.css', 'border', err_css.err_border)
        cy.get('[data_atr="signUpLastName"]').should('have.css', 'border', err_css.err_border)
        cy.get('[data_atr="signUpEmail"]').should('have.css', 'border', err_css.err_border)
        cy.get('[data_atr="signUpPassword"]').should('have.css', 'border', err_css.err_border)

    })


    it( "Test sign up must be at least 2 chracters", ()=>{

        cy.visit(creds_host.host_url)
        cy.contains('Sign up').click()
        cy.get('[data_atr="signUpFirstName"]').type("q")
        cy.get('[data_atr="signUpLastName"]').type("q")
        cy.get('[data_atr="signUpEmail"]').type("q")
        cy.get('[data_atr="signUpPassword"]').type("q")
        cy.get('[data_atr="signUpPasswordConfirm"]').click()
        cy.get('[data_atr="signUpPassword"]').click()

        cy.xpath('//input[@data_atr="signUpPasswordConfirm"]/following-sibling::div').should('have.text', 'Confirm password'+err_css.err_required)
        cy.get('[data_atr="signUpPasswordConfirm"]').should('have.css', 'border', err_css.err_border)
    
        cy.get('[data_atr="signUpPasswordConfirm"]').type("w")
        cy.contains('Next').click()
        
        // Have TYPO at error
        cy.xpath('//input[@data_atr="signUpFirstName"]/following-sibling::div').should('have.text', 'First name'+err_css.err_least)
        cy.xpath('//input[@data_atr="signUpLastName"]/following-sibling::div').should('have.text', 'Last name'+err_css.err_least)
        cy.xpath('//input[@data_atr="signUpEmail"]/following-sibling::div').should('have.text', err_css.err_invemail)
        cy.xpath('//input[@data_atr="signUpPassword"]/following-sibling::div').should('have.text', err_css.err_pass_validation)
        cy.xpath('//input[@data_atr="signUpPasswordConfirm"]/following-sibling::div').should('have.text', err_css.err_match)
        cy.get('[data_atr="signUpFirstName"]').should('have.css', 'border', err_css.err_border)
        cy.get('[data_atr="signUpLastName"]').should('have.css', 'border', err_css.err_border)
        cy.get('[data_atr="signUpEmail"]').should('have.css', 'border', err_css.err_border)
        cy.get('[data_atr="signUpPassword"]').should('have.css', 'border', err_css.err_border)
    })

    it("Test type valid data and create account", ()=>{
        cy.visit(creds_host.host_url)
        cy.contains('Sign up').click()
        cy.get('[data_atr="signUpFirstName"]').type(creds_tenant.firstName)
        cy.get('[data_atr="signUpLastName"]').type(creds_tenant.lastName)
        cy.get('[data_atr="signUpEmail"]').type(creds_tenant.email_tenant)
        cy.get('[data_atr="signUpPassword"]').type(creds_tenant.password_tenant)
        cy.get('[data_atr="signUpPasswordConfirm"]').type(creds_tenant.password_tenant)

        cy.get('[name="policy"]').click({force: true})
        cy.contains('Next').click()
        cy.get('[data_atr="singUpPhoneNumber"]').click()
        cy.contains('Next').click()
        cy.xpath('//input[@data_atr="singUpPhoneNumber"]/following-sibling::div').should('have.text', 'Phone number'+ err_css.err_required).should('have.css', 'color', err_css.err_color)
        cy.get('[data_atr="singUpPhoneNumber"]').should('have.css', 'border', err_css.err_border)
        cy.get('[data_atr="singUpPhoneNumber"]').type(2)
        cy.xpath('//input[@data_atr="singUpPhoneNumber"]/following-sibling::div').should('have.text', err_css.err_phone_least).should('have.css', 'color', err_css.err_color)
        cy.get('[data_atr="singUpPhoneNumber"]').should('have.css', 'border', err_css.err_border)
        cy.get('[data_atr="singUpPhoneNumber"]').type(creds_tenant.phoneTenant)
        cy.contains('Next').click()

        // After update need refactoring
        cy.wait(1000)
        cy.get('[data_atr="codeInput"]').type('111111')
        cy.get('[type="submit"]').click()
        cy.contains('My account')
    })




    //cy.xpath('//input[@"]/following-sibling::div').should('have.text', '')
    //cy.xpath('//input[@"]/following-sibling::div').should('have.text', '')
    //cy.xpath('//input[@"]/following-sibling::div').should('have.text', '')
    //cy.xpath('//input[@"]/following-sibling::div').should('have.text', '')


    //cy.get('[]')
   


})