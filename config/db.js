const monggoose = require("mongoose");
const { mongoURINestrom, mongoURI } = require("../config");
const db = async () =>
  monggoose.connect(
    mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    err => {
      if (err) {
        console.log("MongoDB Error: ", err);
        process.exit(1);
      }
      console.log("Database connected successfuly");
    }
  );
module.exports = db;
