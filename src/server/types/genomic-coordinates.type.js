import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList
} from 'graphql/lib/type';

import SolveBio from '../solvebio';

export var genomicCoodinatesType = new GraphQLObjectType({
  name: 'Genomic Coordinates',
  description: 'Genomic Coordinates creator',
  fields: () => ({
    start: {
      type: GraphQLString,
      description: 'Start',
    },
    stop: {
      type: GraphQLString,
      description: 'Stop',
    }
  })
});