import {creds_admin} from '../Var';
import {creds_space} from '../Var';

describe('Check Home custom fields', () => {


    it( "Test create icon item at home page", ()=>{

        cy.visit(creds_admin.url_admin)
        cy.get('[id="email"]').type(creds_admin.email_admin)
        cy.get('[id="password"]').type(creds_admin.password_admin)
        cy.get('[type="submit"]').click()
        cy.get('[class="fas fa-home"]').click()
        cy.get('[class="btn btn-outline-primary"]').click()
        cy.get('[onchange="changetype(this)"]').select('Icon')
        cy.get('[name="header"]').type(creds_admin.icon_header)
        cy.get('[name="img"]').selectFile(["cypress/fixtures/logo.jfif"])
        cy.get('[class="btn btn-primary"]').click()
            }
    )
    it( "Test create icon item at home page SVG", ()=>{

        cy.visit(creds_admin.url_admin)
        cy.get('[id="email"]').type(creds_admin.email_admin)
        cy.get('[id="password"]').type(creds_admin.password_admin)
        cy.get('[type="submit"]').click()
        cy.get('[class="fas fa-home"]').click()
        cy.get('[class="btn btn-outline-primary"]').click()
        cy.get('[onchange="changetype(this)"]').select('Icon')
        cy.get('[name="header"]').type(creds_admin.icon_header)
        cy.get('[name="img"]').selectFile(["cypress/fixtures/biotech.svg"])
        cy.get('[class="btn btn-primary"]').click()
            }
    )

    it( "Test create image with text item at home page", ()=>{

        cy.visit(creds_admin.url_admin)
        cy.get('[id="email"]').type(creds_admin.email_admin)
        cy.get('[id="password"]').type(creds_admin.password_admin)
        cy.get('[type="submit"]').click()
        cy.get('[class="fas fa-home"]').click()
        cy.get('[class="btn btn-outline-primary"]').click()
        cy.get('[onchange="changetype(this)"]').select('Image with text')
        cy.get('[name="header"]').type(creds_admin.image_header)
        cy.get('[name="img"]').selectFile(["cypress/fixtures/img5.png"])
        cy.get('[name="description"]').type(creds_admin.image_desc)
        cy.get('[name="button_text"]').type(creds_admin.img_btn_text)
        cy.get('[name="link"]').type(creds_admin.img_link)
        cy.get('[class="btn btn-primary"]').click()
                }
    )
   
    

    it( "Test create Square with background item at home page", ()=>{

        cy.visit(creds_admin.url_admin)
        cy.get('[id="email"]').type(creds_admin.email_admin)
        cy.get('[id="password"]').type(creds_admin.password_admin)
        cy.get('[type="submit"]').click()
        cy.get('[class="fas fa-home"]').click()
        cy.get('[class="btn btn-outline-primary"]').click()
        cy.get('[onchange="changetype(this)"]').select('Square with background')
        cy.get('[name="header"]').type(creds_admin.square_header)
        cy.get('[name="img"]').selectFile(["cypress/fixtures/img5.png"])
        cy.get('[name="button_text"]').type(creds_admin.square_btn_text)
        cy.get('[name="link"]').type(creds_admin.square_link)
        cy.get('[class="btn btn-primary"]').click()
                }
    )
    
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