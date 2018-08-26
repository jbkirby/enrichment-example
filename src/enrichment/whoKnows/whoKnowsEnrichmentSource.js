const axios = require('axios')
const config = require('config');

/**
 * API configuration.
 */
const baseUrl = config.get('client.whoKnows.baseUrl');
const headers = config.get('client.whoKnows.headers');

/**
 * Query the WhoKnows API for information on a user given that user's
 * LinkedIn profile URL.
 * 
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
const getFromLinkedinUrl = async (event) => {
  return makeRequest(
    `${baseUrl}/enrich`,
    { linkedin: event.linkedIn }
  );
};

/**
 * Generalized WhoKnows API request. Results are mapped to internal format.
 * 
 * @param {*} url 
 * @param {*} params 
 * @param {*} callback 
 */
const makeRequest = async (url, params) => {
  const result = await axios.get(url, { headers, params });

  return toInternalFormat(result);
}

/**
 * Given a raw result from the WhoKnows API, map to an internal format that is
 * consistent between enrichment sources (to be defined).
 * 
 * TODO define our internal representation.
 * 
 * @param {*} result 
 */
const toInternalFormat = (result) => {
  return result.data;
}

/**
 * If params contains a LinkedIn URL, queries WhoKnows for related information.
 * 
 * Signature is AWS lambda compatible, allowing this function to be used
 * directly in a lambda if desired.
 * 
 * @param {*} params 
 */
const enrich = async (event) => {
  // Could include email here as well if we wanted, though unclear how WhoKnows
  // handles multiple identifiers if they conflict (e.g. an email address not
  // associated with the linkedIn URL).
  return event.linkedIn ? getFromLinkedinUrl(event) : {};
}

/**
 * Every enrichment source should export a name and an enrichment method.
 */
module.exports = {
  sourceName: 'whoknows',
  enrich
};