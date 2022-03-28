const express = require('express');

//Controoleer
const {} = require('./controllers/error.controller');

//Routers
const { actorRouter } = require('./routes/actors.routes');
const { usersRouter } = require('./routes/users.routes');

const app = express();

app.use(express.json());

//Endpoints
app.use('/api/v1/actors', actorRouter);

app.use('/api/v1/users', usersRouter);

module.exports = { app };
