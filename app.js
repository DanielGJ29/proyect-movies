const express = require('express');

//Routers
const { actorRouter } = require('./routes/actors.routes');

const app = express();

//Endpoints
app.use('/api/v1/actors', actorRouter);

module.exports = { app };
