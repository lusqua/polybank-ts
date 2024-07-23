# Graphql Typescript

This is a simple project to implement a transaction ledger using GraphQL and Typescript.

## How to run

> This project needs a running instance of MongoDB to work.

1. Clone the repository
2. Run `npm install`
3. Run `npm start`
4. Open `http://localhost:4000/playground` in your browser and start running queries in the playground.

### With docker

1. Clone the repository
2. Run `docker build -t graphql-ts .`
3. Run `docker run -p 4000:4000 graphql-ts -e MONGO_URL=<MONGO_URL>`

### With docker compose

1. Clone the repository
2. Run docker-compose up
