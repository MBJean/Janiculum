# The Latin Toolkit

> A playground for building tooling to aid students learning the Latin language. Repo Based originally off of https://github.com/HugoDF/express-postgres-starter. At present, this application exposes via GraphQL a search functionality that allows users to search Lewis & Short's Latin Dictionary and return xml of dictionary entries.

## Setup

Pre-requisites:

- Docker for Desktop

Run `docker-compose up` in the root of the project.

It will bring up Postgres and the Express application server in development mode.

You can connect to Postgres using the psql client:

```sh
psql postgres://user:pass@localhost:5432/db
```

The default Docker `CMD` is `npm start`, [./docker-compose.yaml](./docker-compose.yaml) overrides this to `npm run dev` which runs the application using nodemon (auto-restart on file change).


## Express GraphQL setup

Global concerns like security, cookie parsing, body parsing and request logging are handled in [./server.js](./server.js).

This application loosely follows the [Presentation Domain Data Layering](https://www.martinfowler.com/bliki/PresentationDomainDataLayering.html):

- Presentation is dealt with in the `./src/api` folder
- Domain is dealt with in the `./src/modules` folder. It's currently non-existent since we've only got generic user and session resources.
- Data is dealt with in the `./src/persistence` folder

Resources are exposed to the client via [GraphQL](https://developer.github.com/v4/). Experiment with building queries at `/graphql`.

## Database setup + management

`npm run migrate up` will run the migrations.

`npm run migrate down` will roll back the migrations.

`npm run migrate:create <migration-name>`  will create a new migration file in [./src/migrations](./src/migrations).

To run the migrations inside of docker-compose. Which will run a bash instance inside the `app` container.
```sh
docker-compose run app bash
```

Followed by:
```sh
npm run migrate up
```
