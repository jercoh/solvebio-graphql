import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList
} from 'graphql/lib/type';

import {
  depositoryType,
  depositoryVersionType,
  geneModuleType
} from './types';

import SolveBio from './solvebio';
import _ from 'lodash';

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: function() {
          return 'world';
        }
      },
      depository: {
        type: depositoryType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root, {id}) => {
          return SolveBio.Depository(id).retrieve();
        }
      },
      version: {
        type: depositoryVersionType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root, {id}) => {
          return SolveBio.DepositoryVersion(id).retrieve();
        }
      },
      geneModule: {
        type: geneModuleType,
        args: {
          start: {
            name: 'start',
            type: new GraphQLNonNull(GraphQLString)
          },
          stop: {
            name: 'stop',
            type: new GraphQLNonNull(GraphQLString)
          },
          chromosome: {
            name: 'chromosome',
            type: new GraphQLNonNull(GraphQLString)
          },
          dataset: {
            name: 'dataset',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root, {start, stop, chromosome, dataset}) => {
          var region = getRegion(start, stop);
          return SolveBio.Dataset(dataset).query({
            filters: [{
              'and': [
                ['feature__exact', 'gene'],
                ['gene_status__exact', 'KNOWN'],
                ['gene_type__exact', 'protein_coding'],
                ['genomic_coordinates.start__gte', region.start],
                ['genomic_coordinates.stop__lte', region.stop],
                ['genomic_coordinates.chromosome__exact', chromosome]
              ]
            }]
          })
            .then(function(response) {
              return {
                genomic_coordinates: {
                  start: start,
                  stop: stop
                },
                chromosome: chromosome,
                genes: response.results
              }
            });
        }
      }
    }
  }),
});

function getRegion(start, stop) {
  let regionOffset = 500000;
  return {
    start: parseInt(start) >= regionOffset ? (parseInt(start) - regionOffset).toString() : parseInt(start),
    stop: (parseInt(stop) + regionOffset).toString()
  }
}

export default schema;
