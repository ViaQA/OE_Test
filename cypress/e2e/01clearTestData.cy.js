import { creds_host } from "./OE/Var"

describe('Clear test data', () => {

    it( "Clear test data", () => {
        cy.visit(creds_host.clearTestData)
        cy.contains('success')
    })
})