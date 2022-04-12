/// <reference types="cypress" />

context("Actions", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });

    // https://on.cypress.io/interacting-with-elements

    it("type into a DOM element", () => {
        // https://on.cypress.io/type
        cy.get(".form-control")
            .type("Sample item")
            .should("have.value", "Sample item");
    });
 });
