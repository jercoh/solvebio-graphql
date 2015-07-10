import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList
} from 'graphql/lib/type';

import SolveBio from '../solvebio';
import {
  genomicCoodinatesType
} from './genomic-coordinates.type'

export var exonType = new GraphQLObjectType({
  name: 'Exon',
  description: 'Exon creator',
  fields: () => ({
    genomic_coordinates: {
      type: genomicCoodinatesType,
      description: 'The genomic coordinates of the Exon.',
    }
  })
});