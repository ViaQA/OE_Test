#!/bin/bash

npx cypress run --spec "cypress/e2e/clearTestData.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --tag "Clear test data"

npx cypress run --spec "cypress/e2e/OE/01SignUpTenant.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --config viewportWidth=375,viewportHeight=677 --tag "Sign Up tenant [Mobile]"
npx cypress run --spec "cypress/e2e/OE/1SignInForm.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --config viewportWidth=375, viewportHeight=677 --tag "Sign In host [MOBILE]"
npx cypress run --spec "cypress/e2e/OE/NewListingFlow/ListSpaceMobileV.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --config viewportWidth=375, viewportHeight=677 --tag "List space flow [MOBILE]"

npx cypress run --spec "cypress/e2e/clearTestData.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --tag "Clear test data"

npx cypress run --spec "cypress/e2e/OE/01SignUpTenant.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --config viewportWidth=1980,viewportHeight=1024 --tag "Sign Up tenant [DESKTOP]"
npx cypress run --spec "cypress/e2e/OE/1SignInForm.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --config viewportWidth=1980, viewportHeight=1024 --tag "Sign In host [DESKTOP]"
npx cypress run --spec "cypress/e2e/OE/NewListingFlow/ListSpaceMobileV.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --config viewportWidth=1980, viewportHeight=1024 --tag "List space flow [DESKTOP]"

npx cypress run --spec "cypress/e2e/OE/09HomepageAdmin.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --tag "Create test custom items at admin"
npx cypress run --spec "cypress/e2e/OE/11SwitchOnOffCustomItemHome.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --tag "Switch on test custom icons"
npx cypress run --spec "cypress/e2e/OE/10HomePageCheckCustom.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --tag "Check test custom icon at Home page"
npx cypress run --spec "cypress/e2e/OE/11SwitchOnOffCustomItemHome.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --tag "Switch off test custom icons"
