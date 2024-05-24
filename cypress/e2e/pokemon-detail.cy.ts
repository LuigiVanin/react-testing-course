import { Pokemon } from "../../src/types/PokemonType";

describe("Testing signup page", () => {
  it("Should render a pokemon on the screen", () => {
    cy.fixture("pokemon-detail.json").then((data: Pokemon) => {
      cy.intercept("GET", `http://localhost:3000/pokemon/${data.id}`, {
        fixture: "pokemon-detail.json",
      });
      cy.visit(`/pokemon/${data.id}`);

      cy.contains(data.name);
      cy.contains(data.type);
      cy.get("img").should(
        "have.attr", //
        "src",
        data.image
      );

      cy.get("div")
        .find("div")
        .should(($div) => {
          expect($div).to.have.length(2);
        });
    });
  });

  it("Checking page divs", () => {
    cy.fixture("pokemon-detail.json").then((data: Pokemon) => {
      cy.intercept("GET", `http://localhost:3000/pokemon/${data.id}`, {
        fixture: "pokemon-detail.json",
      });
      cy.visit(`/pokemon/${data.id}`);

      cy.get("div")
        .find("div")
        .should(($div) => {
          expect($div).to.have.length(2);

          const className = $div[0]!.className;
          expect(className).to.match(/container/i);
        })
        .then(($div) => {
          expect($div).to.have.css("display", "flex");
        });
    });
  });
});
