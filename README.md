# Patient Data

This document describes the technology stack, architecture, known issues, and assumptions made for this project.

## Technology Stack

- Cloud hosting from Digital Ocean.
- Docker and Docker Compose for multi container orchestration.
- MongoDB as the data store.
- [Loopback](https://loopback.io/)
- Frontend
    - React
    - Redux
    - [Redux Promise Middleware](https://github.com/pburtchaell/redux-promise-middleware)
    - [Material UI](https://material-ui-next.com/)

## Data Model
The data model is denormalized, which means there is only one collection which represents all the columns of the data. Although, denormalized model comes with issues like redundant data, it serves us perfectly because we only implement READ
operations.

## Docker 
The implementation uses `Docker` to orchestrate a multi container architecture.
Each of the layers eg. frontend, api, database are housed in self contained and isolated container and communicate with each other through internal docker network. We also use a disposable docker container `mongo-seed` whose sole purpose is to seed initial data to mongodb and then exit. `Docker Compose` is used to spin up all of the containers.

## NoSQL vs SQL
We chose NoSQL/MongoDB because

    - Our data model is denormalized.
    - It playes nicely with NodeJS ecosystem.

## Loopback
Loopback reduced lot of the boilerplate code needed, and provided a strong foundataion, so that we can get started quickly.

## Prerequisite
- Docker
- Docker Compose

## Installation

- Clone the repository.
- Provide a `.csv` file in the `mongo-seed` directory for initial seed data.
- Create a `.env` file in the root directory with following keys
```
MONGO_USER=*Your MongoDB user name here*
MONGO_PASS=*Your MongoDB password here*
MONGODB_URL=mongodb://mongodb:27017/database
MONGO_HOST=mongodb:27017
MONGO_PORT=27017
MONGO_DB_NAME=database
MONGO_COLLECTION_NAME=Provider
SEED_FILE=*Seed file name*.csv
API_BASE_URL=http://*localhost or server ip*:3000/api/
```
- Run `docker-compose up --build`.

## To run tests
### API unit tests

- Navigate to `/api` directory.
- Run `npm test`.

### Frontend unit tests

- Navigate to `/frontend` directory.
- Run `npm test`.

## Known Issues
- The fontend build is not optimized for production.
- The api layer is not configured for production. Ideally, we should have SSL, Node working in multi cluster etc.

