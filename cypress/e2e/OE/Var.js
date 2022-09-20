
    
// Creds to Host onboarding test
    let email = 'andrew.test.mail.25+100000@gmail.com'

    let roleHost = '1'
    let roleGuest = '0'
    
    let email_host = 'andrew.test.mail.25+100000@gmail.com'
    let email_bad = 'andrew.test.mail.25+12@gmail.com'
    let email_restore = 'andrew.test.mail.25+220@gmail.com'
    let email_notfount = 'aaaaaaa@gggg.com'
    let password_new = 'Qwerty321@'
    let password = 'Qwerty123@' 
    let password_bad = 'Qwerty123@111'
    let last_name = 'Host_Autotest'
    let first_name = 'Cypress'
    let team_name = 'TN1rtyuiopasdfghj333'
    let position = 'Pwertyuiopasdfghj256'
    let TM_invite = 'andrew.test.mail.25+14@gmail.com' //invited TM
    let TM_invite_2 = 'andrew.test.mail.25+13@gmail.com' //invited TM
    let TM_invite_myteam = 'andrew.test.mail.25+8@gmail.com' //invited TM at page my team 
    let host_url = 'http://localhost:3000' 
    let cron_script_payment = 'https://stage.officeexchange.com/api/v.1.0/cron-notifications'
   // let host_url = 'https://officeexchange.com/' 
    let token = 'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZHJldy5idXJ5YW5vdmF0eUBiZWFubWFjaGluZS5kZXYiLCJzdWIiOjc2LCJpYXQiOjE2NDEzODIwNjgsImV4cCI6MTY0MTM4Mzg2OH0.w_LXoU91x7gzxCqoCpywY2Elk9lSr30-_-Kjv7kb9CE';
    let API_Domain = 'https://api.combinify-dev.xyz';

    export const creds_host = {email_host,email_restore,email_notfount, password_new, email,email_bad, password,password_bad, 
        roleGuest, roleHost,
        last_name, first_name, team_name, position, TM_invite, TM_invite_2, host_url, TM_invite_myteam, token, API_Domain, cron_script_payment} 


    // Creds for space listing
    let sqr_space = '1258700'
    let sqr_space_text = '1,258,700'
    let kind_space = 'Corporate office'
    let occup_space = '26-50'
    let floor_total_space = '32'
    let flor_1 = '25'
    let flor_2 = '18'
    let flor_3 = '3'
    let flor_4 = '7'
    let flor_5 = '21'
    let order_floor = '7, 18, 25'
    let address_start = '12345'
    let full_address = '12345 Ventura Blvd, North Hollywood, CA 91604, USA'
    let full_address_ui = '12345 Ventura Blvd, Los Angeles, CA, 91604'
    let str_addres = '12345 Ventura Blvd'
    let security_dep = 45
    let security_error = '46'
    let all_price = '55'
    let all_price_1 = '100'
    let office_price = '30'
    let co_price = '40'
    let start_price = 45
   // let start_price_twoday = '90'
    let name_space = 'Test space from Cypress Autotest'
    let description_space = 'Description from Cypress autotest, create space description'
    let text_true = "Available"

    export const creds_space = {full_address_ui, str_addres, text_true, order_floor,sqr_space_text, security_error, name_space, description_space, all_price_1, security_dep, all_price,office_price, co_price,start_price, full_address, address_start, sqr_space, kind_space, occup_space, floor_total_space, flor_1, flor_2,flor_3, flor_4, flor_5}



// Creds to Tenant onboarding test
    let email_TM = 'andrew.test.mail.25+22@gmail.com'
    let password_TM = 'rW3Sz&3Y' 
    let last_name_TM = 'LNertyuiopasdfghjklq'
    let first_name_TM = 'FNertyuiopasdfghjklq'
    let position_TM = 'Peertyuiopasdfghjklq'
    export const creds_TM = {email_TM, password_TM, last_name_TM, first_name_TM, position_TM}

    //let url_admin = 'https://stage.officeexchange.com'
    let url_admin = 'https://devadmin.officeexchange.com/'
    let email_admin = 'andrew.test.mail.25+100500@gmail.com'
    let password_admin = 'Vj7PUd7z87NDSqV'
    let icon_header = 'Icon header autotest'
    let image_header = 'Image header autotest'
    let image_desc = 'Image description'
    let img_btn_text = 'image button text 123456'
    let img_btn_text_front = 'image button text 12'
    let img_link = '/test'

    
    let square_header = 'Square header autotest'
    let square_desc = 'Square description'
    let square_btn_text = 'square button text 123456'
    let square_btn_text_front = 'square button text 1'
    let square_link = '/test'
    export const creds_admin = {url_admin, email_admin, password_admin, icon_header, image_desc, image_header, img_btn_text,
         img_btn_text_front, img_link, square_btn_text, square_btn_text_front, square_desc, square_header, square_link}


    //creds for tenant 

    let email_tenant = 'andrew.test.mail.25+100001@gmail.com'
    let password_tenant = 'Qwerty123@'
    let book_message = 'test booking current +1 day'
    let book_addres_err = 'Address is a required field'
    let book_city_err = 'City is a required field'
    let book_post_err = 'Postcode is a required field'
    let book_addres1 = '123 State St'
    let book_addres2 = 'Brook'
    let book_city = 'Schenectady'
    let book_post = '12345'
    let firstName = "TestTenant"
    let lastName = "FromCypress"
    let phoneTenant = 12845556681

    export const creds_tenant = {book_addres1,book_addres2, book_city, book_post, book_addres_err, 
        book_city_err, book_post_err, book_message, email_tenant, password_tenant, firstName, lastName, phoneTenant} 

    let card_visa = '4242424242424242'
    let card_american = '378282246310005'
    let cvv_visa = '111'
    let cvv_american = '1111' 
    let card_decline = '4000000000000002'
    let card_stolen = '4000000000009979'
    let card_expird = '4000000000000069'
    let card_cvv_decline = '4000000000000127'
    let card_decline_after = '4000000000000341'
    let card_faill_refund = '4000000000005126'
    let fullname_card = 'Test Testers'
    let expired_date = 1233

    export const card_data = {card_american, card_cvv_decline, card_decline, card_decline_after, card_expird, card_faill_refund, card_stolen,
        card_visa, cvv_visa, cvv_american, fullname_card, expired_date }



    
    


