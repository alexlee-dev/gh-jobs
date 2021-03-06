/// <reference types="cypress" />

context("Login - Success", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
  });

  it("Should be able to log in with existing account", () => {
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();

    cy.get("#nav-login").should("not.exist");
    cy.get("#search").should("be.visible");
  });

  it("Should be able to get to Signup from Login page", () => {
    cy.get("#create-an-account").click();
    cy.get("h1").should("have.text", "Create Account");
  });
});

context("Login - Error", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
  });

  it("Should not allow to login with invalid credentials for an existing account", () => {
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Blue123456!!!");
    cy.get("#log-in").click();
    cy.get("#notification").should("have.text", "Invalid credentials.");
  });

  it("Should not allow to login with an account that does not exist", () => {
    cy.get("#email").type("fake@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.get("#notification").should(
      "have.text",
      "We couldn't find a user with that email address. Please create an account, or provide another email address."
    );
  });
});
