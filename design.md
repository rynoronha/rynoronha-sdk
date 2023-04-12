# The One SDK Design

The One SDK is a library that provides an interface for accessing data from the The One API.

## API Endpoint

The One SDK uses the Lord of the Rings API endpoint provided by The One API at https://the-one-api.dev/v2.

## Authorization

The One SDK requires an access token. The access token is passed as an argument to the constructor when creating an instance of the SDK.

## Exposed Method

The SDK exposes a single method:

    getMovieDetails(param: string, isId: boolean = true): Promise<MovieDetails>

This method returns the details of a movie specified by either its ID or name. If `isId` is `true`, the param is assumed to be the movie ID. If `isId ` is `false`, param is assumed to be the movie name.

If the movie is found, the method returns a MovieDetails object that contains the following properties:

- **id (string)**: The ID of the movie
- **name (string)**: The name of the movie
- **runtimeInMinutes (number)**: The runtime of the movie in minutes
- **budgetInMillions (number)**: The budget of the movie in millions of dollars
- **boxOfficeRevenueInMillions (number)**: The box office revenue of the movie in millions of dollars
- **academyAwardNominations (number)**: The number of Academy Award nominations - received by the movie
- **academyAwardWins (number)**: The number of Academy Awards won by the movie
- **quotes (Array<string>)**: An array of quotes from the movie

If the movie is not found, the method throws an error with the message:
`"Movie '<movie name>' not found".`

## Private Method

The SDK has a private method:

    makeApiRequest(endpoint: string, params: Object = {}): Promise<any>

This method makes an **HTTP GET** request to the API endpoint and returns the data from the response. It takes two arguments:

- **endpoint (string)**: The API endpoint to request
- **params (Object)**: Optional query parameters to include in the request
  This method is not exposed and is used internally by the getMovieDetails method to make requests to the API.

This method is the backbone of the SDK. It can be used as a base should other API endpoints be used in the future.
