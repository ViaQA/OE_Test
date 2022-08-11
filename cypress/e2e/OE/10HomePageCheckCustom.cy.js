
import { creds_admin, creds_host } from "./Var"

describe('Check Sign up form', () => {

    beforeEach(() => {
        cy.visit(creds_host.host_url)
      })

    it( "Test check icon custom", ()=>{
        cy.contains(creds_admin.icon_header)
    })

    it("Test check image custom", ()=> {
        cy.contains(creds_admin.image_header)
        cy.contains(creds_admin.image_desc)
        cy.contains(creds_admin.img_btn_text_front).click()
        cy.url().should('include', creds_admin.img_link)
    })
    it("Test check square custom", ()=>{
        cy.contains(creds_admin.square_header)
        cy.contains(creds_admin.square_btn_text_front).click()
        cy.url().should('include', creds_admin.square_link)
    })

})