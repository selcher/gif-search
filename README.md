# gif-search

A javascript module for searching gif images

## Getting Started

```
import gifSearch from 'gif-search';

// Set your Giphy API Key
gifSearch.setAPIKey('api-key');

// Search for a gif
gifSearch.query('cat').then(
    gifUrl => console.log(gifUrl)
);

// Search for a random gif
gifSearch.random('cat').then(
    gifUrl => console.log(gifUrl)
);
```

### Installing

```
npm install gif-search
```

### Running the tests

```
npm test
```

## Built With

* [Gipy API](https://api.giphy.com/)
* [Request](https://github.com/request/request) - make http calls
* [TypeScript](https://www.typescriptlang.org/)

## Contributing

Please read [CONTRIBUTING.md](https://github.com/selcher/gif-search/blob/master/CONTRIBUTING.md) for details on contributing to the repository.

## Development

Clone the repository in an empty directory.

Commit changes then create a pull request.

## Versioning

The project uses [Semver](http://semver.org) for versioning. To check the released versions, see the [tags on this repository](https://github.com/selcher/gif-search/releases).

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/selcher/gif-search/blob/master/LICENSE) file for details.
