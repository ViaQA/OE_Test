import { err_css, signup_css } from './css';
import {creds_host} from './Var';

describe('Check Sign in form', () => {
    beforeEach(() => {
      cy.visit(creds_host.host_url)
    })

    it("Sign In email is required field", ()=>{
      //cy.xpath('//span[text()="Sign in"]/parent::a').click()
      cy.contains('Sign in').click({ multiple: true })

      cy.get('[data_atr="signInEmail"]').should('have.css', 'border', signup_css.border_grey_half)
      cy.get('[name="password"]').should('have.css', 'border', signup_css.border_grey_half)

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
      //cy.xpath('//span[text()="Sign in"]/parent::a').click()
      cy.contains('Sign in').click({ multiple: true })
      cy.get('[data_atr="signInEmail"]').type(creds_host.email)
      cy.get('[placeholder="Password"]').type(creds_host.password_bad)
      cy.get('[type="submit"]').click()
      cy.xpath('//input[@data_atr="signInEmail"]/following-sibling::div').should('have.text', err_css.err_incorect_cred).should('have.css', 'color', err_css.err_color)
      cy.xpath('//input[@name="password"]/following-sibling::div').should('have.text', 'Password'+err_css.err_incorect_cred).should('have.css', 'color', err_css.err_color)
      //red error message
      }
    ) 

    it("Sign In error email", ()=>{
      //cy.xpath('//span[text()="Sign in"]/parent::a').click()
      cy.contains('Sign in').click({ multiple: true })
      cy.get('[data_atr="signInEmail"]').type(creds_host.email_bad)
      cy.get('[placeholder="Password"]').type(creds_host.password)
      cy.get('[type="submit"]').click()
      cy.contains('Email address or password are incorrect').should('have.css', 'color', 'rgb(248, 123, 8)') //red error message
      }
    ) 

    it("Sign In forgot password", ()=>{
     // cy.xpath('//span[text()="Sign in"]/parent::a').click()
      cy.contains('Sign in').click({ multiple: true }) 
      cy.xpath('//a[text()="Forgot password?"]').click()

      cy.get('[data_atr="forgotEmail"]').type('aaaaadadwawdaw')
      cy.xpath('//label[text()="Next"]').click()
      cy.get('[data_atr="forgotEmail"]').should('have.css', 'border', '1.5px solid rgb(209, 41, 27)')
      cy.contains('Please enter a valid email address').should('have.css', 'color','rgb(209, 41, 27)')
      
      cy.xpath('//a[text()="Back to Sign In"]').click()
      cy.xpath('//a[text()="Forgot password?"]').click()

      cy.get('[data_atr="forgotEmail"]').type(creds_host.email_notfount)
      cy.xpath('//label[text()="Next"]').click()
      cy.contains('User not found!').should('have.css', 'color', 'rgb(234, 67, 53)')

      cy.get('[data_atr="forgotEmail"]').clear()
      cy.get('[data_atr="forgotEmail"]').type(creds_host.email_restore)
      cy.xpath('//label[text()="Next"]').click()
      cy.contains('Done!')
      cy.contains('A password reset link has been sent to')
      cy.contains('an*********************@gmail.com')
      cy.xpath('//a[text()="Back to Sign In"]').click()
      cy.contains('Sign in')
      cy.xpath('//a[text()="Forgot password?"]')
      }
    ) 



    it("Sign In", ()=>{
      //cy.xpath('//span[text()="Sign in"]/parent::a').click()
      cy.contains('Sign in').click({ multiple: true })
      cy.get('[data_atr="signInEmail"]').type(creds_host.email)
      cy.get('[placeholder="Password"]').type(creds_host.password)
      cy.get('[type="submit"]').click()
      }
    )    
  
  })