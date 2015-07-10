import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList
} from 'graphql/lib/type';

import SolveBio from '../solvebio';

export var depositoryVersionType = new GraphQLObjectType({
  name: 'Depository Version',
  description: 'Depository Version creator',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the depository version.',
    },
    full_name: {
      type: GraphQLString,
      description: 'The name of the depository version.',
    }
  })
});