const axios = require('axios')
const config = require('config');

// API configuration
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
 * Make WhoKnows API request.
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
 * Given a raw result from the WhoKnows API, map to a consistent internal
 * representation (to be defined).
 * 
 * TODO define our internal representation.
 * 
 * @param {*} result 
 */
const toInternalFormat = (result) => {
  return result.data;
}

/**
 * If params contains a LinkedIn URL and/or an email address, queries WhoKnows for related information.
 * 
 * Signature is AWS lambda compatible, allowing this function to be used directly in a lambda.
 * 
 * @param {*} params 
 */
const enrich = async (event) => {
  // Could include email here as well, if we wanted, though unclear how WhoKnows handles multiple
  // identifiers if they are in conflict (e.g. an email address not associated with the linkedIn URL).
  return event.linkedIn ? getFromLinkedinUrl(event) : {};
}

module.exports = {
  sourceName: 'whoknows',
  enrich
};