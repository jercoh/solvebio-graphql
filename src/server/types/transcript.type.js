import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList
} from 'graphql/lib/type';

import SolveBio from '../solvebio';
import {
  exonType
} from './exon.type'

export var transcriptType = new GraphQLObjectType({
  name: 'Transcript',
  description: 'Transcript creator',
  fields: () => ({
    ensembl_id_transcript: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The Ensembl ID of the Transcript.',
    },
    exons: {
      type: new GraphQLList(exonType),
      description: 'Best Transcript of the Gene',
      args: {
        dataset: {
          name: 'dataset',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (transcript, {dataset}) => {
        return SolveBio.Dataset(dataset).query({
            filters: SolveBio.Filter({
              feature__exact: 'exon',
              ensembl_id_transcript__exact: transcript.ensembl_id_transcript
            })
          })
          .then(function(response) {
            return response.results;
          });
      },
    }
  })
});