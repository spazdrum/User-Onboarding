describe("test our form inputs", function () {
    beforeEach(function() {
        cy.visit("http://localhost:3000/")
    });

    it("add text to inputs", function() {
        cy.get('[data-cy="name"]')
        .type("Josh Schmidt")
        .should("have.value", "Josh Schmidt");

        cy.get('[data-cy="email"]')
        .type("email@email.com")
        .should("have.value", "email@email.com");

        cy.get('[data-cy="password"]')
        .type("abcdefgh")
        .should("have.value", "abcdefgh");

        cy.get('[type="checkbox"]')
        .check()
        .should("be.checked");

        cy.contains('Submit')
        .click();
    })
})