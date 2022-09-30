


describe('Check Sign up form', () => {

    beforeEach(() => {
        cy.visit(creds_host.host_url)
        cy.log(Cypress.config("viewportWidth"))
        
        if (Cypress.config("viewportWidth") < 760 ) {
          cy.get('[data_atr="burger_menu"]').click({force: true })
        }
        
        cy.get('[data_atr = "sign_in"]').click({ multiple: true, force: true })
        cy.get('[data_atr="signInEmail"]').type(creds_host.email_host)
        cy.get('[placeholder="Password"]').type(creds_host.password)
        cy.get('[type="submit"]').click()
      })




    })