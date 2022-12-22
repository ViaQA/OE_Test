import { err_css, signup_css } from "../../css"
import { creds_host, creds_space } from "../../Var"
import { listData } from "./ListData"

let kindOfSpace = listData.data_coworking
describe('Full Coworking create flow', () => {
    beforeEach(() => {
        cy.visit(creds_host.host_url)
        cy.log(Cypress.config("viewportWidth"))
        //cy.xpath('//span[text()="Sign in"]/parent::a').click()
        if (Cypress.config("viewportWidth") < 760 ) {
          cy.get('[data_atr="burger_menu_open"]').click({force: true })
        } 
        cy.get('[data_atr = "sign_in"]').click({ multiple: true, force: true })
        cy.get('[data_atr="signInEmail"]').type(creds_host.email_duplicate)
        cy.get('[placeholder="Password"]').type(creds_host.password)
        cy.get('[type="submit"]').click()
      })

    it('Create parent coworking space', () => {
      if (Cypress.config("viewportWidth") < 760 ) {
        cy.get('[data_atr="burger_menu_open"]').click({force: true })
      }
      cy.get('[data_atr="listSpace"]').click({ multiple: true, force: true})
      cy.get('[data_atr="createSpace"]').click()
      cy.get('[data_atr="createListing"]').click()
      cy.get('[data_atr="continue_modal_btn"]').click()
      cy.get(kindOfSpace).click()
      cy.get('[type="submit"]').click()
      //Upploading logo for parent cowork
      cy.get('[data_atr="logo_uppload"]').selectFile("cypress/fixtures/Denver.png", {force: true})

      cy.get('[name="spaceName"]').type(listData.meetingRoomName + 'Coworking')
      cy.get('[name="spaceDescription"]').type(listData.meetingRoomDescription + 'Coworking')
      cy.get('[type="submit"]').click({force: true })

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

    //   cy.get('[data_atr="Hourly"]').click({force: true})
    //   cy.get('[name="pricing.hourly"]').type(listData.priceHourly)
    //   cy.get('[data_atr="Daily"]').click({force: true})
    //   cy.get('[name="pricing.daily"]').type(listData.priceDaily)
    //   cy.get('[data_atr="Monthly"]').click({force: true})
    //   cy.get('[name="pricing.monthly"]').type(listData.priceMonthly)
    //   cy.get('[name="capturePrice"]').type(listData.securityDep)
    //   cy.get('[type="submit"]').click()

      cy.get('[name="streetAddress"]').type(listData.address_queens)
      cy.wait(1000)
      cy.contains(listData.address_queens).click()
      cy.wait(1000)
      cy.get('[name="apt"]').type(listData.apt)
      cy.xpath('//div[text()="Enter floor(s) number"]').click()
      cy.contains(creds_space.flor_1).click({force: true})
      cy.contains(creds_space.flor_2).click({force: true})
      cy.get('[type="submit"]').click()
      cy.contains(listData.step5)

      cy.intercept('POST', '/api/v.1.0/form/images').as('Images')
      cy.get('[name="file"]').parent().selectFile(["cypress/fixtures/Denver.png", "cypress/fixtures/Birmingham.png", 
          "cypress/fixtures/img1.jpg", "cypress/fixtures/img9.jpeg", "cypress/fixtures/img3.png", "cypress/fixtures/img4.jpg", "cypress/fixtures/img5.png", 
          "cypress/fixtures/img6.jpg", "cypress/fixtures/StarWars.jpg", "cypress/fixtures/img7.jpg"],  {subjectType: 'drag-n-drop'})

      cy.wait('@Images').its('response.statusCode').should('eq', 200)
      
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
      cy.contains(listData.step6)
      cy.get('[data_atr="access"]').click()
      cy.intercept('POST', '/api/v.1.0/form').as('Form')
      cy.get('[type="submit"]').click()

      cy.wait('@Form').its('response.statusCode').should('eq', 200)
      cy.contains(listData.step7)


      //Back navigation
      cy.get('[data_atr="back_btn"]').click({force: true})
      cy.get('[data_atr="back_btn"]').click({force: true})
      cy.get('[data_atr="back_btn"]').click({force: true})
      cy.get('[data_atr="back_btn"]').click({force: true})
      cy.get('[data_atr="back_btn"]').click({force: true})
      
      //Name space after back navigation
      cy.get('[name="spaceName"]').should('have.value', listData.meetingRoomName + 'Coworking' )
      cy.get('[name="spaceDescription"]').should('have.value', listData.meetingRoomDescription + 'Coworking')
      cy.get('[name="spaceName"]').clear()
      cy.get('[name="spaceName"]').type(listData.meetingRoomName + 'Coworking1')
      cy.get('[type="submit"]').click()

       //Availability time after back navigation
       cy.get('[data_atr="Monday"]').children().should('have.value', '24 hours')
       cy.get('[data_atr="Thursday"]').children().should('have.value', 'closed')
       cy.get('[data_atr="Wednesday"]').children().should('have.value', '10:00 AM - 02:00 PM')
       cy.get('[type="submit"]').click()

       //Address after back navigation
      //!!!!!!cy.get('[name="streetAddress"]').should('have.value', listData.addres_queens_num + ' ' + listData.addres_queens_street)
      cy.get('[name="streetAddress"]').should('have.css', 'border', signup_css.border_darkblue)
      cy.get('[name="city"]').should('have.value', listData.addres_queens_city)
      cy.get('[name="city"]').should('have.css', 'border', signup_css.border_darkblue)
      cy.get('[name="zipCode"]').should('have.value', listData.address_queens_zip)
      cy.get('[name="zipCode"]').should('have.css', 'border', signup_css.border_darkblue)
      //cy.get('[name="apt"]').should('have.value', listData.apt)
      cy.get('[type="submit"]').click()

      //Photo after back navigation
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

      //Amenities after back navigation
      cy.get('[data_atr="access"]').should('have.css', 'border', signup_css.border_violet1px)
      cy.get('[type="submit"]').click()

      //Create subaspaces
      //Can uncomment after fix OET-1281 
      //cy.contains(listData.meetingRoomName + 'Coworking1')
      

      //hot desk 
      cy.get('[data_atr="addSubspace"]').click()
      cy.get('[data_atr="createListing"]').click()
      cy.get('[data_atr="continue_modal_btn"]').click()
      cy.get('[value="hot desk"]').click({force: true})
      cy.get('[type="submit"]').click()
    
      cy.get('[name="available_day_quantity"]').type(listData.hotdesk_qty)
      cy.get('[name="spaceName"]').type(listData.hotdesk_name)
      cy.get('[name="spaceDescription"]').type(listData.hotdesk_description)

      cy.get('[name="available_day_quantity"]').should('have.value', listData.hotdesk_qty)
      cy.get('[name="spaceName"]').should('have.value', listData.hotdesk_name)
      cy.get('[name="spaceDescription"]').should('have.value', listData.hotdesk_description)

      cy.get('[data_atr="Hourly"]').click({force: true})
      cy.get('[name="pricing.hourly"]').type(listData.priceHourly)
      cy.get('[data_atr="Daily"]').click({force: true})
      cy.get('[name="pricing.daily"]').type(listData.priceDaily)
      cy.get('[data_atr="Monthly"]').click({force: true})
      cy.get('[name="pricing.monthly"]').type(listData.priceMonthly)
      cy.get('[name="capturePrice"]').type(listData.securityDep)

      cy.intercept('POST', '/api/v.1.0/form/images').as('Images')
      cy.get('[name="file"]').parent().selectFile([ "cypress/fixtures/img1.jpg", "cypress/fixtures/img9.jpeg", 
        "cypress/fixtures/img3.png", "cypress/fixtures/img6.jpg",  ],  {subjectType: 'drag-n-drop'})
      cy.wait('@Images').its('response.statusCode').should('eq', 200)
      cy.get('[data-id="1"]')
      cy.get('[data-id="2"]')
      cy.get('[data-id="3"]')
      cy.get('[data-id="4"]')
      cy.intercept('POST', '/api/v.1.0/form').as('Form')
      cy.get('[type="submit"]').click()
      cy.wait('@Form').its('response.statusCode').should('eq', 200)

      //Private office
      cy.get('[data_atr="addSubspace"]').click()
      cy.get('[data_atr="createListing"]').click()
      cy.get('[data_atr="continue_modal_btn"]').click()
      cy.get('[value="private office"]').click({force: true})
      cy.get('[type="submit"]').click()

      cy.get('[name="spaceName"]').type(listData.proffice_name)
      cy.get('[name="spaceDescription"]').type(listData.proffice_description)

      cy.get('[data_atr="Hourly"]').click({force: true})
      cy.get('[name="pricing.hourly"]').type(listData.priceHourly)
      cy.get('[data_atr="Daily"]').click({force: true})
      cy.get('[name="pricing.daily"]').type(listData.priceDaily)
      cy.get('[data_atr="Monthly"]').click({force: true})
      cy.get('[name="pricing.monthly"]').type(listData.priceMonthly)
      cy.get('[name="capturePrice"]').type(listData.securityDep)

      cy.get('[name="square"]').type(listData.square_ft1)
      cy.get('[name="square"]').should('have.value',listData.square_ft1 + ' sqft.')
      
      cy.contains('Enter capacity of your space').click()
      cy.contains('500+').click()
    
      cy.intercept('POST', '/api/v.1.0/form/images').as('Images')
      cy.get('[name="file"]').parent().selectFile([ "cypress/fixtures/img1.jpg", "cypress/fixtures/img9.jpeg", 
        "cypress/fixtures/img3.png", "cypress/fixtures/img6.jpg",  ],  {subjectType: 'drag-n-drop'})
      cy.wait('@Images').its('response.statusCode').should('eq', 200)
      cy.get('[data-id="1"]')
      cy.get('[data-id="2"]')
      cy.get('[data-id="3"]')
      cy.get('[data-id="4"]')

      cy.get('[data_atr="fullyFurnished"]').click()
      cy.get('[data_atr="fullyFurnished"]').should('have.css', 'border', signup_css.border_violet1px)

      cy.get('[type="submit"]').click()

      cy.get('[data_atr="back_btn"]').click({force: true})
      cy.get('[data_atr="security"]').click()

      cy.intercept('POST', '/api/v.1.0/form-edit/*').as('Edit')
      cy.get('[type="submit"]').click()
      cy.wait('@Edit').its('response.statusCode').should('eq', 200)

      cy.contains(listData.proffice_name)

      //private meeting rooms
      cy.get('[data_atr="addSubspace"]').click()
      cy.get('[data_atr="createListing"]').click()
      cy.get('[data_atr="continue_modal_btn"]').click()
      cy.get('[value="private meeting rooms"]').click({force: true})
      cy.get('[type="submit"]').click()

      cy.get('[name="spaceName"]').type(listData.prmeetroom_name)
      cy.get('[name="spaceDescription"]').type(listData.prmeetroom_description)

      cy.get('[data_atr="Hourly"]').click({force: true})
      cy.get('[name="pricing.hourly"]').type(listData.priceHourly)
      cy.get('[data_atr="Daily"]').click({force: true})
      cy.get('[name="pricing.daily"]').type(listData.priceDaily)

      cy.get('[name="square"]').type(listData.square_ft1)
      cy.get('[name="square"]').should('have.value',listData.square_ft1 + ' sqft.')
      
      cy.contains('Enter capacity of your space').click()
      cy.contains('500+').click()

      cy.intercept('POST', '/api/v.1.0/form/images').as('Images')
      cy.get('[name="file"]').parent().selectFile([ "cypress/fixtures/img1.jpg", "cypress/fixtures/img9.jpeg", 
        "cypress/fixtures/img3.png", "cypress/fixtures/img6.jpg",  ],  {subjectType: 'drag-n-drop'})
      cy.wait('@Images').its('response.statusCode').should('eq', 200)
      
      cy.get('[data-id="1"]')
      cy.get('[data-id="2"]')
      cy.get('[data-id="3"]')
      cy.get('[data-id="4"]')

      cy.get('[data_atr="fullyFurnished"]').click()
      cy.get('[data_atr="fullyFurnished"]').should('have.css', 'border', signup_css.border_violet1px)

      cy.get('[type="submit"]').click()

      //event space
      cy.get('[data_atr="addSubspace"]').click()
      cy.get('[data_atr="createListing"]').click()
      cy.get('[data_atr="continue_modal_btn"]').click()
      cy.get('[value="event space"]').click({force: true})
      cy.get('[type="submit"]').click()

      cy.get('[name="spaceName"]').type(listData.espace_name)
      cy.get('[name="spaceDescription"]').type(listData.espace_description)

      cy.get('[data_atr="Hourly"]').click({force: true})
      cy.get('[name="pricing.hourly"]').type(listData.priceHourly)
      cy.get('[data_atr="Daily"]').click({force: true})
      cy.get('[name="pricing.daily"]').type(listData.priceDaily)

      cy.get('[name="square"]').type(listData.square_ft1)
      cy.get('[name="square"]').should('have.value',listData.square_ft1 + ' sqft.')
      
      cy.contains('Enter capacity of your space').click()
      cy.contains('500+').click()

      cy.intercept('POST', '/api/v.1.0/form/images').as('Images')
      cy.get('[name="file"]').parent().selectFile([ "cypress/fixtures/img1.jpg", "cypress/fixtures/img9.jpeg", 
        "cypress/fixtures/img3.png", "cypress/fixtures/img6.jpg",  ],  {subjectType: 'drag-n-drop'})
      cy.wait('@Images').its('response.statusCode').should('eq', 200)
      cy.get('[data-id="1"]')
      cy.get('[data-id="2"]')
      cy.get('[data-id="3"]')
      cy.get('[data-id="4"]')

      cy.get('[data_atr="fullyFurnished"]').click()
      cy.get('[data_atr="fullyFurnished"]').should('have.css', 'border', signup_css.border_violet1px)

      cy.get('[type="submit"]').click()

      //membership passes
      cy.get('[data_atr="addSubspace"]').click()
      cy.get('[data_atr="createListing"]').click()
      cy.get('[data_atr="continue_modal_btn"]').click()
      cy.get('[value="membership passes"]').click({force: true})
      cy.get('[type="submit"]').click()

      cy.get('[data_atr="Daily"]').click({force: true})
      cy.get('[name="price_per_day"]').type(listData.passes_d_price)
      cy.get('[name="available_day_quantity"]').type(listData.passes_qty_d)
      cy.get('[data_atr="Monthly"]').click({force: true})
      cy.get('[name="price_per_month"]').type(listData.passes_m_price)
      cy.get('[name="available_month_quantity"]').type(listData.passes_qty_m)

      cy.intercept('POST', '/api/v.1.0/form').as('Form')
      cy.get('[type="submit"]').click()
      cy.wait('@Form').its('response.statusCode').should('eq', 200)

      cy.get('[data_atr="back_btn"]').click({force: true})
      cy.get('[type="submit"]').click({force: true})
      cy.get('[type="submit"]').click({force: true})

      cy.get('[data_atr="preview_save"]').click()


      cy.intercept('POST', '/api/v.1.0/form-edit/*').as('Edit')
      cy.get('[type="submit"]').click()
      cy.wait('@Edit').its('response.statusCode').should('eq', 200)

      cy.contains('Meeting room name CypressCoworking')


    })

    
})