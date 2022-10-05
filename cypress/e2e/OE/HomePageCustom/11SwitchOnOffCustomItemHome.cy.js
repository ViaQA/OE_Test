import { creds_admin } from "../Var"

//Need execute after 09Homepage/10Homepage tests
describe('Check Sign up form', () => {

    it( "Test switch on new item at home page", ()=>{

        cy.visit(creds_admin.url_admin)
        cy.get('[id="email"]').type(creds_admin.email_admin)
        cy.get('[id="password"]').type(creds_admin.password_admin)
        cy.get('[type="submit"]').click()
        cy.get('[class="fas fa-home"]').click()
        cy.get('[class="btn btn-outline-warning mr-1"]').click({multiple:true})

        }
    )



})