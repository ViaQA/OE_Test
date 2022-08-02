import {creds_host, creds_space} from './Var';



describe('Approve then decline booking', () => {

it("Approve then decline request from host", ()=>{
    //cy.contains('My account').click()
    //cy.contains('Logout').click()
    cy.visit(creds_host.host_url)
    cy.xpath('//span[text()="Sign in"]/parent::a').click()
    cy.get('[placeholder="Email"]').type(creds_host.email_host)
    cy.get('[placeholder="Password"]').type(creds_host.password)
    cy.get('[type="submit"]').click()
    cy.contains('My account').click()
    cy.visit(creds_host.host_url + '/account/space-requests')
    cy.contains('New requests').click()
    cy.contains('$'+creds_space.start_price+'.00')
    cy.contains('$'+(creds_space.start_price*2)+'.00')
    cy.contains('$'+creds_space.security_dep+'.00')
    cy.contains('$'+((creds_space.start_price*2)+creds_space.security_dep)+'.00')
    cy.contains('Approve request').click()
    cy.contains('Congratulations!')
    cy.contains('Got It').click()
    cy.contains('Decline request').click()
    cy.contains('Congratulations!')
    cy.contains('Got It').click()
    cy.contains('declined')
})
})