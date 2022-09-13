
import { err_css, signup_css } from "../css"
import { creds_host, creds_space } from "../Var"
import { listData } from "./ListData"

let kindOfSpace = listData.data_other

describe('Check list space flow', () => {

    beforeEach(() => {
        cy.visit(creds_host.host_url)
        //cy.xpath('//span[text()="Sign in"]/parent::a').click()
        if (visualViewport.width < 760 ) {
          cy.get('[data_atr="burger_menu"]').click({force: true })
        }
        cy.get('[data_atr = "sign_in"]').click({ multiple: true, force: true })
        cy.get('[data_atr="signInEmail"]').type(creds_host.email_host)
        cy.get('[placeholder="Password"]').type(creds_host.password)
        cy.get('[type="submit"]').click()
      })



    it('Create Meeting rooms Exit at Start page', () => {
        if (visualViewport.width < 760) {
          cy.get('[data_atr="burger_menu"]').click({force: true })
        }
        cy.get('[data_atr="listSpace"]').click({ multiple: true, force: true})
        //data_atr="exit_mobile"
        
        if (visualViewport.width < 760 ) {
          cy.get('[data_atr="exit_mobile"]').click()
        }else{
          cy.contains('Exit').click()
        }

        cy.contains(listData.home_text)
    })

    it('Create meeting Exit at first page' , () => {
        if (visualViewport.width < 760 ) {
          cy.get('[data_atr="burger_menu"]').click({force: true })
        }
        cy.get('[data_atr="listSpace"]').click({ multiple: true, force: true})
        cy.get('[data_atr="createListing"]').click()
        if (visualViewport.width < 760 ) {
          cy.get('[data_atr="exit_mobile"]').click()
        }else{
          cy.contains('Exit').click()
        }
        cy.contains(listData.home_text)
    })

    it('Create meeting Space Name/Descriptions Validations', () => {
        if (visualViewport.width < 760 ) {
          cy.get('[data_atr="burger_menu"]').click({force: true })
        }
        cy.get('[data_atr="listSpace"]').click({ multiple: true, force: true})
        cy.get('[data_atr="createListing"]').click()
        cy.get('[type="submit"]').should('be.disabled')
        cy.get(kindOfSpace).click()

        
        
        cy.contains(listData.step1)
        cy.get('[type="submit"]').click()
        cy.contains(listData.step2)
        //OET-763 need to add check after fix
        if (visualViewport.width > 760 ) {
          cy.contains('Save and Exit').click()
        }
        
        //Grey should be 1.5px 
        cy.get('[name="spaceName"]').should('have.css', 'border', signup_css.border_grey_half)
        cy.get('[name="spaceDescription"]').should('have.css', 'border', signup_css.border_grey_half)
        //Trigger error
        cy.get('[name="spaceName"]').click()
        cy.get('[name="spaceDescription"]').click()
        cy.get('[type="submit"]').click({force: true})
        //Error validation assert
        cy.get('[name="spaceName"]').should('have.css', 'border', err_css.err_border)
        cy.get('[name="spaceDescription"]').should('have.css', 'border', err_css.err_border)
        cy.xpath('//input[@name="spaceName"]/following-sibling::div').should('have.text', 'Space name' + err_css.err_required).should('have.css', 'color', err_css.err_color)
        cy.xpath('//textarea[@name="spaceDescription"]/following-sibling::div').should('have.text', 'Space description' + err_css.err_required).should('have.css', 'color', err_css.err_color)
        //Enter valid data
        cy.get('[name="spaceName"]').type(listData.meetingRoomName + 'MeetingRooms1' )
        cy.get('[name="spaceDescription"]').type(listData.meetingRoomDescription + 'MeetingRoomsDescr1')
        cy.get('[name="spaceName"]').should('have.css', 'border', signup_css.border_darkblue)
        cy.get('[name="spaceDescription"]').should('have.css', 'border', signup_css.border_darkblue)
        cy.get('[type="submit"]').click()
        if (visualViewport.width > 760 ) {
          cy.contains('Save and Exit').click()
          cy.get('[data_atr="draftSpace"]').click()
          cy.contains(listData.meetingRoomName + 'MeetingRooms')
        }else{
          cy.get('[data_atr="exit_mobile"]').click()
        }
    })
    it('Create meeting Step 3 time for Availability ', () => {
        if (visualViewport.width < 760 ) {
          cy.get('[data_atr="burger_menu"]').click({force: true })
        }
        cy.get('[data_atr="listSpace"]').click({ multiple: true, force: true})
        cy.get('[data_atr="createListing"]').click()
        cy.get(kindOfSpace).click()
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

        cy.get('[data-qa="start-time"]').should('have.css', 'border', signup_css.border_darkblue)
        cy.get('[data-qa="end-time"]').should('have.css', 'border', signup_css.border_darkblue)

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

        //verify err message
        //cy.get('[data-qa="start-time"]').should('have.css','border', err_css.err_border)
        //cy.get('[data-qa="end-time"]').should('have.css','border', err_css.err_border)
        
        cy.get('[data_atr="applyModal"]').click()
        cy.contains(err_css.err_end_start)




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
       
        if (visualViewport.width > 760 ) {
          cy.contains('Save and Exit').click()
          cy.get('[data_atr="draftSpace"]').click()
          cy.contains(listData.meetingRoomName + '2')
        }else{
          cy.get('[data_atr="exit_mobile"]').click()
        }

    })
    it('Create meeting price check step', () => {
        if (visualViewport.width < 760 ) {
          cy.get('[data_atr="burger_menu"]').click({force: true })
        }
        cy.get('[data_atr="listSpace"]').click({ multiple: true, force: true})
        cy.get('[data_atr="createListing"]').click()
        cy.get(kindOfSpace).click()
        cy.get('[type="submit"]').click()

        //Uniqe space name validation at create
        
        if (visualViewport.width > 760 ) {
          cy.get('[name="spaceName"]').type(listData.meetingRoomName + 'MeetingRooms1')
          cy.get('[name="spaceDescription"]').type(listData.meetingRoomDescription)
          cy.get('[name="spaceName"]').should('have.css', 'border', err_css.err_border)
          cy.xpath('//input[@name="spaceName"]/following-sibling::div').should('have.text', 'Space name' + err_css.err_uniq).should('have.css', 'color', err_css.err_color)

          cy.get('[name="spaceName"]').clear()
          cy.get('[name="spaceDescription"]').clear()

          cy.get('[name="spaceName"]').type(listData.meetingRoomName + '2')
          cy.get('[name="spaceDescription"]').click()
          cy.get('[name="spaceName"]').should('have.css', 'border', err_css.err_border)
          cy.xpath('//input[@name="spaceName"]/following-sibling::div').should('have.text', 'Space name' + err_css.err_uniq).should('have.css', 'color', err_css.err_color)

          cy.get('[name="spaceName"]').clear()
          cy.get('[name="spaceDescription"]').clear()
        }
        

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
        cy.contains(listData.pricing_text)
        cy.get('[type="submit"]').should('be.disabled')
        cy.get('[data_atr="Hourly"]').click({force: true})
        cy.get('[name="pricing.hourly"]').type(listData.priceHourly)
        cy.get('[name="pricing.hourly"]').should('have.css', 'border', signup_css.border_darkblue)
        cy.get('[data_atr="Daily"]').click({force: true})
        cy.get('[name="pricing.daily"]').type(listData.priceDaily)
        cy.get('[name="pricing.daily"]').should('have.css', 'border', signup_css.border_darkblue)
        cy.get('[data_atr="Monthly"]').click({force: true})
        cy.get('[name="pricing.monthly"]').type(listData.priceMonthly)
        cy.get('[name="pricing.monthly"]').should('have.css', 'border', signup_css.border_darkblue)
        cy.get('[name="capturePrice"]').type(listData.securityDep)

        //Check clearing input after disabling 
        cy.get('[data_atr="Hourly"]').click({force: true})
        cy.get('[data_atr="Hourly"]').click({force: true})
        cy.get('[name="pricing.hourly"]').should('have.css', 'border',signup_css.border_grey_half)
        cy.get('[name="pricing.hourly"]').type(listData.priceHourly)
        cy.get('[name="pricing.hourly"]').should('have.css', 'border', signup_css.border_darkblue)

        cy.get('[data_atr="Daily"]').click({force: true})
        cy.get('[data_atr="Daily"]').click({force: true})
        cy.get('[name="pricing.daily"]').should('have.css', 'border',signup_css.border_grey_half)
        cy.get('[name="pricing.daily"]').type(listData.priceHourly)
        cy.get('[name="pricing.daily"]').should('have.css', 'border', signup_css.border_darkblue)

        cy.get('[data_atr="Monthly"]').click({force: true})
        cy.get('[data_atr="Monthly"]').click({force: true})
        cy.get('[name="pricing.monthly"]').should('have.css', 'border',signup_css.border_grey_half)
        cy.get('[name="pricing.monthly"]').type(listData.priceMonthly)
        cy.get('[name="pricing.monthly"]').should('have.css', 'border', signup_css.border_darkblue)

        cy.get('[name="capturePrice"]').type(listData.securityDepInvalid)
        //Should be verify error border and error message about capture price
        //cy.get('[name="capturePrice"]').
        cy.xpath('//input[@name="capturePrice"]/following-sibling::p').should('have.css', 'color', err_css.err_color)
        
        cy.get('[name="capturePrice"]').clear()
        cy.get('[name="capturePrice"]').type(listData.securityDep)

       
        if (visualViewport.width > 760 ) {
          cy.contains('Save and Exit').click()
          cy.get('[data_atr="draftSpace"]').click()
          cy.contains(listData.meetingRoomName + '3')
        }else{
          cy.get('[data_atr="exit_mobile"]').click()
        }


    })
    it('Create meeting Address step test', () => {
        //Precondition
        if (visualViewport.width < 760 ) {
          cy.get('[data_atr="burger_menu"]').click({force: true })
        }
        cy.get('[data_atr="listSpace"]').click({ multiple: true, force: true})
        cy.get('[data_atr="createListing"]').click()
        cy.get(kindOfSpace).click()
        cy.get('[type="submit"]').click()
        cy.get('[name="spaceName"]').type(listData.meetingRoomName + '4' )
        cy.get('[name="spaceDescription"]').type(listData.meetingRoomDescription + '4')
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

        //Initial state
        cy.get('[name="streetAddress"]').should('have.css', 'border', signup_css.border_grey_half)
        cy.get('[name="apt"]').should('have.css', 'border', signup_css.border_grey_half)
        cy.get('[name="city"]').should('have.css', 'border', signup_css.border_grey_half)
        cy.get('[name="zipCode"]').should('have.css', 'border', signup_css.border_grey_half)
        cy.get('[type="submit"]').should('be.disabled')

        //Test Quens
        cy.get('[name="streetAddress"]').type(listData.address_queens)
        cy.contains(listData.address_queens).click()
        cy.get('[name="apt"]').should('have.css', 'border', signup_css.border_grey_half)
        cy.get('[name="apt"]').type(listData.apt)
        cy.get('[name="apt"]').should('have.value', listData.apt)
        cy.get('[name="apt"]').should('have.css', 'border', signup_css.border_darkblue)

        cy.get('[name="streetAddress"]').should('have.value', listData.addres_queens_num + ' ' + listData.addres_queens_street)
        cy.get('[name="streetAddress"]').should('have.css', 'border', signup_css.border_darkblue)
        cy.get('[name="city"]').should('have.value', listData.addres_queens_city)
        cy.get('[name="city"]').should('have.css', 'border', signup_css.border_darkblue)
        cy.get('[name="zipCode"]').should('have.value', listData.address_queens_zip)
        cy.get('[name="zipCode"]').should('have.css', 'border', signup_css.border_darkblue)
        
        //Test Lake succes
        cy.get('[name="streetAddress"]').clear()
        cy.get('[name="streetAddress"]').type(listData.addres_lakesucces)
        cy.contains(listData.addres_lakesucces).click()
        cy.get('[name="apt"]').type(listData.apt)
        cy.get('[name="apt"]').should('have.value', listData.apt)
        cy.get('[name="apt"]').should('have.css', 'border', signup_css.border_darkblue)

        cy.get('[name="streetAddress"]').should('have.value', listData.addres_lakesucces_num + ' ' + listData.addres_lakesucces_street)
        cy.get('[name="streetAddress"]').should('have.css', 'border', signup_css.border_darkblue)
        cy.get('[name="city"]').should('have.value', listData.addres_lakesucces_city)
        cy.get('[name="city"]').should('have.css', 'border', signup_css.border_darkblue)
        cy.get('[name="zipCode"]').should('have.value', listData.addres_lakesucces_zip)
        cy.get('[name="zipCode"]').should('have.css', 'border', signup_css.border_darkblue)


        //Floors test 
        cy.xpath('//div[text()="Enter floor(s) number"]').click()
        cy.contains(creds_space.flor_1).click({force: true})
        cy.contains(creds_space.flor_2).click({force: true})
        cy.contains(creds_space.flor_3).click({force: true})
        cy.contains(creds_space.flor_4).click({force: true})
        cy.get('[type="submit"]').click()


        if (visualViewport.width > 760 ) {
          cy.contains('Save and Exit').click()
          cy.get('[data_atr="draftSpace"]').click()
          cy.contains(listData.meetingRoomName + '4')
        }else{
          cy.get('[data_atr="exit_mobile"]').click()
        }
        
    })
    it('Create meeting capacity step test', () => {

        if (visualViewport.width < 760 ) {
          cy.get('[data_atr="burger_menu"]').click({force: true })
        }
        cy.get('[data_atr="listSpace"]').click({ multiple: true, force: true})
        cy.get('[data_atr="createListing"]').click()
        cy.get(kindOfSpace).click()
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

        //Initial step
       // cy.get('[name="square"]').should('have.css', 'border', signup_css.border_grey_half)
        cy.get('[name="square"]').type(listData.square_ft1)
       // .should('have.css', 'border', signup_css.border_darkblue)

        cy.get('[data-value="1"]').click()
          .should('have.css', 'background-color', signup_css.violet_800)
        cy.get('[data-value="2"]').click()
          .should('have.css', 'background-color', signup_css.violet_800)
        cy.get('[data-value="1"]').should('have.css', 'color', signup_css.text_color_grey)

        cy.get('[data-value="3"]').click()
          .should('have.css', 'background-color', signup_css.violet_800)
        cy.get('[data-value="2"]').should('have.css', 'color', signup_css.text_color_grey)

        cy.get('[data-value="4"]').click()
          .should('have.css', 'background-color', signup_css.violet_800)
        cy.get('[data-value="3"]').should('have.css', 'color', signup_css.text_color_grey)

        cy.get('[data-value="5"]').click()
          .should('have.css', 'background-color', signup_css.violet_800)
        cy.get('[data-value="4"]').should('have.css', 'color', signup_css.text_color_grey)

        cy.get('[type="submit"]').click()

        

        if (visualViewport.width > 760 ) {
          cy.contains('Save and Exit').click()
          cy.get('[data_atr="draftSpace"]').click()
          cy.contains(listData.meetingRoomName + '5')
        }else{
          cy.get('[data_atr="exit_mobile"]').click()
        }
    })

    it('Create meeting uppload photo step test', () => {
        if (visualViewport.width < 760 ) {
          cy.get('[data_atr="burger_menu"]').click({force: true })
        }
        cy.get('[data_atr="listSpace"]').click({ multiple: true, force: true})
        cy.get('[data_atr="createListing"]').click()
        cy.get(kindOfSpace).click()
        cy.get('[type="submit"]').click()
        cy.get('[name="spaceName"]').type(listData.meetingRoomName + '6' )
        cy.get('[name="spaceDescription"]').type(listData.meetingRoomDescription + '6')
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

        cy.wait(13000)
        cy.xpath('//button[@data-id="2"]').click({ multiple: true })
        cy.xpath('//button[text()="Delete"]').click()

        cy.get('[type="submit"]').click()

        if (visualViewport.width > 760 ) {
          cy.contains('Save and Exit').click()
          cy.get('[data_atr="draftSpace"]').click()
          cy.contains(listData.meetingRoomName + '6')
        }else{
          cy.get('[data_atr="exit_mobile"]').click()
        }
    })
})