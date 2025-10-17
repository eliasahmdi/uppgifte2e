describe("Sök – mockad OMDb", () => {
    it("visar exakt 3 mockade träffar", () => {
      cy.intercept("GET", "**/omdbapi**", { fixture: "omdb-success.json" }).as("omdb");
  
      cy.visit("/");
      cy.get('[data-cy="search-input"]').type("a");
      cy.get('[data-cy="search-btn"]').click();
  
      cy.wait("@omdb");
  
      cy.get('[data-cy="result-list"]').children().should("have.length", 3);
      cy.contains("Avengers: Endgame").should("exist");
      cy.contains("A Beautiful Mind").should("exist");
      cy.contains("Avatar").should("exist");
    });
  });
  