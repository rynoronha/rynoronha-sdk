import axios from "axios";

const API_URL = "https://the-one-api.dev/v2";
const ENDPOINTS = {
  movie: "movie",
  quote: "quote",
};

function TheOneSDK(accessToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  async function makeApiRequest(endpoint, params = {}) {
    let queryString = "";

    if (Object.keys(params).length !== 0) {
      queryString =
        "?" +
        Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join("&");
    }

    const response = await axios.get(`${API_URL}/${endpoint}${queryString}`, {
      headers,
    });

    return response.data.docs;
  }

  async function getMovieDetails(param, isId = true) {
    let movieId = param;

    if (!isId) {
      const moviesResponse = await makeApiRequest(`${ENDPOINTS.movie}`, {
        name: param,
      });

      if (moviesResponse.length === 0) {
        throw new Error(`Movie '${param}' not found`);
      }

      const movie = moviesResponse[0];

      movieId = movie._id;
    }

    const [movieResponse, quotesResponse] = await Promise.all([
      makeApiRequest(`${ENDPOINTS.movie}/${movieId}`),
      makeApiRequest(`${ENDPOINTS.movie}/${movieId}/${ENDPOINTS.quote}`),
    ]);

    const movieDetails = {
      id: movieResponse[0]._id,
      name: movieResponse[0].name,
      runtimeInMinutes: movieResponse[0].runtimeInMinutes,
      budgetInMillions: movieResponse[0].budgetInMillions,
      boxOfficeRevenueInMillions: movieResponse[0].boxOfficeRevenueInMillions,
      academyAwardNominations: movieResponse[0].academyAwardNominations,
      academyAwardWins: movieResponse[0].academyAwardWins,
      quotes: quotesResponse.map((quote) => quote.dialog),
    };

    return movieDetails;
  }

  return {
    getMovieDetails,
  };
}

export default TheOneSDK;
