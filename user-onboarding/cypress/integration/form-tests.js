describe("test our form inputs", function () {
    beforeEach(function() {
        cy.visit("http://localhost:3000/")
    });

    it("add text to inputs", function() {
        cy.get('[data-cy="name"]')
        .type("Josh")
        .should("have.value", "Josh");

        cy.get('[data-cy="email"]')
        .type("email@email.com")
        .should("have.value", "email@email.com");

        cy.get('[type="checkbox"]')
        .check()
        .should("be.checked");

        cy.contains('Submit')
        .click();
    })
})