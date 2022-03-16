const { app } = require("./app");

//Util
const { sequelize } = require("./util/database");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("app  runnin");
});
