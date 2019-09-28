const Hapi = require("@hapi/hapi");
const { port, host } = require("./config");
const routes = require("./routes");
const db = require("./config/db");
//Connecting to DB
db();

//Import setup for elastic search

//require("./config/elasticsearch/Actor");
//require("./config/elasticsearch/Director");
require("./config/elasticsearch/Movie");

const init = async () => {
  const server = Hapi.server({ port, host });

  //Adding routes
  server.route(routes);

  //Start server
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
