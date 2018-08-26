# enrichment-example
A proof-of-concept implementation of a generalized "enrichment" service, which accepts as input an identifier (or set of identifiers) related to an individual and generates a collection of the information about that individual returned from one or more enrichment sources. Information from each source will be translated into a consistent, standardized format.

For the purposes of this example, the collected information is returned synchronously as an HTTP response. This behavior could be easily extended to include persistence or publishing to a message queue.

## Quick Start
- update `config/default.json` with a valid WhoKnows API key
- `npm install`
- `npm start`
- GET `/enrich?linkedIn=profile url here`

## Status
Currently implemented:
- one enrichment source: [WhoKnows](https://corp.whoknows.com)
- one identifier: LinkedIn profile URL

Pending:
- definition of standardized data format
- unit tests
