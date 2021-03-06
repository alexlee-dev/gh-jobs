/// <reference types="cypress" />

context("Profile", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("#nav-login").click();
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();

    cy.get("#nav-login").should("not.exist");
    cy.get("#nav-profile").should("be.visible");
    cy.get("#search").should("be.visible");
    cy.get("#nav-profile").click();
  });

  it("Should display 'Profile' page", () => {
    cy.get("h2").should("have.text", "Hello, Bob");
    cy.get("#name").should("have.value", "Bob Test");
    cy.get("#email").should("have.value", "bobtest@email.com");
  });

  it("Should be able to edit the user profile", () => {
    cy.get("#edit-profile").click();
    cy.get("#name").clear();
    cy.get("#name").type("Cool Name");
    cy.get("#email").clear();
    cy.get("#email").type("bobtest2@email.com");
    cy.get("#edit-confirm").click();

    cy.get("h2").should("have.text", "Hello, Cool");
    cy.get("#notification").should(
      "have.text",
      "Profile information updated successfully."
    );

    // * Reset to normal data (Cleanup)
    cy.get("#edit-profile").click();
    cy.get("#name").clear();
    cy.get("#name").type("Bob Test");
    cy.get("#email").clear();
    cy.get("#email").type("bobtest@email.com");
    cy.get("#edit-confirm").click();
    cy.get("h2").should("have.text", "Hello, Bob");
    cy.get("#name").should("have.value", "Bob Test");
    cy.get("#email").should("have.value", "bobtest@email.com");
  });

  it("Should be able to cancel editing the user profile", () => {
    cy.get("#edit-profile").click();
    cy.get("#name").clear();
    cy.get("#name").type("Cool Name");
    cy.get("#email").clear();
    cy.get("#email").type("bobtest2@email.com");

    // * Cancel
    cy.get("#edit-cancel").click();

    cy.get("h2").should("have.text", "Hello, Bob");
    cy.get("#notification").should("not.be.visible");
    cy.get("#name").should("have.value", "Bob Test");
    cy.get("#email").should("have.value", "bobtest@email.com");
  });

  it("Should not allow to submit edit profile form if information is not changed", () => {
    cy.get("#edit-profile").click();
    cy.get("#edit-confirm").should("be.disabled");
  });

  it("Should not allow to submit edit profile form if information is blank", () => {
    cy.get("#edit-profile").click();
    cy.get("#name").clear();
    cy.get("#email").clear();
    cy.get("#edit-confirm").should("be.disabled");
  });

  it("Should be able to reset the password", () => {
    cy.get("#settings").click();
    cy.get("#reset-password").click();
    cy.get("#modal-title").should("have.text", "Reset Password");
    cy.get("#current-password").type("Red123456!!!");
    cy.get("#new-password").type("Blue123456!!!");
    cy.get("#confirm-new-password").type("Blue123456!!!");
    cy.get("#reset").click();

    cy.get("h2").should("have.text", "Hello, Bob");
    cy.get("#notification").should("have.text", "Password reset successfully.");

    // * Reset to normal data (Cleanup)
    cy.get("#settings").click();
    cy.get("#reset-password").click();
    cy.get("#modal-title").should("have.text", "Reset Password");
    cy.get("#current-password").type("Blue123456!!!");
    cy.get("#new-password").type("Red123456!!!");
    cy.get("#confirm-new-password").type("Red123456!!!");
    cy.get("#reset").click();
    cy.get("h2").should("have.text", "Hello, Bob");
    cy.get("#notification").should("have.text", "Password reset successfully.");
  });

  it("Should not allow to submit reset password form if information is not changed", () => {
    cy.get("#settings").click();
    cy.get("#reset-password").click();
    cy.get("#modal-title").should("have.text", "Reset Password");
    cy.get("#reset").should("be.disabled");
  });

  it("Should not allow to submit reset password form if information is blank", () => {
    cy.get("#settings").click();
    cy.get("#reset-password").click();
    cy.get("#modal-title").should("have.text", "Reset Password");
    cy.get("#current-password").clear();
    cy.get("#new-password").clear();
    cy.get("#confirm-new-password").clear();
    cy.get("#reset").should("be.disabled");
  });

  it("Should not be able to reset password when using invalid credentials", () => {
    cy.get("#settings").click();
    cy.get("#reset-password").click();
    cy.get("#modal-title").should("have.text", "Reset Password");
    cy.get("#current-password").type("Blue123456!!!");
    cy.get("#new-password").type("Red123456!!!");
    cy.get("#confirm-new-password").type("Red123456!!!");
    cy.get("#reset").click();

    cy.get("#modal-title").should("have.text", "Reset Password");
    cy.get("#notification").should("have.text", "Invalid credentials.");
  });

  it("Should not be able to reset password if passwords do not match", () => {
    cy.get("#settings").click();
    cy.get("#reset-password").click();
    cy.get("#modal-title").should("have.text", "Reset Password");
    cy.get("#current-password").type("Red123456!!!");
    cy.get("#new-password").type("Blue123456!!!");
    cy.get("#confirm-new-password").type("Yellow123456!!!");
    cy.get("#reset").click();

    cy.get("#modal-title").should("have.text", "Reset Password");
    cy.get("#notification").should("have.text", "Passwords do not match.");
  });

  it("Should be able to log out on this device", () => {
    cy.get("#settings").click();
    cy.get("#log-out").click();
    cy.get("#nav-login").should("exist");
    cy.get("#search").should("be.visible");
  });

  it("Should be able to log out on all devices", () => {
    cy.get("#settings").click();
    cy.get("#log-out-all").click();
    cy.get("#nav-login").should("exist");
    cy.get("#search").should("be.visible");
  });

  it("Should be able to delete a user profile", () => {
    cy.get("#settings").click();
    cy.get("#log-out").click();
    cy.get("#nav-login").should("exist");
    cy.get("#search").should("be.visible");
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
    cy.get("#create-an-account").click();
    cy.get("h1").should("have.text", "Create Account");
    cy.get("#nav-login").should("be.visible");
    cy.get("#name").type("Delete Test");
    cy.get("#email").type("deletetest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#confirm-password").type("Red123456!!!");
    cy.get("#signup").click();
    cy.get("#nav-login").should("not.exist");
    cy.get("#search").should("be.visible");
    cy.get("#nav-profile").click();
    cy.get("h2").should("have.text", "Hello, Delete");

    cy.get("#settings").click();
    cy.get("#delete-profile").click();
    cy.get("#modal-title").should("have.text", "Delete Profile");
    cy.get("#notification").should(
      "have.text",
      "Are you sure you would like to delete your profile? This can not be reversed."
    );
    cy.get("#delete-profile-confirm").click();
    cy.get("#nav-login").should("exist");
    cy.get("#search").should("be.visible");
  });

  it("Should be able to cancel deleting a user profile", () => {
    cy.get("#settings").click();
    cy.get("#log-out").click();
    cy.get("#nav-login").should("exist");
    cy.get("#search").should("be.visible");
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
    cy.get("#create-an-account").click();
    cy.get("h1").should("have.text", "Create Account");
    cy.get("#nav-login").should("be.visible");
    cy.get("#name").type("Delete Test");
    cy.get("#email").type("deletetest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#confirm-password").type("Red123456!!!");
    cy.get("#signup").click();
    cy.get("#nav-login").should("not.exist");
    cy.get("#search").should("be.visible");
    cy.get("#nav-profile").click();
    cy.get("h2").should("have.text", "Hello, Delete");

    cy.get("#settings").click();
    cy.get("#delete-profile").click();
    cy.get("#modal-title").should("have.text", "Delete Profile");
    cy.get("#notification").should(
      "have.text",
      "Are you sure you would like to delete your profile? This can not be reversed."
    );
    cy.get("#delete-cancel").click();
    cy.get("#modal-title").should("have.text", "Settings");
    cy.get("#modal-close").click();
    cy.get("h2").should("have.text", "Hello, Delete");
    cy.get("#name").should("have.value", "Delete Test");
    cy.get("#email").should("have.value", "deletetest@email.com");

    // * Cleanup
    cy.get("#settings").click();
    cy.get("#delete-profile").click();
    cy.get("#modal-title").should("have.text", "Delete Profile");
    cy.get("#notification").should(
      "have.text",
      "Are you sure you would like to delete your profile? This can not be reversed."
    );
    cy.get("#delete-profile-confirm").click();
    cy.get("#nav-login").should("exist");
    cy.get("#search").should("be.visible");
  });

  it("Should display initials of name in avatar", () => {
    cy.get("#avatar-initials").should("have.text", "BT");
  });
});
