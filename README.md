# enrichment-example
A proof-of-concept implementation of a generalized "enrichment" service, which accepts as input an identifier (or set of identifiers) related to an individual and returns a collection of information about that individual returned from one or more enrichment sources. Information from each source is translated into a consistent, standardized format.

Currently implemented:
- one enrichment source: WhoKnows
- one identifier: LinkedIn profile URL

Pending:
- definition of standardized data format
- unit tests
