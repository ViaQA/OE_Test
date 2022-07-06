import {creds_host} from './Var';

describe('Check Sign in form', () => {
    beforeEach(() => {
      
      cy.visit(creds_host.host_url)
    })
      
    it("Sign In error password", ()=>{
      cy.xpath('//span[text()="Sign in"]/parent::a').click()
      cy.get('[placeholder="Email"]').type(creds_host.email)
      cy.get('[placeholder="Password"]').type(creds_host.password_bad)
      cy.get('[type="submit"]').click()
      cy.contains('Email address or password are incorrect').should('have.css', 'color', 'rgb(248, 123, 8)') //red error message
      }
    ) 

    it("Sign In error email", ()=>{
      cy.xpath('//span[text()="Sign in"]/parent::a').click()
      cy.get('[placeholder="Email"]').type(creds_host.email_bad)
      cy.get('[placeholder="Password"]').type(creds_host.password)
      cy.get('[type="submit"]').click()
      cy.contains('Email address or password are incorrect').should('have.css', 'color', 'rgb(248, 123, 8)') //red error message
      }
    ) 

    it("Sign In forgot password", ()=>{
      cy.xpath('//span[text()="Sign in"]/parent::a').click()
      cy.xpath('//a[text()="Forgot password?"]').click()

      cy.get('[placeholder="Email"]').type('aaaaadadwawdaw')
      cy.xpath('//label[text()="Next"]').click()
      cy.get('[placeholder="Email"]').should('have.css', 'border', '2px solid rgb(255, 77, 151)')
      cy.contains('Please enter a valid email address').should('have.css', 'color','rgb(255, 77, 151)')
      
      cy.xpath('//a[text()="Back to Sign In"]').click()
      cy.xpath('//a[text()="Forgot password?"]').click()

      cy.get('[placeholder="Email"]').type(creds_host.email_notfount)
      cy.xpath('//label[text()="Next"]').click()
      cy.contains('User not found!').should('have.css', 'color', 'rgb(234, 67, 53)')

      cy.get('[placeholder="Email"]').clear()
      cy.get('[placeholder="Email"]').type(creds_host.email_restore)
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
      cy.xpath('//span[text()="Sign in"]/parent::a').click()
      cy.get('[placeholder="Email"]').type(creds_host.email)
      cy.get('[placeholder="Password"]').type(creds_host.password)
      cy.get('[type="submit"]').click()
      }
    ) 

   



   

  
  })