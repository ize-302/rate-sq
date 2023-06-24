# <center>OST-API

# <center> [![codecov](https://codecov.io/gh/ize-302/ost-api/branch/master/graph/badge.svg?token=BQ116RI0Q2)](https://codecov.io/gh/ize-302/ost-api)

## Introduction

This is an open-source project for storing OSTs (Original Soundtracks) of movies, tv shows, games etc and their respective ratings.

## Getting started

This project was built using nodejs and fastify. Data are kept in the [titles.json](db/titles.json) and [composers.json](db/composers.json) files

## Prerequisites

[Node.js](https://nodejs.org/)

### Running this project locally

- Clone the project to your computer.
- Install dependencies with  
  `$ yarn install`

- serve locally with the below command
  `$ yarn dev`

## API Routes

```
| Description                         | Request                          | query strings         |
|-------------------------------------|:--------------------------------:|----------------------:|
| Fetch all titles                    | /api/v1/titles                   | q, per_page, page     |
| Fetch a title                       | /api/v1/titles/:slug             | -                     |
| Fetch all composers                 | /api/v1/composers                | q, per_page, page     |
| Fetch a composer                    | /api/v1/composers/:slug          | -                     |
| Fetch titles by composer            | /api/v1/composers/:slug/titles   | -                     |
```

## Contributing

To learn more about contributing to OST API, please read [contributing.md](contributing.md)

## Maintainer

[Adavize Hassan](https://linked.com/in/adavize-hassan)
