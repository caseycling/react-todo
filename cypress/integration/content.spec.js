/// <reference types="cypress" />

context("Contains", () => {
    //Visit address before each action and assertion
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });

    it("Has a title", () => {
        cy.get(".todolist header").should("have.text", "Things To Do");
    });

    it('Contains input with placeholder of "Add New"', () => {
        cy.get("input").first().should("have.attr", "placeholder", "Add New");
    });

    it("Displays three to-do items by default", () => {
        cy.get(".todo-item").should("have.length", 3);

        //Check text of to-do items
        cy.get(".todo-item").first().should("have.text", " Learn Javascript");
        cy.get(".todo-item").eq(1).should("have.text", " Learn React");
        cy.get(".todo-item").last().should("have.text", " Build a React App");
    });

    it("Displays active items", () => {
        cy.get("input[type=checkbox]").first().click();

        cy.get(".filters > li").eq(1).click();

        cy.get(".todo-item").should("have.length", 2);
    });

    it("Displays completed items", () => {
        cy.get("input[type=checkbox]").first().click();

        cy.get(".filters > li").eq(2).click();

        cy.get(".todo-item").should("have.length", 1);
    });

    it("Displays correct number of items left", () => {
        cy.get(".pull-left").should("have.text", "3 items left");

        cy.get("input[type=checkbox]").first().click();
        cy.get(".pull-left").should("have.text", "2 items left");

        cy.get("input[type=checkbox]").first().click();
        cy.get(".pull-left").should("have.text", "3 items left");
    });
});
