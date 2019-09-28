const populateDB = require("../config/populateDB");
const movieRoute = require("./movies");
const directorRoute = require("./directors");
const actorRoute = require("./actors");
const baseRoutes = [
  {
    method: "GET",
    path: "/populateDB",
    handler: async (request, h) => {
      await populateDB();
      return h.response("Done").code(200);
    }
  }
];
module.exports = baseRoutes.concat(movieRoute, actorRoute, directorRoute);
