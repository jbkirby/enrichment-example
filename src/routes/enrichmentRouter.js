const express = require('express');
const handler = require('../enrichment/enrichmentHandler');

const router = express.Router();

/**
 * Enrichment endpoint. Accepts talent identifiers (e.g. email, linkedin URL) as
 * query parameters, passing those identifiers to all registered enrichment
 * sources.
 * 
 * Unhandled exceptions are passed to the global error handler.
 */
router.get('/', (req, res, next) => {
  handler(req)
  .then(result => res.send(result))
  .catch(next)
});

module.exports = router;