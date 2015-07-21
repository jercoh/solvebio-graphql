import request from 'superagent';
import Debug from 'debug';

var debug = new Debug('client:query');

request
  .get('http://localhost:3000/data')
  .query({
    query: `
      query getGeneModule($chromosome: String!, $start: String!, $stop: String!, $datasets: [String]) {
        geneModule(chromosome: $chromosome, start: $start, stop: $stop, datasets: $datasets) {
          overlapping_gene {
            gene_symbol
            ensembl_id_gene
            genomic_coordinates {
              start
              stop
            }
            strand
            best_transcript {
              ensembl_id_transcript
              exons {
                genomic_coordinates {
                  start
                  stop
                }
              }
            }
          }
          neighboring_genes {
            gene_symbol
            genomic_coordinates {
              start
              stop
            }
            strand
          }
        }
      }
    `,
    params: {
      chromosome: '7',
      start: '117199644',
      stop: '117199647',
      datasets: ['GENCODE/1.1.0-2015-01-09/GENCODE19']
    }
  })
  .end(function (err, res) {
    debug(err || res.body);
    debug('body', res.body);
  });
