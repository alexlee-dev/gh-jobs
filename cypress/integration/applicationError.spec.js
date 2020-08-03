/// <reference types="cypress" />

context("Application Error", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  beforeEach(() => {
    cy.fixture("jobs50").then((jobsJson) => {
      cy.server();
      cy.route({
        method: "GET",
        url: "/jobs",
        status: 200,
        response: jobsJson,
        delay: 1000,
      });
      cy.route({
        method: "GET",
        url: "/jobs/search?full_time=false&description=react",
        status: 200,
        response: {},
        delay: 1000,
      });
    });
    cy.visit("http://localhost:3000");
    cy.wait(500);
    // * Create an error with stubbed response
    cy.get("#search").type("react");
    cy.get("#search-submit").click();
    cy.wait(1000);
  });

  it("Should display ErrorFallback correctly when an error occurs", () => {
    cy.get("h1").should("have.text", "Technical Difficulties");
    cy.get("p").should(
      "have.text",
      "Oops! Something went wrong. The error has been reported. Please try again."
    );
    cy.get("#try-again").should("have.text", "Try again");
  });

  it("Should reset application state when the button is clicked", () => {
    cy.get("#try-again").click();
    cy.wait(500);
    cy.get("#search").should("be.visible");
  });
});