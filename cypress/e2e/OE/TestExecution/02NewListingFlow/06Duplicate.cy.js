import { err_css, signup_css } from "../../css"
import { creds_host, creds_space } from "../../Var"
import { listData } from "./ListData"

let kindOfSpace = listData.data_event
describe('Check duplicate independence space flow', () => {
    beforeEach(() => {
        cy.visit(creds_host.host_url)
        cy.log(Cypress.config("viewportWidth"))
        //cy.xpath('//span[text()="Sign in"]/parent::a').click()
        if (Cypress.config("viewportWidth") < 760 ) {
          cy.get('[data_atr="burger_menu"]').click({force: true })
        }
        
        cy.get('[data_atr = "sign_in"]').click({ multiple: true, force: true })
        cy.get('[data_atr="signInEmail"]').type(creds_host.email_duplicate)
        cy.get('[placeholder="Password"]').type(creds_host.password)
        cy.get('[type="submit"]').click()
      })

    it('Create space for duplicate', () => {
      if (Cypress.config("viewportWidth") < 760 ) {
        cy.get('[data_atr="burger_menu"]').click({force: true })
      }
      cy.get('[data_atr="listSpace"]').click({ multiple: true, force: true})
      cy.get('[data_atr="createSpace"]').click()
      cy.get('[data_atr="createListing"]').click()
      cy.get('[data_atr="continue_modal_btn"]').click()
      cy.get(kindOfSpace).click()
      cy.get('[type="submit"]').click()
      cy.get('[name="spaceName"]').type(listData.meetingRoomName + 'Duplicate' )
      cy.get('[name="spaceDescription"]').type(listData.meetingRoomDescription + 'Duplicate')
      cy.get('[type="submit"]').click()
      cy.contains(listData.step3)
      cy.get('[data_atr="Monday"]').click()
      cy.get('[data_atr="time24Hour"]').click()
      cy.get('[data_atr="applyModal"]').click()
      cy.get('[data_atr="Thursday"]').click('')
      cy.get('[data_atr="timeClosed"]').click()
      cy.get('[data_atr="applyModal"]').click()
      cy.get('[data_atr="Wednesday"]').click()
      cy.get('[data-qa="start-time"]').type('1011')
      cy.get('[data-qa="start-time"]').should('have.value', listData.custom_start_time)
      cy.get('[data-qa="end-time"]').type('0222')
      cy.get('[data-qa="end-time"]').should('have.value', listData.custom_end_time)
      cy.get('[data_atr="closeAMPM"]').click()
      cy.get('[data_atr="applyModal"]').click()
      cy.get('[type="submit"]').click()
      cy.contains(listData.step4)
      cy.get('[data_atr="Hourly"]').click({force: true})
      cy.get('[name="pricing.hourly"]').type(listData.priceHourly)
      cy.get('[data_atr="Daily"]').click({force: true})
      cy.get('[name="pricing.daily"]').type(listData.priceDaily)
      cy.get('[data_atr="Monthly"]').click({force: true})
      cy.get('[name="pricing.monthly"]').type(listData.priceMonthly)
      cy.get('[name="capturePrice"]').type(listData.securityDep)
      cy.get('[type="submit"]').click()
      cy.contains(listData.step5)
      cy.get('[name="streetAddress"]').type(listData.address_queens)
      cy.wait(1000)
      cy.contains(listData.address_queens).click()
      cy.wait(1000)
      cy.get('[name="apt"]').type(listData.apt)
      cy.xpath('//div[text()="Enter floor(s) number"]').click()
      cy.contains(creds_space.flor_1).click({force: true})
      cy.contains(creds_space.flor_2).click({force: true})
      cy.contains(creds_space.flor_3).click({force: true})
      cy.contains(creds_space.flor_4).click({force: true})
      cy.get('[type="submit"]').click()
      cy.contains(listData.step6)
      cy.get('[type="submit"]').should('be.disabled')
      cy.get('[name="square"]').type(listData.square_ft1)
      cy.get('[data-value="50-100"]').click()
      cy.get('[data-value="50-100"]').should('have.css', 'background-color', signup_css.violet_800)
      cy.get('[type="submit"]').click()
      cy.contains(listData.step7)
      cy.get('[type="submit"]').should('be.disabled')
      
      //.should('have.css', 'color', err_css.err_color)
      cy.get('[name="file"]').parent().selectFile(["cypress/fixtures/Denver.png", "cypress/fixtures/Birmingham.png", 
          "cypress/fixtures/img1.jpg", "cypress/fixtures/img9.jpeg", "cypress/fixtures/img3.png", "cypress/fixtures/img4.jpg", "cypress/fixtures/img5.png", 
          "cypress/fixtures/img6.jpg", "cypress/fixtures/StarWars.jpg", "cypress/fixtures/img7.jpg" ],  {subjectType: 'drag-n-drop'})
      cy.wait(13000)
      cy.get('[data-id="1"]')
      cy.get('[data-id="2"]')
      cy.get('[data-id="3"]')
      cy.get('[data-id="4"]')
      cy.get('[data-id="5"]')
      cy.get('[data-id="6"]')
      cy.get('[data-id="7"]')
      cy.get('[data-id="8"]')
      cy.get('[data-id="9"]')
      cy.get('[data-id="10"]')
      cy.get('[type="submit"]').click()
      
      //Next step
      cy.get('[data_atr="access"]').click()
      cy.get('[type="submit"]').click()
      cy.contains(listData.step9)

      if (Cypress.config("viewportWidth") < 760 ) {
        cy.get('[data_atr="save_draft"]').click({force: true })
      }else{
      cy.contains('Save and Exit').click()
      }

      cy.wait(2000)
      cy.get('[data_atr="draftSpace"]').click()
      cy.contains(listData.meetingRoomName + 'Duplicate')

    })

    it('Duplicate space flow', () => {
        if (Cypress.config("viewportWidth") < 760 ) {
          cy.get('[data_atr="burger_menu"]').click({force: true })
        }
        cy.get('[data_atr="listSpace"]').click({ multiple: true, force: true})
        
        cy.get('[data_atr="createSpace"]').click()
        cy.get('[data_atr="duplicateListing"]').click({force: true})
        cy.get('[data_atr="continue_modal_btn"]').click()
        
        cy.get('[data_atr="back_btn"]').click({force: true})

        cy.get('[data_atr="createSpace"]').click()
        cy.get('[data_atr="duplicateListing"]').click({force: true})
        cy.get('[data_atr="continue_modal_btn"]').click()

        //Search space for duplicating
        cy.get('[data_atr="search_duplicate"]').type(listData.meetingRoomName + 'Duplicate')
        cy.get('[data_atr="duplicate_item"]').click()

        //Check duplicating data
        cy.get('[name="spaceName"]').should('have.value', listData.meetingRoomName + 'Duplicate' )
        cy.get('[name="spaceDescription"]').should('have.value', listData.meetingRoomDescription + 'Duplicate')
        cy.get('[type="submit"]').should('be.disabled')

        if (Cypress.config("viewportWidth") > 760 ) {
            cy.contains('Save and Exit').click()
            cy.get('[name="spaceName"]').should('have.css', 'border', err_css.err_border)

          }

        cy.get('[name="spaceName"]').clear()
        cy.get('[name="spaceName"]').type(listData.meetingRoomName +'Duplicated')
        cy.get('[type="submit"]').click()
        //Availability time
        cy.get('[data_atr="Monday"]').children().should('have.value', '24 hours')
        cy.get('[data_atr="Thursday"]').children().should('have.value', 'closed')
        cy.get('[data_atr="Wednesday"]').children().should('have.value', '10:00 AM - 02:00 PM')
        cy.get('[type="submit"]').click()
        
        //Price
        cy.get('[name="pricing.hourly"]').should('have.value', '$' + listData.priceHourly)
        cy.get('[name="pricing.daily"]').should('have.value', '$' + listData.priceDaily)
        cy.get('[name="pricing.monthly"]').should('have.value', '$' + listData.priceMonthly)
        cy.get('[name="capturePrice"]').should('have.value', '$' + listData.securityDep)
        cy.get('[type="submit"]').click()

        //Address
        //!!!!!!cy.get('[name="streetAddress"]').should('have.value', listData.addres_queens_num + ' ' + listData.addres_queens_street)
        cy.get('[name="city"]').should('have.value', listData.addres_queens_city)        
        cy.get('[name="zipCode"]').should('have.value', listData.address_queens_zip)    
        //cy.get('[name="apt"]').should('have.value', listData.apt)
        cy.get('[type="submit"]').click()
        //Capacity
        cy.get('[name="square"]').should('have.value',listData.square_ft1 + ' sqft.')
        cy.get('[data-value="50-100"]').should('have.css', 'background-color', signup_css.violet_800)
        cy.get('[type="submit"]').click()

        //Photo
        cy.get('[data-id="1"]')
        cy.get('[data-id="2"]')
        cy.get('[data-id="3"]')
        cy.get('[data-id="4"]')
        cy.get('[data-id="5"]')
        cy.get('[data-id="6"]')
        cy.get('[data-id="7"]')
        cy.get('[data-id="8"]')
        cy.get('[data-id="9"]')
        cy.get('[data-id="10"]')
        cy.get('[type="submit"]').click()

        //Amenities
        cy.get('[data_atr="access"]').should('have.css', 'border', signup_css.border_violet1px)
        cy.get('[type="submit"]').click()
        cy.get('[type="submit"]').click()
        cy.wait(2000)
        //Finish
        cy.get('[data_atr="pendingSpace"]').click()
        cy.contains(listData.meetingRoomName + 'Duplicated')
        cy.get('[data_atr="draftSpace"]').click()
        cy.get('[data_atr="delete_space"]').click()
        cy.get('[data_atr="close_modal_btn"]').click()
        cy.get('[data_atr="delete_space"]').click()
        cy.get('[data_atr="close_modal"]').click()
        cy.get('[data_atr="delete_space"]').click()
        cy.get('[data_atr="continue_modal_btn"]').click()

      //  cy.get('[data_atr="draftSpace"]').should('have.value', "Draft (0)")
    
    })
})