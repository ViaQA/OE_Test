
import { err_css, signup_css } from '../../css';
import {creds_tenant} from '../../Var';
import {creds_host} from '../../Var';




describe('Check Sign up form', () => {

    beforeEach(() => {
        cy.visit(creds_host.host_url)
        if (Cypress.config("viewportWidth") < 760 ) {
            cy.get('[data_atr="burger_menu_open"]').click({force: true })
            cy.get('[data_atr="burger_signup"]').click({ multiple: true, force: true })
            
          }else{
            cy.get('[data_atr="sign_up"]').click({ multiple: true, force: true })
            }
      })



    it( "Test for check terms text at Sign up for Host and Tenant", () => {
        //verify initial state for Guest
        cy.contains(signup_css.text_signup_guest).should('have.css', 'color', signup_css.text_color_darkblue)
        cy.contains(signup_css.text_signup_guest_term).should('have.css', 'color', signup_css.text_color_darkblue)
        cy.get('[name="role"]').should('have.value', creds_host.roleGuest)
        cy.url().should('include', '/registration-guest')
        cy.contains('Guest').click()
        //Verify initial state for Host
        cy.contains(signup_css.text_signup_host).should('have.css', 'color', signup_css.text_color_darkblue)
        cy.contains(signup_css.text_signup_host_term).should('have.css', 'color', signup_css.text_color_darkblue)
        cy.get('[name="role"]').should('have.value', creds_host.roleHost)
        cy.url().should('include', '/registration-host')
    })
    
    it( "Test for check init state after become a host button", () => {
        if (Cypress.config("viewportWidth") < 760 ) {
            cy.get('[data_atr="burger_menu_open"]').click({force: true })
            cy.get('[data_atr="burger_becomehost"]').click({ multiple: true, force: true })
        }else{
            cy.get('[data_atr="becomeHost"]').click({ multiple: true, force: true })
            cy.contains("List your space").click({multiple: true})
        }
        //verify init state after become a host
        cy.contains(signup_css.text_signup_host).should('have.css', 'color', signup_css.text_color_darkblue)
        cy.contains(signup_css.text_signup_host_term).should('have.css', 'color', signup_css.text_color_darkblue)
        cy.get('[name="role"]').should('have.value', creds_host.roleHost)
        cy.url().should('include', '/registration-host')
    })

    it( "Test sign up empty validation", ()=>{
        //Check gey border
        cy.get('[data_atr="signUpFirstName"]').should('have.css', 'border', signup_css.border_grey_half)
        cy.get('[data_atr="signUpLastName"]').should('have.css', 'border', signup_css.border_grey_half)
        cy.get('[data_atr="signUpEmail"]').should('have.css', 'border', signup_css.border_grey_half)
        cy.get('[data_atr="signUpPassword"]').should('have.css', 'border', signup_css.border_grey_half)
        cy.get('[data_atr="signUpPasswordConfirm"]').should('have.css', 'border', signup_css.border_grey_half)
        //condition for empty state
        cy.get('[data_atr="signUpFirstName"]').click()
        cy.get('[data_atr="signUpLastName"]').click()
        cy.get('[data_atr="signUpEmail"]').click()
        cy.get('[data_atr="signUpPassword"]').click()
        cy.get('[data_atr="signUpPasswordConfirm"]').click()
        //verify requred validation
        cy.get('[data_atr="signUpFirstName"]').should('have.css', 'border', err_css.err_border)
        cy.get('[data_atr="signUpLastName"]').should('have.css', 'border', err_css.err_border)
        cy.get('[data_atr="signUpEmail"]').should('have.css', 'border', err_css.err_border)
        cy.get('[data_atr="signUpPassword"]').should('have.css', 'border', err_css.err_border)

        cy.xpath('//input[@data_atr="signUpFirstName"]/following-sibling::div').should('have.text', err_css.err_valid + 'first name').should('have.css', 'color', err_css.err_color)
        cy.xpath('//input[@data_atr="signUpLastName"]/following-sibling::div').should('have.text',  err_css.err_valid + 'last name').should('have.css', 'color', err_css.err_color)
        cy.xpath('//input[@data_atr="signUpEmail"]/following-sibling::div').should('have.text', 'Email'+err_css.err_required).should('have.css', 'color', err_css.err_color)
        cy.xpath('//input[@data_atr="signUpPassword"]/following-sibling::div').should('have.text', 'Password'+err_css.err_required).should('have.css', 'color', err_css.err_color)
        
        cy.xpath("//span[text()='I confirm and agree to the']/child::a[text()='privacy policy']").should('have.attr', 'href', '/privacy-policy')
        cy.xpath("//span[text()='I confirm and agree to the']/child::a[text()='terms']").should('have.attr', 'href', '/terms-and-conditions')
    })


    it( "Test sign up must be at least 2 chracters", ()=>{
        //Password validation
        //password match validation

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

    it("Test email address already been taken", ()=>{
        cy.get('[data_atr="signUpFirstName"]').type(creds_tenant.firstName)
        cy.get('[data_atr="signUpLastName"]').type(creds_tenant.lastName)
        cy.get('[data_atr="signUpEmail"]').type(creds_host.email)
        cy.get('[data_atr="signUpPassword"]').type(creds_tenant.password_tenant)
        cy.get('[data_atr="signUpPasswordConfirm"]').type(creds_tenant.password_tenant)
        cy.get('[name="policy"]').click({force: true})
        cy.get('[type="submit"]').click()
        //verify that The email has already been taken
        cy.get('[data_atr="signUpEmail"]').should('have.css', 'border', err_css.err_border)
        cy.xpath('//input[@data_atr="signUpEmail"]/following-sibling::div').should('have.text', err_css.err_email_taken).should('have.css', 'color', err_css.err_color)
    })
    it("Test phone number already been taken", ()=>{
        cy.get('[data_atr="signUpFirstName"]').type(creds_tenant.firstName)
        cy.get('[data_atr="signUpLastName"]').type(creds_tenant.lastName)
        cy.get('[data_atr="signUpEmail"]').type(creds_tenant.email_tenant)
        cy.get('[data_atr="signUpPassword"]').type(creds_tenant.password_tenant)
        cy.get('[data_atr="signUpPasswordConfirm"]').type(creds_tenant.password_tenant)
        cy.get('[name="policy"]').click({force: true})
        cy.get('[type="submit"]').click()


        ///////////// Continue
        //dont forget about back nav
        //resend code
        
    })

    it("Test phone number and code verification", ()=>{
        cy.get('[data_atr="signUpFirstName"]').type(creds_tenant.firstName)
        cy.get('[data_atr="signUpLastName"]').type(creds_tenant.lastName)
        cy.get('[data_atr="signUpEmail"]').type(creds_tenant.email_tenant)
        cy.get('[data_atr="signUpPassword"]').type(creds_tenant.password_tenant)
        cy.get('[data_atr="signUpPasswordConfirm"]').type(creds_tenant.password_tenant)
        cy.get('[type="submit"]').should('be.disabled')
        cy.get('[name="policy"]').click({force: true})
        cy.get('[type="submit"]').click()

        cy.get('[data_atr="singUpPhoneNumber"]').click()
        cy.get('[type="submit"]').click({force: true})
        cy.xpath('//input[@data_atr="singUpPhoneNumber"]/following-sibling::div').should('have.text', 'Phone number'+ err_css.err_required).should('have.css', 'color', err_css.err_color)
        cy.get('[data_atr="singUpPhoneNumber"]').should('have.css', 'border', err_css.err_border)
        cy.get('[data_atr="singUpPhoneNumber"]').type(2)
        cy.xpath('//input[@data_atr="singUpPhoneNumber"]/following-sibling::div').should('have.text', err_css.err_phone_least).should('have.css', 'color', err_css.err_color)
        cy.get('[data_atr="singUpPhoneNumber"]').should('have.css', 'border', err_css.err_border)
        cy.get('[data_atr="singUpPhoneNumber"]').clear()
        cy.get('[data_atr="singUpPhoneNumber"]').type(creds_tenant.phoneTenant)
        cy.get('[type="submit"]').click()

        cy.get('[data_atr="codeInput"]').type('11111')
        cy.get('[type="submit"]').should('be.disabled')
        cy.get('[data_atr="codeInput"]').clear()

        cy.get('[data_atr="back_btn"]').click()
        cy.get('[data_atr="back_btn"]').click()

        cy.get('[name="policy"]').click({force: true})
        cy.get('[type="submit"]').click()
        cy.get('[type="submit"]').click()
        
        cy.contains('Resend code')

    })


    it("Test type valid data and create account", ()=>{
        cy.get('[data_atr="signUpFirstName"]').type(creds_tenant.firstName)
        cy.get('[data_atr="signUpLastName"]').type(creds_tenant.lastName)
        cy.get('[data_atr="signUpEmail"]').type(creds_tenant.email_tenant)
        cy.get('[data_atr="signUpPassword"]').type(creds_tenant.password_tenant)
        cy.get('[data_atr="signUpPasswordConfirm"]').type(creds_tenant.password_tenant)
        cy.get('[name="policy"]').click({force: true})
        cy.get('[type="submit"]').click()

        cy.get('[data_atr="singUpPhoneNumber"]').click()
        cy.get('[type="submit"]').click({force: true})
        cy.xpath('//input[@data_atr="singUpPhoneNumber"]/following-sibling::div').should('have.text', 'Phone number'+ err_css.err_required).should('have.css', 'color', err_css.err_color)
        cy.get('[data_atr="singUpPhoneNumber"]').should('have.css', 'border', err_css.err_border)
        cy.get('[data_atr="singUpPhoneNumber"]').type(2)
        cy.xpath('//input[@data_atr="singUpPhoneNumber"]/following-sibling::div').should('have.text', err_css.err_phone_least).should('have.css', 'color', err_css.err_color)
        cy.get('[data_atr="singUpPhoneNumber"]').should('have.css', 'border', err_css.err_border)
        cy.get('[data_atr="singUpPhoneNumber"]').clear()
        cy.get('[data_atr="singUpPhoneNumber"]').type(creds_tenant.phoneTenant)
        cy.get('[type="submit"]').click()

        // After update need refactoring
        //cy.wait(1000)
        cy.get('[data_atr="codeInput"]').type('111111')
        cy.get('[type="submit"]').click()
        cy.contains('Welcome!')
        cy.contains('You have successfully finished registration.')
        cy.contains('Find Spaces to Book').click()
        cy.url().should('include', '/search')
    })
    it("Test Already have an account?", ()=>{
        cy.get('[data_atr="signinHere"]').should('have.css', 'color', signup_css.violet_800)
        cy.get('[data_atr="signinHere"]').click()
        cy.url().should('include', '/login')
    })
   

})