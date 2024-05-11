import { Pokemon } from "../../src/types/PokemonType";

describe("Testing dashboard page", () => {
  it("Should load three pokemons", () => {
    cy.intercept("GET", "http://localhost:3000/pokemon", {
      fixture: "pokemons.json",
    });

    cy.visit("/dashboard");

    cy.fixture("pokemons.json").then((data: Pokemon[]) => {
      data.forEach((pokemon) => {
        cy.get(`li[data-testid="pokemon-${pokemon.id}"]`).within(() => {
          cy.get("h1").should("contain.text", pokemon.name);
          cy.get("strong").should("contain.text", pokemon.type);
        });
      });
    });
  });

  it("When clicking in one pokemon it Should load pokemon detail page", () => {
    cy.intercept("GET", "http://localhost:3000/pokemon", {
      fixture: "pokemons.json",
    });

    cy.intercept("GET", "http://localhost:3000/pokemon/1", {
      fixture: "pokemon-detail.json",
    });

    cy.visit("/dashboard");

    cy.get('li[data-testid="pokemon-1"]').click();

    cy.url().should("match", /\/pokemon\/1$/);

    cy.contains(/Pikachu/i);
    cy.contains(/Electric/i);
  });

  it("When clicking in one pokemon it Should load pokemon detail page and should go back", () => {
    cy.intercept("GET", "http://localhost:3000/pokemon", {
      fixture: "pokemons.json",
    });

    cy.intercept("GET", "http://localhost:3000/pokemon/1", {
      fixture: "pokemon-detail.json",
    });

    cy.visit("/dashboard");

    cy.get('li[data-testid="pokemon-1"]').click();

    cy.url().should("match", /\/pokemon\/1$/);

    cy.contains(/Pikachu/i);
    cy.contains(/Electric/i);

    cy.contains("a", /Voltar/i)
      .should("be.visible")
      .click();

    cy.url()
      .should("not.match", /\/pokemon\/1$/)
      .should("match", /\/dashboard$/);
    cy.contains(/Dasboard/i);
  });
});
