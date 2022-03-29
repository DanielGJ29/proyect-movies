const express = require('express');

//Controoleer
const { globalErrorHandler } = require('./controllers/error.controller');

//Routers
const { actorRouter } = require('./routes/actors.routes');
const { usersRouter } = require('./routes/users.routes');
const { movieRouter } = require('./routes/movies.routes');

const app = express();

app.set('view engine', 'pug');

app.use(express.json());

//Endpoints
app.use('/api/v1/actors', actorRouter);

app.use('/api/v1/users', usersRouter);

app.use('/api/v1/movies', movieRouter);

app.use(globalErrorHandler);

module.exports = { app };
