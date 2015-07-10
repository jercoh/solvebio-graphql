import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList
} from 'graphql/lib/type';

import SolveBio from '../solvebio';
import { depositoryVersionType } from './depository-version.type';

export var depositoryType = new GraphQLObjectType({
  name: 'Depository',
  description: 'Depository creator',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the depository.',
    },
    full_name: {
      type: GraphQLString,
      description: 'The name of the depository.',
    },
    versions: {
      type: new GraphQLList(depositoryVersionType),
      description: 'The versions of the depository, or an empty list if they have none.',
      resolve: (depository) => {
        return SolveBio.Depository(depository.id).versions()
          .then(function(response) {
            return response.data;
          });
      },
    }
  })
});