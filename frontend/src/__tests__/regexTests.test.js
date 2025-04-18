describe("Regex Validation Tests", () => {
    // Tests pour le titre
    describe("Title field validation", () => {
      const titleRegex = /^[A-Z][a-zA-Z0-9 ]{0,29}$/;
  
      test("should pass for valid titles", () => {
        const validTitles = ["Hello world", "Test123", "A", "My Title 99"];
  
        validTitles.forEach((title) => {
          expect(title).toMatch(titleRegex);
        });
      });
  
      test("should fail for invalid titles", () => {
        const invalidTitles = [
          "hello world", // Ne débute pas par une majuscule
          "123Title", // Ne commence pas par une majuscule
          "", // Chaîne vide non autorisée
          "This title is definitely too long to pass", // 40 caractères (30 max)
          "Title@#$", // Caractères spéciaux non autorisés
        ];
  
        invalidTitles.forEach((title) => {
          expect(title).not.toMatch(titleRegex);
        });
      });
    });
  
    // Tests du paragraphe
    describe("Paragraph field validation", () => {
      const paragraphRegex = /^[A-Z][a-zA-Z0-9\s]{0,698}[.!?]$/;
  
      test("should pass for valid paragraphs", () => {
        const validParagraphs = [
          "This is a valid paragraph.",
          "Hello World!",
          "Test paragraph with numbers 123?",
          "A.",
        ];
  
        validParagraphs.forEach((paragraph) => {
          expect(paragraph).toMatch(paragraphRegex);
        });
      });
  
      test("should fail for invalid paragraphs", () => {
        const invalidParagraphs = [
          "lower case start.", // Ne commence pas par une majuscule
          "Hello world", // Pas de ponctuation
          "Hello world,", // Mauvaise ponctuation
          "A", // Pas de ponctuation
          "@Invalid start.", // Commence par un caractère spécial
        ];
  
        invalidParagraphs.forEach((paragraph) => {
          expect(paragraph).not.toMatch(paragraphRegex);
        });
      });
    });
  });
  