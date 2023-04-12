import TheOneSDK from "../the-one-sdk.mjs";

const accessToken = "beqp3AFdNmAAR7ZGLVEp";

describe("OneApi", () => {
  let theOne;

  beforeAll(() => {
    theOne = new TheOneSDK(accessToken);
  });

  describe("getMovieDetails", () => {
    afterEach(() => {
      // Add a 1-second delay between each test to get around status 429 response;
      return new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it("should get movie details by ID", async () => {
      const movieId = "5cd95395de30eff6ebccde5c"; // The Fellowship of the Ring
      const movieDetails = await theOne.getMovieDetails(movieId);

      expect(movieDetails.id).toBe(movieId);
      expect(movieDetails.name).toBe("The Fellowship of the Ring");
      expect(movieDetails.runtimeInMinutes).toBe(178);
      expect(movieDetails.budgetInMillions).toBe(93);
      expect(movieDetails.boxOfficeRevenueInMillions).toBe(871.5);
      expect(movieDetails.academyAwardNominations).toBe(13);
      expect(movieDetails.academyAwardWins).toBe(4);
      expect(movieDetails.quotes).toContain("Sauron. Lord of the Earth.");
    });

    it("should get movie details by name", async () => {
      const movieName = "The Return of the King";
      const movieDetails = await theOne.getMovieDetails(movieName, false);

      expect(movieDetails.name.toLowerCase()).toBe(movieName.toLowerCase());
      expect(movieDetails.runtimeInMinutes).toBe(201);
      expect(movieDetails.budgetInMillions).toBe(94);
      expect(movieDetails.boxOfficeRevenueInMillions).toBe(1120);
      expect(movieDetails.academyAwardNominations).toBe(11);
      expect(movieDetails.academyAwardWins).toBe(11);
      expect(movieDetails.quotes).toContain("Give us that! Deagol my love");
    });

    it("should throw an error if movie by name is not found", async () => {
      const movieName = "fake movie";

      await expect(theOne.getMovieDetails(movieName, false)).rejects.toThrow(
        `Movie '${movieName}' not found`
      );
    });

    it("should throw an error if invalid paramType is passed", async () => {
      const param = "invalid param";
      const isId = "invalid value";

      await expect(theOne.getMovieDetails(param, isId)).rejects.toThrow(
        `Request failed with status code 500`
      );
    });
  });
});
