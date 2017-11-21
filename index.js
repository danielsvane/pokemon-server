import express from 'express'
import graphqlHTTP from 'express-graphql'
import {MongoClient, ObjectID} from 'mongodb'
import {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList} from 'graphql'
import PokemonType from './graphql/PokemonType'
import cors from 'cors'

var app = express();
var db;

// Please dear god move these to seperate files
const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    allPokemons: {
      type: new GraphQLList(PokemonType),
      resolve: async () => {
        // Should resolve the specific fields requested, so Mongo doesn't waste resources providing them
        return (await db.collection('pokemons').find().sort({number: 1}).toArray());
      }
    },
    searchPokemons: {
      type: new GraphQLList(PokemonType),
      args: {
        text: {
          name: 'text',
          type: GraphQLString
        }
      },
      resolve: async (root, params) => {
        // Should resolve the specific fields requested, so Mongo doesn't waste resources providing them
        return (await db.collection('pokemons').find({
          name: {
            $regex: new RegExp(params.text, "i")
          }
        }).sort({number: 1}).toArray());
      }
    },
    pokemonByID: {
      type: PokemonType,
      args: {
        id: {
          name: "id",
          type: GraphQLID
        }
      },
      resolve: async (root, params) => {
        // Should resolve the specific fields requested, so Mongo doesn't waste resources providing them
        return await db.collection('pokemons').findOne(new ObjectID(params.id))
      }
    }
  })
})

// Define the GraphQL schemas
const schema = new GraphQLSchema({
  query
})

// Create GraphQL endpoint with CORS
app.use('/graphql', cors(), graphqlHTTP(req => ({
  schema,
  pretty: true,
  graphiql: true
})));

// Connect to the MongoDB on database "graphql"
MongoClient.connect('mongodb://localhost/graphql', (err, database) => {
  db = database;
})

// Start the server on 8080
var server = app.listen(8080, () => {
  console.log('Listening at port', server.address().port);
});
