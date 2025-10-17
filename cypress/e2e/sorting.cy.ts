describe("Sortering av resultat", () => {
    beforeEach(() => {
      cy.intercept("GET", "**/omdbapi**", { fixture: "omdb-success.json" }).as("omdb");
      cy.visit("/");
      cy.get('[data-cy="search-input"]').type("a");
      cy.get('[data-cy="search-btn"]').click();
      cy.wait("@omdb");
    });
  
    const titlesInOrder = () =>
      cy.get('[data-cy="result-list"] [data-cy="movie-title"]').then($els =>
        [...$els].map(el => el.textContent?.trim())
      );
  
    it("Titel A–Ö", () => {
      cy.get('[data-cy="sort-select"]').select("title-asc");
      titlesInOrder().should("deep.equal", [
        "A Beautiful Mind",
        "Avatar",
        "Avengers: Endgame"
      ]);
    });
  
    it("Titel Ö–A", () => {
      cy.get('[data-cy="sort-select"]').select("title-desc");
      titlesInOrder().should("deep.equal", [
        "Avengers: Endgame",
        "Avatar",
        "A Beautiful Mind"
      ]);
    });
  
    it("Betyg högst först", () => {
      cy.get('[data-cy="sort-select"]').select("rating-desc");
      titlesInOrder().should("deep.equal", [
        "Avengers: Endgame",
        "A Beautiful Mind",
        "Avatar"
      ]);
    });
  });
  