import { creds_host } from "./OE/Var"

describe('Check Sign in form', () => {

    it( "Clear test data", () => {
        cy.visit(creds_host.clearTestData)
        cy.contains('success')
    })
})