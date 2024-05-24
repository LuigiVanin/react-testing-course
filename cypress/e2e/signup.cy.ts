describe("Testing signup page", () => {
  it("When clicking on already have a account should go to login screen", () => {
    cy.visit("/signup");

    cy.get('a[data-testid="signin-redirect"]').click();

    cy.url().should("match", /\/$/);
    cy.contains(/Sign in/i);
  });

  it("Should be able to type on inputs of the signup page", () => {
    cy.intercept("GET", "http://localhost:3000/pokemon", {
      fixture: "pokemons.json",
    });
    cy.visit("/signup");

    cy.get('form input[data-testid="name"]').type("Luis Felipe Vanin");
    cy.get('form input[data-testid="email"]').type("email@gmail.com");
    cy.get('form input[data-testid="password"]').type("senha123");

    cy.get('button[data-testid="signup-button"]')
      .contains(/Sign up/i)
      .click();

    cy.url().should("match", /\/dashboard$/);
    cy.contains(/Dashboard/i);
  });
});
