const express = require('express');
const helmet = require('helmet')
const logger = require('morgan');
const enrichmentRouter = require('./routes/enrichmentRouter');

const app = express();

// Setup
app.use(helmet())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register routes
app.use('/enrich', enrichmentRouter);

module.exports = app;
