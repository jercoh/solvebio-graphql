import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList
} from 'graphql/lib/type';

import {
  transcriptType
} from './transcript.type'

import {
  genomicCoodinatesType
} from './genomic-coordinates.type'

import SolveBio from '../solvebio';
import _ from 'lodash';


export var geneType = new GraphQLObjectType({
  name: 'Gene',
  description: 'Gene creator',
  fields: () => ({
    gene_symbol: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The Symbol of the Gene.',
    },
    ensembl_id_gene: {
      type: GraphQLString,
      description: 'The Ensembl ID of the Gene.',
    },
    genomic_coordinates: {
      type: genomicCoodinatesType,
      description: 'The genomic coordinates of the Gene.',
    },
    strand: {
      type: GraphQLString,
      description: 'The strand of the Gene.',
    },
    best_transcript: {
      type: transcriptType,
      description: 'Best Transcript of the Gene',
      args: {
        dataset: {
          name: 'dataset',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (gene, {dataset}) => {
        return SolveBio.Dataset(dataset).query({
          filters: SolveBio.Filter({
            feature__exact: 'transcript',
            ensembl_id_gene__exact: gene.ensembl_id_gene
          })
        })
          .then(function(response) {
            return getBestTranscript(response.results);
          });
      },
    }
  })
});

function getBestTranscript(transcripts) {
  return _.chain(transcripts).sortBy(function(transcript) {
    return transcript.genomic_coordinates.stop - transcript.genomic_coordinates.start;
  }).last().value();
}