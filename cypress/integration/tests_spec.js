describe('testing the whole web-flow', () => {
    it('user made successful login', () => {
        // login
        cy.visit('http://localhost:3000/')
        cy.findByText(/diga search/i)
        cy.findByRole('button', { name: /sign in with github/i }).click()

        cy.intercept({
            method: "POST",
            url: 'https://9uj0ihoex6.execute-api.eu-west-1.amazonaws.com/dev/auth'
        }).as("getToken")

        cy.intercept({
            method: "POST",
            url: 'https://api.github.com/graphql'
        }).as("getAuth")

        cy.wait('@getToken').its('response.statusCode').should('equal', 200)
        // testing for successful authorization by confirming if a valid avatar was returned from the github api
        cy.get('[class="avatar_container"]').should('exist')
        cy.get('[id="avatarimg"]').should('have.attr', 'src').should('include', 'https://avatars.githubusercontent.com')
    })
    it('user could search on the landing page', () => {
        // testing for the search functionality on the landing page
        cy.findByRole('button', { name: /search/i }).should('be.disabled')
        cy.get('[id="search_id"]').type("react")
        cy.findByRole('button', { name: /search/i }).should('be.enabled')
        cy.findByRole('button', { name: /search/i }).click()
    })
    it('valid results containing the search parameter were returned and user \
    could toggle between the repositories category and users category', () => {
        // testing that valid results that match the search parameters were returned
        cy.get('[class="card_h3"]').should('exist')
        cy.get('[id="card_users"]').contains('react')
        cy.get('[class="card_h3"]').should('have.length.lessThan', 11)
        cy.get('[class="toggle"]').should('exist')
        cy.get('[id="repo_div"]').click()
        cy.get('[id="repo_text"]').should('exist')
        cy.get('[id= "repo_card"]').contains('react')
        cy.get('[id="users_div"]').click()
        cy.get('[id="users_text"]').should('exist')
        cy.get('[id="card_users"]').contains('react')

    })
    it('user could search using the search button in the Navbar', () => {
        // testing the nav search button and checking if the results in each category contains the search paramaeter
        cy.get('[class = "nav_button_search"]').should('be.disabled')
        cy.get('[class="nav_search_input"]').type("dave")
        cy.get('[class = "nav_button_search"]').should('be.enabled')
        cy.get('[class = "nav_button_search"]').click()
    })
    it('results returned from the search button matched the search parameter', () => {
        cy.get('[id="card_users"]').contains('dave')
        cy.get('[id="repo_div"]').click()
        cy.get('[id= "repo_card"]').contains('dave')
        cy.get('[id="users_div"]').click()
        cy.get('[id="card_users"]').contains('dave')

    })
    it('user could go to the next set of responses with the pagination button', () => {
        // testing the pagination button and checking if the results match the search parameter
        cy.get('[class="active_btn"]').click()
        cy.get('[id="card_users"]').contains('dave')
        cy.get('[id="repo_div"]').click()
        cy.get('[id= "repo_card"]').contains('dave')
        cy.get('[id="users_div"]').click()
        cy.get('[id="card_users"]').contains('dave')

    })

})