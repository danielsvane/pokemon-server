# Pokemon GraphQL endpoint

## Setup
Make sure MongoDB is installed and running, and a database named "graphql" is created. Import the data from the .csv file using:
```
mongoimport --db graphql --collection pokemons --type csv --headerline --file pokemon.csv
```
Then run the server using:
```
npm install
npm start
```
