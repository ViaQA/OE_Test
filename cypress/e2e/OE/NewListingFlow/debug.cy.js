
import { err_css, signup_css } from "../css"
import { creds_host, creds_space } from "../Var"
import { listData } from "./ListData"


describe('Check Sign up form', () => {
    beforeEach(() => {
        cy.visit(creds_host.host_url)
        //cy.xpath('//span[text()="Sign in"]/parent::a').click()
        cy.contains('Sign in').click({ multiple: true })
        cy.get('[data_atr="signInEmail"]').type(creds_host.email_host)
        cy.get('[placeholder="Password"]').type(creds_host.password)
        cy.get('[type="submit"]').click()
      })


    it('Create meeting uppload photo step test', () => {
        cy.get('[data_atr="listSpace"]').click()
        cy.get('[data_atr="createListing"]').click()
        cy.get('[data_atr="meetingRooms"]').click()
        cy.get('[type="submit"]').click()
        cy.get('[name="spaceName"]').type(listData.meetingRoomName + '5' )
        cy.get('[name="spaceDescription"]').type(listData.meetingRoomDescription + '5')
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
        cy.contains(listData.address_queens).click()
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
                                  .should('have.css', 'background-color', signup_css.violet_800)
        cy.get('[type="submit"]').click()

        //Initial step
        cy.contains(listData.step7)
        cy.get('[type="submit"]').should('be.disabled')

        cy.get('[name="file"]').parent().selectFile("cypress/fixtures/img_more_10mb.jpg" , {subjectType: 'drag-n-drop'})
       // cy.get('[name="file"]').parent().parent().should('have.css', 'border', err_css.err_border)
                                
        cy.contains('Images must be smaller than 10mb.')
        //.should('have.css', 'color', err_css.err_color)

        
        cy.get('[name="file"]').parent().selectFile(["cypress/fixtures/Denver.png", "cypress/fixtures/Birmingham.png", 
            "cypress/fixtures/img1.jpg", "cypress/fixtures/img2.jfif", "cypress/fixtures/img3.png", "cypress/fixtures/img4.jpg", "cypress/fixtures/img5.png", 
            "cypress/fixtures/img6.jpg", "cypress/fixtures/logo.jfif", "cypress/fixtures/StarWars.jpg", "cypress/fixtures/img7.jpg" ])
        
        
            // cy.get('[name="file"]').parent().parent().should('have.css', 'border', err_css.err_border)
        cy.contains('You cannot upload more than 10 images at a time.')
        //.should('have.css', 'color', err_css.err_color)

        cy.get('[name="file"]').parent().selectFile(["cypress/fixtures/Denver.png", "cypress/fixtures/Birmingham.png", 
            "cypress/fixtures/img1.jpg", "cypress/fixtures/img2.jfif", "cypress/fixtures/img3.png", "cypress/fixtures/img4.jpg", "cypress/fixtures/img5.png", 
            "cypress/fixtures/img6.jpg", "cypress/fixtures/StarWars.jpg", "cypress/fixtures/img7.jpg" ])

        cy.wait(10000)
        cy.xpath('//button[@data-id="2"]').click({ multiple: true })
        cy.xpath('//button[text()="Delete"]').click()

        cy.get('[type="submit"]').click()

        
    })
})




