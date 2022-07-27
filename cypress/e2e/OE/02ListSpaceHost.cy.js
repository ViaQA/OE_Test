
import {creds_host} from './Var';
import { creds_space } from './Var';
import {creds_admin} from './Var';

describe('Check Sign in form', () => {

    beforeEach(() => {
        cy.visit(creds_host.host_url)
        cy.xpath('//span[text()="Sign in"]/parent::a').click()
        cy.get('[placeholder="Email"]').type(creds_host.email_host)
        cy.get('[placeholder="Password"]').type(creds_host.password)
        cy.get('[type="submit"]').click()
      })



    it('Create new space to listing', () =>{
        cy.xpath('//span[text()="List your space"]').click()
        cy.xpath('//div[text()="Space kind"]/parent::div').click()
        cy.contains(creds_space.kind_space).click()

        cy.get('[type="submit"]').should('be.disabled')
        
        cy.get('[name="square"]').type(creds_space.sqr_space)
        //cy.get('[id="react-select-5-input"]').type(creds_space.occup_space)
        cy.xpath('//div[text()="Maximum occupancy"]').click()
        cy.contains(creds_space.occup_space).click()
        cy.get('[type="submit"]').should('be.disabled')

        cy.get('[name="totalfloors"]').type(creds_space.floor_total_space)
        cy.xpath('//div[text()="Which floors are available for use?"]').click()
        cy.contains(creds_space.flor_1).click()
        
        cy.xpath('//input[@id="react-select-6-input"]/parent::div').click()
        cy.xpath('//input[@id="react-select-6-input"]/parent::div').click()
        cy.contains(creds_space.flor_2).click()

        cy.xpath('//input[@id="react-select-6-input"]/parent::div').click()
        cy.contains(creds_space.flor_3).click()

        cy.xpath('//input[@id="react-select-6-input"]/parent::div').click()
        cy.contains(creds_space.flor_4).click()

        cy.xpath('//input[@id="react-select-6-input"]/parent::div').click()
        cy.contains(creds_space.flor_5).click()

        cy.get('[type="submit"]').click()

        cy.get('[placeholder="Type address..."]').type(creds_space.full_address,)
        cy.get('[placeholder="Type address..."]').type('{enter}')
        cy.get('[type="submit"]').click()

        

        //cy.get('[type="checkbox"]').parent().click({multiple: true})
        //cy.get('[data-id="24", type="checkbox"]').click({force: true})
        //cy.get('[name="all"]').type(creds_space.all_price_1)
       // cy.xpath('[//input[@type="checkbox"]//parent::label]').click({multiple: true})
        //cy.get('[type="checkbox"]').parent().click({multiple: true})
        
        
        cy.get('[name="activities.24"]').should('have.attr', 'value', '')
        cy.get('[name="activities.24"]').type(creds_space.office_price)
        cy.get('[name="activities.24"]').should('have.attr', 'value', '$'+creds_space.office_price)

        cy.get('[name="activities.16"]').should('have.attr', 'value', '')
        cy.get('[name="activities.16"]').type(creds_space.co_price)
        cy.get('[name="activities.16"]').should('have.attr', 'value', '$'+creds_space.co_price)

        cy.get('[name="activities.7"]').should('have.attr', 'value', '')
        cy.get('[name="activities.7"]').type(creds_space.start_price)
        cy.get('[name="activities.7"]').should('have.attr', 'value', '$'+creds_space.start_price)

        cy.get('[type="submit"]').click()

        cy.get('[name="capturePrice"]').type(creds_space.security_error)
        cy.contains('The security deposit cannot be greater than 1.5 times the cost per day to book.')

        cy.get('[name="capturePrice"]').type(creds_space.security_dep)

        cy.get('[type="submit"]').click()

        cy.get('[name="featuresKitchen"]').click({force: true})
        cy.get('[name="featuresElevators"]').click({force: true})
        cy.get('[name="wifi"]').click({force: true})
        cy.get('[name="hvac"]').click({force: true})
        cy.get('[name="fullyFurnished"]').click({force: true})
        cy.get('[name="parking"]').click({force: true})
        cy.get('[name="privetMeetingRooms"]').click({force: true})
        cy.get('[name="privateFloor"]').click({force: true})
        cy.get('[name="concierge"]').click({force: true})
        cy.get('[name="security"]').click({force: true})
        cy.get('[name="bathrooms"]').click({force: true})
        cy.get('[name="access"]').click({force: true})
        cy.get('[name="petFriendly"]').click({force: true})
        
        cy.get('[type="submit"]').click()

        cy.get('[name="file"]').parent().selectFile("cypress/fixtures/img_more_10mb.jpg" , {subjectType: 'drag-n-drop'})
       
        cy.contains('Images must be smaller than 10mb.')
        //.should('have.css', 'background-color', 'rgb(255, 77, 151)')
        
        cy.get('[name="file"]').parent().selectFile(["cypress/fixtures/Denver.png", "cypress/fixtures/Birmingham.png", 
            "cypress/fixtures/img1.jpg", "cypress/fixtures/img2.jfif", "cypress/fixtures/img3.png", "cypress/fixtures/img4.jpg", "cypress/fixtures/img5.png", 
            "cypress/fixtures/img6.jpg", "cypress/fixtures/logo.jfif", "cypress/fixtures/StarWars.jpg", "cypress/fixtures/img7.jpg" ])

        cy.scrollTo('bottom')
        cy.contains('You cannot upload more than 10 images at a time.')
        //.should('have.css', 'background-color', 'rgb(255, 77, 151)')

        cy.get('[name="file"]').parent().selectFile(["cypress/fixtures/Denver.png", "cypress/fixtures/Birmingham.png", 
            "cypress/fixtures/img1.jpg", "cypress/fixtures/img2.jfif", "cypress/fixtures/img3.png", "cypress/fixtures/img4.jpg", "cypress/fixtures/img5.png", 
            "cypress/fixtures/img6.jpg", "cypress/fixtures/StarWars.jpg", "cypress/fixtures/img7.jpg" ])
        
        cy.scrollTo('bottom')
        cy.scrollTo('bottom')
        cy.scrollTo(0, 500)
        cy.xpath('//img[@data-id="8"]').parent().click()
        cy.scrollTo(0, 500)
        cy.xpath('//button[@data-id="9"]').parent().click()
        cy.scrollTo('bottom')
        cy.scrollTo(0, 500)
        cy.get('[type="submit"]').click()

        cy.get('[name="spaceName"]').click()
        cy.get('[name="spaceDescription"]').click()
        cy.get('[name="spaceName"]').should('have.css', 'border', '2px solid rgb(255, 77, 151)')
        cy.get('[name="spaceName"]').click()
        cy.get('[name="spaceDescription"]').should('have.css', 'border', '2px solid rgb(255, 77, 151)')
        cy.get('[name="spaceName"]').type(creds_space.name_space)
        cy.get('[name="spaceDescription"]').type(creds_space.description_space)
        cy.get('[type="submit"]').should('be.disabled')
        cy.get('[name="policy"]').click({force: true})
        // cy.get('[href="/terms-and-conditions]').click()
        
        
        cy.get('[type="submit"]').click()
        cy.contains('Thank you for listing your space.')
        cy.contains('Go to my account').children().click()



        }
        
    )

    it('Check created space', () =>{
        cy.xpath('//span[text()="My account"]').click()
       // cy.get('[data-title="next"]').click()
        cy.contains(creds_space.name_space).click()
        cy.contains(creds_space.description_space)
        cy.xpath('//div[text()="Square ft"]/following-sibling::div').should('have.text', creds_space.sqr_space_text)
        cy.xpath('//div[text()="Capacity"]/following-sibling::div').should('have.text', creds_space.occup_space)
        cy.xpath('//div[text()="Floor"]/following-sibling::div').should('have.text', creds_space.order_floor)
        cy.xpath('//div[text()="Floor"]/following-sibling::div').should('have.text', creds_space.order_floor)
        cy.xpath('//div[text()="Kitchen"]/following-sibling::div').should('have.text', creds_space.text_true)
        cy.xpath('//div[text()="Elevators"]/following-sibling::div').should('have.text', creds_space.text_true)
        cy.xpath('//div[text()="Wifi"]/following-sibling::div').should('have.text', creds_space.text_true)
        cy.xpath('//div[text()="Parking"]/following-sibling::div').should('have.text', creds_space.text_true)
        cy.xpath('//div[text()="Bathroom"]/following-sibling::div').should('have.text', creds_space.text_true)
        cy.contains('8+ more').click()
        cy.xpath('//div[text()="Meeting rooms"]/following-sibling::div').should('have.text', creds_space.text_true)
        cy.xpath('//div[text()="Private floor"]/following-sibling::div').should('have.text', creds_space.text_true)
        cy.xpath('//div[text()="Concierge"]/following-sibling::div').should('have.text', creds_space.text_true)
        cy.xpath('//div[text()="Security"]/following-sibling::div').should('have.text', creds_space.text_true)
        cy.xpath('//div[text()="24 hour access"]/following-sibling::div').should('have.text', creds_space.text_true)
        cy.xpath('//div[text()="Pet friendly"]/following-sibling::div').should('have.text', creds_space.text_true)
        cy.contains(creds_space.full_address_ui)
        cy.contains('View all photos').click()
        cy.contains(creds_space.str_addres).click()
        
    })

    
   


    
    



})