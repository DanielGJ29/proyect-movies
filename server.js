const { app } = require('./app');

//Util
const { sequelize } = require('./util/database');

//Database authenticated
sequelize
  .authenticate()
  .then(() => console.log('Database Authenticated'))
  .catch((err) => console.log(err));

//Database sysced with models relations
sequelize
  .sync()
  .then(() => console.log('Data synced'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`app  runnin on port: ${PORT}`);
});
