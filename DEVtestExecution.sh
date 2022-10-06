#!/bin/bash

npx cypress run --spec "cypress/e2e/01clearTestData.cy.js,cypress/e2e/OE/TestExecution/" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --config viewportWidth=375,viewportHeight=677 --tag "Onboadring, List space, [Mobile]"
npx cypress run --spec "cypress/e2e/01clearTestData.cy.js,cypress/e2e/OE/TestExecution/" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --config viewportWidth=1980,viewportHeight=1024 --tag "Onboadring, List space, [DESKTOP]"
npx cypress run --spec "cypress/e2e/01clearTestData.cy.js,cypress/e2e/OE/HomePageCustom/" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --config viewportWidth=1980,viewportHeight=1024 --tag "Home page custom fields"

$SHELL