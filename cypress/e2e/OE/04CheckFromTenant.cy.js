import {creds_host, creds_space} from './Var';
import {creds_tenant} from './Var';

describe('Check Sign in form', () => {

    beforeEach(() => {
        cy.visit(creds_host.host_url)
        cy.xpath('//span[text()="Sign in"]/parent::a').click()
        cy.get('[placeholder="Email"]').type(creds_tenant.email_tenant)
        cy.get('[placeholder="Password"]').type(creds_tenant.password_tenant)
        cy.get('[type="submit"]').click()
      })
    
    it("Check from tenant", ()=>{
        cy.contains(creds_space.name_space).click()
        let current_date = ''
        current_date = (new Date().getDate())
        cy.log(current_date)
        let book_start = current_date + 1
        cy.log(book_start)

        cy.get('[style="height: 36px;"]').contains(book_start).click()
        cy.get('[style="height: 36px;"]').contains(book_start+1).click()
        cy.contains('Request booking').click()
        cy.get('[focusable="false"]').click()
        cy.contains('Startup').click()
        cy.get('[placeholder="Type your message here "]').click()
        cy.contains('8+ more').click()
        cy.get('[placeholder="Type your message here "]').should('have.css', 'border', '2px solid rgb(255, 77, 151)')
        cy.contains('Please type message to the host').should('have.css', 'color', 'rgb(255, 77, 151)')
        
        cy.get('[placeholder="Type your message here "]').type(creds_tenant.book_message)
        cy.get('[type="submit"]').click()




        


    })


})