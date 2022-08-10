#!/bin/bash

npx cypress run --spec "cypress/e2e/OE/01SignUpTenant.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --tag "Sign Up tenant"
npx cypress run --spec "cypress/e2e/OE/1SignInForm.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --tag "Sign In host"
npx cypress run --spec "cypress/e2e/OE/02ListSpaceHost.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --tag "List Space"
npx cypress run --spec "cypress/e2e/OE/03Admin_approve.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --tag "Approve space"
npx cypress run --spec "cypress/e2e/OE/04CreateBookingRequest.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --tag "Create booking request"
npx cypress run --spec "cypress/e2e/OE/05ApproveDeclineBooking.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --tag "Approve than decline request"
npx cypress run --spec "cypress/e2e/OE/04CreateBookingRequest.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --tag "Create booking request"
npx cypress run --spec "cypress/e2e/OE/06ApproveRequest.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --tag "Approve request"
npx cypress run --spec "cypress/e2e/OE/07TransactionSeccesed.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --tag "Send money to host script"
npx cypress run --spec "cypress/e2e/OE/08Declinerequest.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --tag "Decline request at seccesed payment"



