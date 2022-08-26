
import { err_css, signup_css } from "../css"
import { creds_host } from "../Var"
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



    it('Create Meating rooms Exit at Start page', () => {
        cy.get('[data_atr="listSpace"]').click()
        cy.contains('Exit').click()
        cy.contains(listData.home_text)
    })

    it('Create meeting Exit at first page' , () => {
        cy.get('[data_atr="listSpace"]').click()
        cy.get('[data_atr="createListing"]').click()
        cy.contains('Exit').click()
        cy.contains(listData.home_text)
    })
    it('Create meeting Space Name/Descriptions Validations', () => {
        cy.get('[data_atr="listSpace"]').click()
        cy.get('[data_atr="createListing"]').click()
        cy.get('[data_atr="meetingRooms"]').click()

        //cy.contains('Save and Exit').click()
        
        cy.contains(listData.step1)
        cy.get('[type="submit"]').click()
        cy.contains(listData.step2)
        //Grey
        cy.get('[name="spaceName"]').should('have.css', 'border', signup_css.border_grey)
        cy.get('[name="spaceDescription"]').should('have.css', 'border', signup_css.border_grey)
        //Trigger error
        cy.get('[name="spaceName"]').click()
        cy.get('[name="spaceDescription"]').click()
        cy.get('[type="submit"]').click({force: true})
        //Error validation assert
        cy.get('[name="spaceName"]').should('have.css', 'border', err_css.err_border)
        cy.get('[name="spaceDescription"]').should('have.css', 'border', err_css.err_border)
        cy.xpath('//input[@name="spaceName"]/following-sibling::div').should('have.text', 'Space name' + err_css.err_required).should('have.css', 'color', err_css.err_color)
        //cy.xpath('//input[@name="spaceDescription"]/following-sibling::div').should('have.text', 'Space description' + err_css.err_required).should('have.css', 'color', err_css.err_color)
        //Enter valid data
        cy.get('[name="spaceName"]').type(listData.meetingRoomName + '1' )
        cy.get('[name="spaceDescription"]').type(listData.meetingRoomDescription + '1')
        cy.get('[name="spaceName"]').should('have.css', 'border', signup_css.border_darkblue)
        cy.get('[name="spaceDescription"]').should('have.css', 'border', signup_css.border_darkblue)
        cy.get('[type="submit"]').click()
        cy.contains('Save and Exit').click()
        cy.contains(listData.meetingRoomName + '1')
    })
    it('Create meeting Step 3 time for Availability ', () => {
        cy.get('[data_atr="listSpace"]').click()
        cy.get('[data_atr="createListing"]').click()
        cy.get('[data_atr="meetingRooms"]').click()
        cy.get('[type="submit"]').click()
        cy.get('[name="spaceName"]').type(listData.meetingRoomName + '2' )
        cy.get('[name="spaceDescription"]').type(listData.meetingRoomDescription + '2')
        cy.get('[type="submit"]').click()

        cy.contains(listData.step3)

        //Verify that close btn not apply changes
        cy.get('[data_atr="Tuesday"]').click()
        cy.get('[data_atr="Wed"]').click()
        cy.get('[data_atr="Fri"]').click()
        //cy.get('[data_atr="Fri"]').should('have.css', 'background', signup_css.dark_blue_day)
        cy.get('[data_atr="time24Hour"]').click()
        cy.get('[data_atr="Fri"]').click()
        //cy.get('[data_atr="Fri"]').should('have.css', 'background', signup_css.white_color)
        cy.get('[data_atr="closeModalbutton"]').click()

        cy.get('[data_atr="Tuesday"]').children().should('have.value', '')
        cy.get('[data_atr="Wednesday"]').children().should('have.value', '')
        cy.get('[data_atr="Friday"]').children().should('have.value', '')

        cy.get('[data_atr="Sunday"]').click()
        cy.get('[data_atr="timeClosed"]').click()
        cy.get('[data_atr="closeModalbutton"]').click()

        cy.get('[data_atr="Sunday"]').children().should('have.value', '')

        //Verify that changes is apply
        cy.get('[data_atr="Saturday"]').click()
        cy.get('[data_atr="Mon"]').click()
        cy.get('[data_atr="time24Hour"]').click()
        cy.get('[data_atr="applyModal"]').click()

        cy.get('[data_atr="Saturday"]').children().should('have.value', '24 hours')
        cy.get('[data_atr="Monday"]').children().should('have.value', '24 hours')

        //Verify taht time changing
        cy.get('[data_atr="Thursday"]').click('')
        cy.get('[data_atr="timeClosed"]').click()
        cy.get('[data_atr="applyModal"]').click()

        cy.get('[data_atr="Thursday"]').children().should('have.value', 'closed')

        //verify that start and end time 12:00AM is equal 24 hours
        cy.get('[data_atr="Monday"]').click()
        cy.get('[data_atr="time24Hour"]').should('have.css', 'border', signup_css.border_violet2px)
        cy.get('[data_atr="Mon"]').should('have.css', 'color', signup_css.white_color)
        cy.get('[data_atr="startAMPM"]').should('have.text', 'AM')
        cy.get('[data_atr="closeAMPM"]').should('have.text', 'AM')
        cy.get('[data-qa="start-time"]').type('12')
        cy.get('[data_atr="time24Hour"]').should('have.css','border', signup_css.border_grey2px)
        cy.get('[data-qa="end-time"]').type('12')
        cy.get('[data_atr="applyModal"]').click()
        cy.get('[data_atr="Monday"]').children().should('have.value', '24 hours')

        //verify that data about time set to modal
        cy.get('[data_atr="Monday"]').click()
        cy.get('[data_atr="startAMPM"]').should('have.text', 'AM')
        cy.get('[data_atr="closeAMPM"]').should('have.text', 'AM')
        cy.get('[data_atr="applyModal"]').click()

        //verify that custom hours save and showing
        cy.get('[data_atr="Friday"]').click()
        cy.get('[data-qa="start-time"]').type('1011')
        cy.get('[data-qa="start-time"]').should('have.value', listData.custom_start_time)
        cy.get('[data-qa="end-time"]').type('0222')
        cy.get('[data-qa="end-time"]').should('have.value', listData.custom_end_time)


//NEED TO SHOW ERROR MESSAGE!!!!!!!!
        
        cy.get('[data_atr="closeAMPM"]').click()
        cy.get('[data_atr="closeAMPM"]').should('have.text', 'PM')
        cy.get('[data_atr="Sun"]').click()
        cy.get('[data_atr="applyModal"]').click()

        cy.get('[data_atr="Friday"]').children().should('have.value', listData.custom_time_avail)
        cy.get('[data_atr="Sunday"]').children().should('have.value', listData.custom_time_avail)
        

        //verify that custom time set to modal
        cy.get('[data_atr="Friday"]').click()
        cy.get('[data-qa="start-time"]').should('have.value', listData.custom_start_time)
        cy.get('[data-qa="end-time"]').should('have.value', listData.custom_end_time)
        cy.get('[data_atr="closeModalbutton"]').click()


        cy.get('[type="submit"]').click()
        cy.contains('Save and Exit').click()
        cy.contains(listData.meetingRoomName + '2')

    })
    it('Create meeting price check step', () => {
        cy.get('[data_atr="listSpace"]').click()
        cy.get('[data_atr="createListing"]').click()
        cy.get('[data_atr="meetingRooms"]').click()
        cy.get('[type="submit"]').click()

        //Uniqe space name validation at create
        cy.get('[name="spaceName"]').type(listData.meetingRoomName + '1')
        cy.get('[name="spaceDescription"]').type(listData.meetingRoomDescription)
        cy.get('[name="spaceName"]').should('have.css', 'border', err_css.err_border)
        cy.xpath('//input[@name="spaceName"]/following-sibling::div').should('have.text', 'Space name' + err_css.err_uniq).should('have.css', 'color', err_css.err_color)

        cy.get('[name="spaceName"]').clear()
        cy.get('[name="spaceDescription"]').clear()

        cy.get('[name="spaceName"]').type(listData.meetingRoomName + '2')
        cy.get('[name="spaceDescription"]').click()
        cy.get('[name="spaceName"]').should('have.css', 'border', err_css.err_border)
        cy.xpath('//input[@name="spaceName"]/following-sibling::div').should('have.text', 'Space name' + err_css.err_uniq).should('have.css', 'color', err_css.err_color)

        cy.get('[name="spaceName"]').type(listData.meetingRoomName + '3' )
        cy.get('[name="spaceDescription"]').type(listData.meetingRoomDescription + '3')
        cy.get('[type="submit"]').click()
        cy.get('[data_atr="Sunday"]').click()
        cy.get('[data_atr="Mon"]').click()
        cy.get('[data_atr="Tue"]').click()
        cy.get('[data_atr="Wed"]').click()
        cy.get('[data_atr="Thu"]').click()
        cy.get('[data_atr="Fri"]').click()
        cy.get('[data_atr="Sat"]').click()
        cy.get('[data_atr="time24Hour"]').click()
        cy.get('[data_atr="applyModal"]').click()
        cy.get('[type="submit"]').click()
        cy.contains(listData.step4)
        cy.get('[data_atr="Hourly"]').click({force: true})
        cy.get('[name="pricing.hourly"]').type(listData.priceHourly)
        cy.get('[data_atr="Daily"]').click({force: true})
        cy.get('[name="pricing.daily"]').type(listData.priceDaily)
        cy.get('[data_atr="Monthly"]').click({force: true})
        cy.get('[name="pricing.monthly"]').type(listData.priceMonthly)

        cy.get('[name="capturePrice"]').type(listData.securityDepInvalid)
        cy.get('[name="capturePrice"]').clear()

        cy.get('[name="capturePrice"]').type(listData.securityDep)

        cy.contains('Save and Exit').click()

        cy.contains(listData.meetingRoomName + '3')

    })
    //it('Create meeting', () => {

        

        
   // })
    //it('Create meeting', () => {

        
  //  })
})