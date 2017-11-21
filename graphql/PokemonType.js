import {GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLBoolean} from 'graphql';

// Defines the Pokemon type
export default new GraphQLObjectType({
  name: 'Pokemon',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    number: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    type1: {
      type: GraphQLString
    },
    type2: {
      type: GraphQLString
    },
    total: {
      type: GraphQLInt
    },
    hp: {
      type: GraphQLInt
    },
    attack: {
      type: GraphQLInt
    },
    defense: {
      type: GraphQLInt
    },
    spattack: {
      type: GraphQLInt
    },
    spdefense: {
      type: GraphQLInt
    },
    speed: {
      type: GraphQLInt
    },
    generation: {
      type: GraphQLInt
    },
    legendary: {
      type: GraphQLBoolean
    }
  }
});
