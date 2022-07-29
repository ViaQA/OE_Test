
import {creds_admin} from './Var';
import {creds_space} from './Var';

describe('Check Sign in form', () => {

    it( "Test about approve space", ()=>{

        cy.visit(creds_admin.url_admin)
        cy.get('[id="email"]').type(creds_admin.email_admin)
        cy.get('[id="password"]').type(creds_admin.password_admin)
        cy.get('[type="submit"]').click()
        cy.get('[name="searchQuery"]').type(creds_space.name_space)
        cy.get('[type="submit"]').click()
        cy.get('[class="card h-100"]').click()
        cy.contains('Approve').click()
        cy.get('[id="featuredSpace_switcher"]').click({force: true})
            }
        )
})