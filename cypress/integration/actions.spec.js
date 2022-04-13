context("Actions", () => {
    //Visit address before each action and assertion
    beforeEach(() => {
        cy.visit("https://simplest-react-todo-app.herokuapp.com/");
    });

    it("Types into a DOM element", () => {
        cy.get(".form-control")
            .type("Sample item")
            .should("have.value", "Sample item");
    });

    it("Adds new to-do item", () => {
        cy.get(".form-control").type("New item {enter}");
        cy.get(".todo-item").last().should("have.text", " New item");
    });

    it("Hides 'Add New' input and changes info text", () => {
        //Check for search bar
        cy.get(".add-todo");
        cy.get(".info").should("have.text", "Press `Esc` to cancel.");

        cy.get("input").first().type("{esc}");

        cy.get(".add-todo").should("not.exist");
        cy.get(".info").should(
            "have.text",
            "Press `/` to search and `N` to create a new item."
        );
    });

    it("Renders search bar on `/` keystroke and changes .info text", () => {
        cy.get(".info").should("have.text", "Press `Esc` to cancel.");
        cy.get("input").first().type("{esc}");

        cy.get(".info").should(
            "have.text",
            "Press `/` to search and `N` to create a new item."
        );
        cy.get("input").first().type("{/}");

        cy.get("input").first().should("have.attr", "placeholder", "Search");
        cy.get(".info").should("have.text", "Press `Esc` to cancel.");
    });

    it("Hides 'Search' input and changes info text", () => {
        //Check for search bar
        cy.get(".add-todo");
        cy.get(".info").should("have.text", "Press `Esc` to cancel.");

        cy.get("input").first().type("{esc}");

        cy.get(".add-todo").should("not.exist");
        cy.get(".info").should(
            "have.text",
            "Press `/` to search and `N` to create a new item."
        );
    });

    it("Changes classname after item is checked off", () => {
        //Initial class name
        cy.get(".todo-item").first().should("have.class", "pending");
        cy.get("input[type=checkbox]").first().click();

        //Class name after item is checked off becomes completed
        cy.get(".todo-item").first().should("have.class", "completed");
        cy.get("input[type=checkbox]").first().click();

        //Class name should go back to initial after box is unchecked
        cy.get(".todo-item").first().should("have.class", "pending");
    });

    it("Checks off completed item", () => {
        cy.get("input[type=checkbox]").first().click();

        cy.get(".todo-item label")
            .first()
            .should(
                "have.css",
                "text-decoration",
                "line-through solid rgb(170, 170, 170)"
            );
    });

    it("Unchecks to-do item", () => {
        //Click checkbox
        cy.get("input[type=checkbox]").first().click();

        //Check for line-through
        cy.get(".todo-item label")
            .first()
            .should(
                "have.css",
                "text-decoration",
                "line-through solid rgb(170, 170, 170)"
            );

        cy.get("input[type=checkbox]").first().click();

        cy.get(".todo-item label")
            .first()
            .should(
                "have.css",
                "text-decoration",
                "none solid rgb(85, 85, 85)"
            );
    });
});
