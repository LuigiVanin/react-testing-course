describe("template spec", () => {
  it("When click on login it should go to the dashboard page", () => {
    cy.visit("/");

    cy.intercept("GET", "http://localhost:3000/pokemon", {
      fixture: "pokemons.json",
    });

    cy.contains(/Login/i).click();
    cy.contains(/Dashboard/i);
  });

  it("When click on login it should go to the dashboard page", () => {
    cy.visit("/");

    cy.intercept("GET", "http://localhost:3000/pokemon", {
      fixture: "pokemons.json",
    });

    cy.contains("Login").click();
    cy.contains("Dashboard");

    cy.contains(/Pikachu/i);
  });

  it("When click on signup link it should go to the Signup page", () => {
    cy.visit("/");

    cy.get('[data-testid="signup-redirect"]').click();

    cy.contains(/Sign Up/i);
    cy.url().should("match", /\/signup$/);
  });
});
