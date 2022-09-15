
import { err_css, signup_css } from './css';
import {creds_host} from './Var';

describe('Check Sign in form', () => {
    beforeEach(() => {
      cy.visit(creds_host.host_url)
      if (Cypress.config("viewportWidth") < 760 ) {
        cy.get('[data_atr="burger_menu"]').click({force: true })
      }
      cy.get('[data_atr = "sign_in"]').click({ multiple: true, force: true })
    })

    it("Sign In email is required field", ()=>{
      //cy.contains('Sign in').click({ multiple: true })
      
      //Check initial state
      cy.get('[data_atr="signInEmail"]').should('have.css', 'border', signup_css.border_grey_half)
      cy.get('[name="password"]').should('have.css', 'border', signup_css.border_grey_half)
      //check error border
      cy.get('[data_atr="signInEmail"]').click()
      cy.get('[name="password"]').click()
      cy.get('[type="submit"]').click({force: true})
      cy.get('[data_atr="signInEmail"]').should('have.css', 'border', err_css.err_border)
      cy.get('[name="password"]').should('have.css', 'border', err_css.err_border)
      cy.xpath('//input[@data_atr="signInEmail"]/following-sibling::div').should('have.text', 'Email'+err_css.err_required).should('have.css', 'color', err_css.err_color)
      cy.xpath('//input[@name="password"]/following-sibling::div').should('have.text', 'Password'+err_css.err_required).should('have.css', 'color', err_css.err_color)
      //red error message
      }
    ) 
      
    it("Sign In error password", ()=>{
      //cy.contains('Sign in').click({ multiple: true })
      cy.get('[data_atr="signInEmail"]').type(creds_host.email)
      cy.get('[placeholder="Password"]').type(creds_host.password_bad)
      cy.get('[type="submit"]').click()
      cy.xpath('//input[@data_atr="signInEmail"]/following-sibling::div').should('have.text', err_css.err_incorect_cred).should('have.css', 'color', err_css.err_color)
      cy.xpath('//input[@name="password"]/following-sibling::div').should('have.text', err_css.err_incorect_cred).should('have.css', 'color', err_css.err_color)
      //red error message
      }
    ) 

    it("Sign In error email", ()=>{
      //cy.contains('Sign in').click({ multiple: true })
      cy.get('[data_atr="signInEmail"]').type(creds_host.email_bad)
      cy.get('[placeholder="Password"]').type(creds_host.password)
      cy.get('[type="submit"]').click()
      cy.xpath('//input[@data_atr="signInEmail"]/following-sibling::div').should('have.text', err_css.err_incorect_cred).should('have.css', 'color', err_css.err_color)
      cy.xpath('//input[@name="password"]/following-sibling::div').should('have.text', err_css.err_incorect_cred).should('have.css', 'color', err_css.err_color)
      //red error message
      }
    ) 

    it("Sign In forgot password border validation", ()=>{
     // cy.xpath('//span[text()="Sign in"]/parent::a').click()
      //cy.contains('Sign in').click({ multiple: true }) 
      cy.xpath('//a[text()="Forgot password?"]').click()
      cy.get('[data_atr="forgotEmail"]').should('have.css', 'border', signup_css.border_grey_half)
      cy.get('[data_atr="forgotEmail"]').click()
      cy.get('[type="submit"]').click({force: true})
      cy.get('[data_atr="forgotEmail"]').should('have.css', 'border', err_css.err_border)
      cy.get('[data_atr="forgotEmail"]').type(creds_host.email)
      cy.get('[data_atr="forgotEmail"]').should('have.css', 'border', signup_css.border_darkblue)
      cy.xpath('//a[text()="Back"]').click()
      cy.get('[data_atr="signInEmail"]').should('have.css', 'border', signup_css.border_grey_half)
      cy.get('[name="password"]').should('have.css', 'border', signup_css.border_grey_half)
    })

    it("Sign In forgot password functionality", ()=>{
      cy.xpath('//a[text()="Forgot password?"]').click()
      //Validation about valid data typing
      cy.get('[data_atr="forgotEmail"]').type('aaaaadadwawdaw')
      cy.get('[type="submit"]').click({force: true})
      cy.get('[data_atr="forgotEmail"]').should('have.css', 'border', err_css.err_border)
      cy.xpath('//input[@data_atr="forgotEmail"]/following-sibling::div').should('have.text', err_css.err_valid + 'email address').should('have.css', 'color', err_css.err_color)
      cy.xpath('//a[text()="Back"]').click()
      cy.xpath('//a[text()="Forgot password?"]').click()
      //User not found
      cy.get('[data_atr="forgotEmail"]').type(creds_host.email_notfount)
      cy.get('[type="submit"]').click({force: true})
      cy.xpath('//input[@data_atr="forgotEmail"]/following-sibling::div').should('have.text', err_css.err_user_notfound).should('have.css', 'color', err_css.err_color)
      //Correct restore password
      cy.get('[data_atr="forgotEmail"]').clear()
      cy.get('[data_atr="forgotEmail"]').type(creds_host.email_restore)
      cy.get('[type="submit"]').click({force: true})
      cy.contains('Done!')
      cy.contains('We have sent you a message with instructions to change your password')
      cy.get('[data_atr="close_modal"]').click()
      cy.get('[data_atr="signInEmail"]').should('have.css', 'border', signup_css.border_grey_half)
      cy.get('[name="password"]').should('have.css', 'border', signup_css.border_grey_half)
      cy.contains('Sign in')
      cy.xpath('//a[text()="Forgot password?"]')
      }
    ) 



    it("Sign In", ()=>{
      //Correct sign in
      cy.get('[data_atr="signInEmail"]').type(creds_host.email)
      cy.get('[placeholder="Password"]').type(creds_host.password)
      cy.get('[data_atr="signInEmail"]').should('have.css', 'border', signup_css.border_darkblue)
      cy.get('[name="password"]').should('have.css', 'border', signup_css.border_darkblue)
      cy.get('[type="submit"]').click()
      }
    )    
  
  })