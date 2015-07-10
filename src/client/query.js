import request from 'superagent';
import Debug from 'debug';

var debug = new Debug('client:query');
var depositoryId = '223';
var chromosome = '7';
var start = '117199644';
var stop = '117199647';

request
  .get('http://localhost:3000/data')
  .query({
    query: `{
      geneModule(chromosome: "${chromosome}", start:"${start}", stop: "${stop}") {
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
    }`
  })
  .end(function (err, res) {
    debug(err || res.body);
    debug('body', res.body.data.geneModule);
  });
