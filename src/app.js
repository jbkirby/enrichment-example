const express = require('express');
const helmet = require('helmet')
const logger = require('morgan');
const enrichmentRouter = require('./routes/enrichmentRouter');

const app = express();

// Setup

// Modify headers to improve security
app.use(helmet())
// Log requests to stdout
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register root routes.
app.use('/enrich', enrichmentRouter);

module.exports = app;
