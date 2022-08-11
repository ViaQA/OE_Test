#!/bin/bash


npx cypress run --spec "cypress/e2e/OE/09HomepageAdmin.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --tag "Create test custom items at admin"
npx cypress run --spec "cypress/e2e/OE/11SwitchOnOffCustomItemHome.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --tag "Switch on test custom icons"
npx cypress run --spec "cypress/e2e/OE/10HomePageCheckCustom.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --tag "Check test custom icon at Home page"
npx cypress run --spec "cypress/e2e/OE/11SwitchOnOffCustomItemHome.cy.js" --browser chrome --record --key f2351ad0-639d-413a-890a-73a36ee4d09c --tag "Switch off test custom icons"
