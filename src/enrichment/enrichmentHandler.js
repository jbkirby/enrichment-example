const whoKnowsSource = require('../enrichment/whoKnows/whoKnowsEnrichmentSource');

const sources = [whoKnowsSource];

/**
 * Validate input and pass to all registered enrichment sources.
 * 
 * @param {*} event 
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