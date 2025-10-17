describe("Happy flow – riktig API", () => {
    it("söker och visar träffar", () => {
      cy.visit("/");
  
      cy.get('[data-cy="search-input"]').type("avatar");
      cy.get('[data-cy="search-btn"]').click();
  
      cy.get('[data-cy="result-list"]').children().should("have.length.greaterThan", 0);
      cy.contains(/avatar/i).should("exist");
    });
  });
  