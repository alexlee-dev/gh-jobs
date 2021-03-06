/// <reference types="cypress" />

context("Signup - Success", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
    cy.get("#create-an-account").click();
    cy.get("h1").should("have.text", "Create Account");
    cy.get("#nav-login").should("be.visible");
  });

  it("Should be able to sign up a new account", () => {
    cy.get("#name").type("Bob Test 2");
    cy.get("#email").type("bobtest2@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#confirm-password").type("Red123456!!!");
    cy.get("#signup").click();

    cy.get("#nav-login").should("not.exist");
    cy.get("#search").should("be.visible");

    // * Cleanup
    cy.get("#nav-profile").click();
    cy.get("#settings").click();
    cy.get("#delete-profile").click();
    cy.get("#delete-profile-confirm").click();
  });

  it("Should be able to get to Login from Signup page", () => {
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
  });
});

context("Signup - Error", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
    cy.get("#create-an-account").click();
    cy.get("h1").should("have.text", "Create Account");
    cy.get("#nav-login").should("be.visible");
  });

  it("Should not allow to signup with existing account", () => {
    cy.get("#name").type("Bob Test");
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#confirm-password").type("Red123456!!!");
    cy.get("#signup").click();

    cy.get("#notification").should(
      "have.text",
      "A user with that email address already exists. Please try logging in instead."
    );
  });

  it("Should not allow submission of an empty form", () => {
    cy.get("#signup").click();
    cy.get("#nav-login").should("be.visible");

    cy.get("#name").type("Bob Test");
    cy.get("#signup").click();
    cy.get("#nav-login").should("be.visible");

    cy.get("#email").type("bobtest@email.com");
    cy.get("#signup").click();
    cy.get("#nav-login").should("be.visible");

    cy.get("#password").type("Red123456!!!");
    cy.get("#signup").click();
    cy.get("#nav-login").should("be.visible");
  });

  it("Should not allow an invalid email", () => {
    cy.get("#name").type("Bob Test");
    cy.get("#email").type("email.@example.com");
    cy.get("#password").type("Red123456!");
    cy.get("#confirm-password").type("Red123456!");
    cy.get("#signup").click();

    cy.get("#notification").should("have.text", "Email is invalid.");
  });

  it("Should not allow password to be less than 7 characters long", () => {
    cy.get("#name").type("Bob Test");
    cy.get("#email").type("bobtest2@email.com");
    cy.get("#password").type("Red1!");
    cy.get("#confirm-password").type("Red1!");
    cy.get("#signup").click();

    cy.get("#notification").should(
      "have.text",
      "Password must be a minimum of 7 characters."
    );
  });

  it("Should not allow password to contain the string 'password'", () => {
    cy.get("#name").type("Bob Test");
    cy.get("#email").type("bobtest2@email.com");
    cy.get("#password").type("Redpassword123!");
    cy.get("#confirm-password").type("Redpassword123!");
    cy.get("#signup").click();

    cy.get("#notification").should(
      "have.text",
      `Password can't contain the string "password".`
    );
  });

  it("Should not allow password to not contain at least 1 uppercase letter", () => {
    cy.get("#name").type("Bob Test");
    cy.get("#email").type("bobtest2@email.com");
    cy.get("#password").type("red123456!");
    cy.get("#confirm-password").type("red123456!");
    cy.get("#signup").click();

    cy.get("#notification").should(
      "have.text",
      `Password should contain at least 1 uppercase letter.`
    );
  });

  it("Should not allow password to not contain at least 1 lowercase letter", () => {
    cy.get("#name").type("Bob Test");
    cy.get("#email").type("bobtest2@email.com");
    cy.get("#password").type("RED123456!");
    cy.get("#confirm-password").type("RED123456!");
    cy.get("#signup").click();

    cy.get("#notification").should(
      "have.text",
      `Password should contain at least 1 lowercase letter.`
    );
  });

  it("Should not allow password to not contain at least 1 number", () => {
    cy.get("#name").type("Bob Test");
    cy.get("#email").type("bobtest2@email.com");
    cy.get("#password").type("RedRedRed!");
    cy.get("#confirm-password").type("RedRedRed!");
    cy.get("#signup").click();

    cy.get("#notification").should(
      "have.text",
      "Password should contain at least 1 number."
    );
  });

  it("Should not allow password to not contain at least 1 special character", () => {
    cy.get("#name").type("Bob Test");
    cy.get("#email").type("bobtest2@email.com");
    cy.get("#password").type("Red123456");
    cy.get("#confirm-password").type("Red123456");
    cy.get("#signup").click();

    cy.get("#notification").should(
      "have.text",
      "Password should contain at least 1 special character."
    );
  });

  it("Should not allow submission of form when 'confirmPassword' and 'password' do not match", () => {
    cy.get("#name").type("Bob Test");
    cy.get("#email").type("bobtest2@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#confirm-password").type("Blue123456!!!");
    cy.get("#signup").click();

    cy.get("#notification").should("have.text", "Passwords do not match.");
  });
});
