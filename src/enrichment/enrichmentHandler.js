const whoKnowsSource = require('../enrichment/whoKnows/whoKnowsEnrichmentSource');

/**
 * Enrichment sources to be queried. Each object in this array should export:
 *   sourceName: a unique string name identifying the source
 *   enrich: a method returning a Promise that will resolve with the results of
 *           querying the source.
 */
const sources = [whoKnowsSource];

/**
 * Entry point for querying enrichment sources.
 * 
 * Registered enrichment sources are queried in parallel, and results are
 * aggregated into an array of objects containing the self-declared name of the
 * source and the corresponding result of the query. Failure of any individual
 * source will not prevent the results of other sources from being returned,
 * and any reported errors will be included in the result object for that
 * source.
 * 
 * Signature is AWS lambda compatible, allowing this function to be used
 * directly in a lambda if desired.
 * 
 * @param {*} event an object containing zero or more query strings that will be
 * passed as input to each enrichment source handler.
 */
const handleEvent = async (event) => {
  const validatedInput = await validateQueryParams(event.query);

  // Query all enrichment sources in parallel
  return Promise.all(
    sources.map(s => (
      s.enrich(validatedInput)
      .catch(err => {
        // If the enrichment source fails, include the error as the result body.
        return {
          error: err.message ? err.message : 'unknown exception'
        };
      })
      .then(result => {
        return {
          source: s.sourceName,
          result
        }
      })
    ))
  );
};

/**
 * Validate query parameter input. Should throw (i.e. fail the returned Promise)
 * on validation failure.
 * 
 * @param {*} query
 */
const validateQueryParams = async (query) => {
  // TODO schema validation, e.g. joi https://github.com/hapijs/joi
  // For now, just assume correct input format
  return Object.assign(
    {},
    query.linkedIn && { linkedIn: query.linkedIn },
    query.email && { email: query.email }
  );
}

module.exports = handleEvent;