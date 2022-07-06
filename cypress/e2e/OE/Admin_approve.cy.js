
import {creds_admin} from './Var';

describe('Check Sign in form', () => {


 it( "Test about open admin", ()=>{
            
    cy.visit(creds_admin.url_admin)
    cy.get('[id="email"]').type(creds_admin.email_admin)
    cy.get('[id="password"]').type(creds_admin.password_admin)
    cy.get('[type="submit"]').click()
        }
    )

})