
import { creds_admin, creds_host } from "../Var"

describe('Check custom item at Home page', () => {

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

    it("Test check Home text test", ()=>{
        cy.contains(creds_admin.home_text_header)
        cy.contains(creds_admin.home_text_desc)
    })

    it("Test check Home home banners", ()=>{
        cy.get('[alt="banner1 autotest"]')
        cy.get('[alt="banner2 autotest"]')
        cy.get('[alt="banner3 autotest"]')
        
    })

})