#!/bin/bash

npx cypress run --reporter mochawesome --spec "cypress/e2e/01clearTestData.cy.js,cypress/e2e/OE/01SignUpTenant.cy.js,cypress/e2e/OE/1SignInForm.cy.js,cypress/e2e/OE/NewListingFlow/01ListSpaceMobileV.cy.js,cypress/e2e/OE/NewListingFlow/02ListSpaceBackNav.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --config viewportWidth=375,viewportHeight=677 --tag "SignIn/UP,ListSpaceFlow,[Mobile]"

npx cypress run --reporter mochawesome --spec "cypress/e2e/01clearTestData.cy.js,cypress/e2e/OE/01SignUpTenant.cy.js,cypress/e2e/OE/1SignInForm.cy.js,cypress/e2e/OE/NewListingFlow/01ListSpaceMobileV.cy.js,cypress/e2e/OE/NewListingFlow/02ListSpaceBackNav.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --config viewportWidth=1980,viewportHeight=1024 --tag "SignIn/UP,ListSpaceFlow,[Desktop]"



$SHELL

npx cypress run --reporter mochawesome --spec "cypress/e2e/01clearTestData.cy.js,cypress/e2e/OE/TestExecution/" --config viewportWidth=375,viewportHeight=677
npx cypress run --reporter mochawesome --spec "cypress/e2e/01clearTestData.cy.js,cypress/e2e/OE/TestExecution" --config viewportWidth=1980,viewportHeight=1024
npx cypress run --reporter mochawesome --spec "cypress/e2e/01clearTestData.cy.js,cypress/e2e/OE/HomePageCustom" --config viewportWidth=1980,viewportHeight=1024
