# Janiculum: Latin Learning Application

> A playground for exploring web technologies, structured around the goal of providing tooling for a user to learn the Latin language. Repo Based originally off of https://github.com/HugoDF/express-postgres-starter. At present, this application exposes via GraphQL a search functionality that allows users to search Lewis & Short's Latin Dictionary and return XML of dictionary entries.

## Setup

Pre-requisites:

### Docker for Desktop
Make sure that you have [Docker](https://www.docker.com/products/docker-desktop) installed on your computer. Docker is software that allows the developer to specify the exact dependencies required for an application or applications in a setup instance called an `image` and to serve that application in a self-contained running process called a `container`. These images and containers can they be deployed as-is into production hosting environments, meaning the exact running application you have in local development is what you'll get in production (aside from environment-specific variables).

Run `docker-compose up` in the terminal at the root of the project.

It will bring up Postgres, the Express application server, and the Nuxt application server in development mode. You should see in your terminal running servers indicated by:
`postgres_1  |`
`frontend_1  |`
`app_1       |`

You can connect to Postgres using the psql client:

```sh
psql postgres://user:pass@localhost:5432/db
```

The default Docker `CMD` is `npm start`, [./docker-compose.yaml](./docker-compose.yaml) overrides this to `npm run dev` which runs the application using nodemon (auto-restart on file change).

## Basic architecture

The backend of the application is managed through an [Express.js](https://expressjs.com/) server with some minimal opinionated architecture, for which see below. The user-facing portions of the application are built using the [Nuxt.js framework](https://nuxtjs.org/) in its [static rendering mode](https://nuxtjs.org/guide/commands#static-generated-deployment-pre-rendered-). The resulting build is then copied over to the `src/static` directory and served up by the Express server. A future iteration of this application should see the static assets deployed to a CDN independently.

Global concerns like security, cookie parsing, body parsing and request logging are handled in [./server.js](./server.js).

The backend of the application loosely follows the [Presentation Domain Data Layering](https://www.martinfowler.com/bliki/PresentationDomainDataLayering.html):

- Presentation is dealt with in the `./src/graphql` folder
- Domain is dealt with in the `./src/modules` folder. It's currently non-existent since we've only got generic user and session resources.
- Data is dealt with in the `./src/persistence` folder

Resources are exposed to the client via [GraphQL](https://developer.github.com/v4/). Experiment with building queries at `/graphql`.

The application is deployed to [Heroku](www.heroku.com) with [CI](https://codeship.com/continuous-integration-essentials) support from [CircleCI](www.circleci.com).

## Deployment
TBD

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

To seed the database, run:
```sh
docker-compose run app bash
```

and, in that bash shell, run:
```
node -e 'require("./src/seeds/dictionary.js").init("_a.xml")'
```

once for each letterset (i.e., replacing `_a.xml` with each letter as found in `src/lib/latin-dictionary`).

To migrate and seed the production, run `heroku run bash -a APP_NAME` followed by the above.
