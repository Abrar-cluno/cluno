Offers microservice
=========

Micoreservice to get avaliable offers. This microservice exposes REST APIs to retrieve list of offers and individual detailed offers. 

Table of contents
=================

<!--ts-->
   * [Requirements](#requirements)
   * [Setup](#setup)
      * [Start service as a container](#start-service-as-a-container)
      * [Start service directly on host](#start-service-directly-on-host)
   * [Service Endpoints](#service-endpoints)
      * [Detailed offer information](#detailed-offer-information)
      * [List of available offers](#list-of-available-offers)
   * [Tests](#tests)
   * [Dependency](#dependency)
   * [Project structure](#project-structure)
<!--te-->

Requirements
============
As a web developer I want to request a (filtered) list of offers and for each offer some more detailed information so that I can process/display this information in the Web or App.

Setup
=====

Offers microservice can be started as a docker-container service or directly on host-machine. Service runs at `http://localhost:8080`.

Start service as a container
----------------------------
1. Clone the [repository](https://github.com/AbrarOnGithub/cluno.git) `git clone https://github.com/AbrarOnGithub/cluno.git`
2. Run `docker-compose up -d`  

Start service directly on host
------------------------------

### dependecies
- Node
- NPM

### spinup service
- `npm ci` install dependencies.
- `npm start` will start the application instance (default PORT: 8080, can override using PORT environment variable)

Service Endpoints
=================

Detailed offer information
--------------------------

Provides detailed offer information.

**URL** : `/api/v1/offer/:id/`

**URL Parameters** : `id=[number]` where `id` is the id of offer.

**Method** : `GET`

#### Success Response

**Condition** : If offer exists.

**Code** : `200 OK`

**Content**
```
complete offer information except teaser and detailUrl
```

#### Error Responses

**Condition** : If offer does not exist with the given `id`

**Code** : `200 OK`

**Content** :

```json
{}
```

### Example request
```sh
curl --request GET \
  --url http://localhost:8080/api/v1/offer/136 \
  --header 'content-type: application/json'
```

List of available offers
------------------------
Provides filtered list of available offers  

**URL** : `/api/v1/offer?price[gte]=<number>&price[lte]=<number>&portfolio=<alpha-numeric>&limit=<number>&make=<string>`

**Method** : `GET`

**Optional URL Parameters** :
  - make (brand of car within offer e.g. make=BMW)
  - price (price of offer. price can be provided with gte and lte operators e.g. price[gte]=10&price[lte]=1000)
  - portfolio - (portfolio of offer. Only one portfolio can be provided, default portfolio is 001 e.g. portfolio=0002)

#### Success Response

**Condition** : If offers exist.

**Code** : `200 OK`

**Content**
```json
{
    "offers_count": "<total offers in response>",
    "offers": "<list of filtered offers>"
}
```

### Example request
```sh
curl --request GET \
  --url 'http://localhost:8080/api/v1/offer?price\[gte\]=10&price\[lte\]=1000&portfolio=0001&limit=10&make=BMW' \
  --header 'content-type: application/json'
```
### Response
```json
{
    "offers_count": "<total offers in response>",
    "offers": "<list of filtered offers>"
}
```

### Example request with invalid make parameter
```ssh
curl --request GET \
  --url http://localhost:8080/api/v1/offer?price\[gte\]=10&price\[lte\]=1000&portfolio=0001&limit=10&make=*** \
  --header 'content-type: application/json' \
```

### Response
```json
{"errors":
    [
        {"make":"make must be a alph-numeric"}
    ]
}
```

Tests
=====  

Tests are written using [jest](https://jestjs.io/) testing framework.

Run `npm run coverage` to run the test suites with coverage.

```
 PASS  src/__tests__/offerControllerr.test.js
 PASS  src/__tests__/FileBasedOffersDB.test.js
 PASS  src/__tests__/DAOFactory.test.js
 PASS  src/__tests__/offer-route.test.js
-------------------------------|----------|----------|----------|----------|-------------------|
File                           |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-------------------------------|----------|----------|----------|----------|-------------------|
All files                      |    76.97 |    47.46 |     72.5 |    76.67 |                   |
 src                           |      100 |      100 |      100 |      100 |                   |
  app.js                       |      100 |      100 |      100 |      100 |                   |
 src/__tests__/__fixtures__    |      100 |      100 |      100 |      100 |                   |
  offers.js                    |      100 |      100 |      100 |      100 |                   |
 src/api/controllers           |    73.91 |      100 |    66.67 |    73.91 |                   |
  errors-handler-controller.js |       75 |      100 |        0 |       75 |                11 |
  offerrs-controller.js        |    73.68 |      100 |       80 |    73.68 |    33,45,46,48,50 |
 src/api/middlewares           |    90.91 |       50 |      100 |       90 |                   |
  index.js                     |    90.91 |       50 |      100 |       90 |                11 |
 src/api/routes/v1             |      100 |      100 |      100 |      100 |                   |
  index.js                     |      100 |      100 |      100 |      100 |                   |
  offer-route.js               |      100 |      100 |      100 |      100 |                   |
 src/api/validations           |    54.55 |    16.67 |      100 |    54.55 |                   |
  offers-params-validation.js  |    54.55 |    16.67 |      100 |    54.55 |    22,26,29,30,33 |
 src/config                    |      100 |    83.33 |      100 |      100 |                   |
  environment-configs.js       |      100 |    83.33 |      100 |      100 |                14 |
 src/data-access               |    68.97 |    55.17 |    70.83 |    68.42 |                   |
  dao-factory.js               |      100 |      100 |      100 |      100 |                   |
  fs-offers-dao.js             |    64.71 |       50 |    69.57 |       64 |... 23,124,125,127 |
 src/data-access/repositories  |    66.67 |        0 |    66.67 |    66.67 |                   |
  offer-repo.js                |    66.67 |        0 |    66.67 |    66.67 |          34,35,39 |
 src/services/offer            |    81.82 |    33.33 |    66.67 |    81.82 |                   |
  index.js                     |      100 |      100 |      100 |      100 |                   |
  offer-service.js             |    71.43 |    33.33 |    66.67 |    71.43 |             54,55 |
-------------------------------|----------|----------|----------|----------|-------------------|

Test Suites: 4 passed, 4 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        1.809s
```

Project structure
=================
```
.
├── .dockerignore
├── .eslintrc.json
├── .git
├── .gitignore
├── .prettierrc
├── .vscode
├── Dockerfile
├── README.md
├── coverage
├── docker-compose.yml
├── index.js
├── package-lock.json
├── package.json
└── src
```
  - **src** contains all application source code
  - **.eslintrc.json** Eslint lint configuration file for coding standards, uses Airbnb coding style
  - **.prettierrc** configurations for coding styles
  - **package.json** contains dependencies
  - **package-lock.json** locks dependencies to certain version
  - **node_modules** dependencies

  src
  ---
  src contains all the source code of application. It includes the following directories
  ```./src
├── __tests__
│   ├── DAOFactory.test.js
│   ├── FileBasedOffersDB.test.js
│   ├── __fixtures__
│   ├── offer-route.test.js
│   └── offerControllerr.test.js
├── api
│   ├── controllers
│   ├── middlewares
│   ├── routes
│   └── validations
├── app.js
├── config
│   └── environment-configs.js
├── data-access
│   ├── dao-factory.js
│   ├── fs-offers-dao.js
│   └── repositories
├── services
│   └── offer
└── utils
    └── logger.js
```
api
---
app directory contains all the behaviour to handle user interaction. It includes following further directories.  
  -  **contronllers** responsible for handling user actions, don't contain any business logic
  - **middleware** add query parameter validation rules. Validates query parameters before forwarding the request to controller
  - **routes** mounts the controller to service endpoints
  - **validations** contains validation rules for query parameters per controller action

data-access
-----------
This layer is respinsible for providing data. It contains `Data Access Objects` that are responsible for data-source interaction, they provide clean APIs for running queries on underlying data-source.

Repositories
------------
Repositories provides domain level entities populated with data using DAOs.

Services
--------
Services is a thin layer that allows us to add bussiness logic, they behave like `facades` by forwarding calls to underlying Repositories and provides clean APIs for use-cases.

configs
-------
provides environment specific configurations.

utils
-----
contains reusable code for other layers e.g. logger
