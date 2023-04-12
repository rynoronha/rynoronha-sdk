# The One SDK

The One SDK is a JavaScript client SDK that provides a simple way to access the The One API service. It allows the user to retrieve movie details for any of the Lord of the Rings movies.

## Installation

To install the SDK, you can use NPM or Yarn:

```sh
npm install the-one-api-sdk
```

```sh
yarn add the-one-api-sdk
```

## Usage

To use the SDK, you need to create an instance of the TheOneSDK class and provide your access token:

```js
import TheOneSDK from "the-one-api-sdk";

const sdk = new TheOneSDK("your_access_token");
```

### getMovieDetails()

You can use the `getMovieDetails` method to retrieve details for a movie:

```js
const movieDetails = await sdk.getMovieDetails(
  "The Fellowship of the Ring",
  false
);

console.log(movieDetails);
```

Please note if a name is provided, the name is case sensitive ("the fellowship of the ring" or "The Fellowship Of The Ring" won't return a result).

The method accepts two parameters:

- **param (string)** : The name or ID of the movie to retrieve. If you pass the name of the movie, the SDK will first search for the movie by name and then retrieve its details. If you pass the ID of the movie, the SDK will directly retrieve its details.
- **isId (boolean)**: A boolean value that indicates whether the param value is the ID or the name of the movie. The default value is `true`.

The `getMovieDetails` method returns an object with the following properties:

- **id (string)**: The ID of the movie
- **name (string)**: The name of the movie
- **runtimeInMinutes (number)**: The runtime of the movie in minutes
- **budgetInMillions (number)**: The budget of the movie in millions of dollars
- **boxOfficeRevenueInMillions (number)**: The box office revenue of the movie in millions of dollars
- **academyAwardNominations (number)**: The number of Academy Award nominations - received by the movie
- **academyAwardWins (number)**: The number of Academy Awards won by the movie
- **quotes (Array<string>)**: An array of quotes from the movie

## Example

Here's an example of how to use the SDK to retrieve details for a movie:

```js
import TheOneSDK from "the-one-api-sdk";

const sdk = new TheOneSDK("your_access_token");

(async () => {
  try {
    const movieDetails = await sdk.getMovieDetails("The Two Towers");

    console.log(movieDetails);
  } catch (error) {
    console.error(error);
  }
})();
```

## Testing

To test the SDK, you can run the following command:

```sh
npm test
```

This will run the test suite using Jest. The tests are located in the `___tests___` directory.

## License

This SDK is released under the MIT License.
