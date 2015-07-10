import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList
} from 'graphql/lib/type';

import {
  geneType
} from './gene.type'

import SolveBio from '../solvebio';
import {
  genomicCoodinatesType
} from './genomic-coordinates.type.js'

import _ from 'lodash';


export var geneModuleType = new GraphQLObjectType({
  name: 'Gene Module',
  description: 'Gene creator',
  fields: () => ({
    genomic_coordinates: {
      type: genomicCoodinatesType,
      description: 'The genomic coordinates of the Variant.',
    },
    chromosome: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'chromosome',
    },
    genes: {
      type: new GraphQLList(geneType),
      description: 'Genes',
    },
    overlapping_gene: {
      type: geneType,
      description: 'Gene overlapping the Variant',
      resolve: (geneModule) => {
        return getOverlappingGene(geneModule.genes, geneModule.genomic_coordinates);
      },
    },
    neighboring_genes: {
      type: new GraphQLList(geneType),
      description: 'List of Genes neighboring the Variant',
      resolve: (geneModule) => {
        return getNeighboringGenes(geneModule.genes);
      },
    },
  })
});

function getOverlappingGene(genes, genomic_coordinates) {
  var overlappingGene = _.find(genes, function(gene) {
    return gene.genomic_coordinates.start <= genomic_coordinates.start && gene.genomic_coordinates.stop >= genomic_coordinates.stop;
  });

  return overlappingGene;
}

function getNeighboringGenes(genes) {
  return _.chain(genes)
    .sortBy(function(gene) {
      // Sort Genes by transcript size
      return gene.genomic_coordinates.start - gene.genomic_coordinates.stop;
    })
    .uniq('gene_symbol') // Removes dupes and take the longest transcript
    .sortBy('genomic_coordinates.start').value();
}