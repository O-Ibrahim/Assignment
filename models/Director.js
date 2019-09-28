const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongoosastic = require("mongoosastic");
const { elasticSearchURI } = require("../config");

const { saltRounds } = require("../config");

const DirectorSchema = mongoose.Schema({
  name: {
    type: String
  },
  facebook_likes: {
    type: Number
  },
  age: {
    type: Number
  },
  username: {
    type: String
  },
  password: {
    type: String
  }
});

DirectorSchema.pre("save" | "findOneAndUpdate", function(next) {
  let director = this;

  // Check if password changed
  if (!director.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(director.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the password with the hashed one
      director.password = hash;
      next();
    });
  });
});

DirectorSchema.plugin(mongoosastic, {
  hosts: [`localhost:${elasticSearchURI}`]
});

module.exports = mongoose.model("director", DirectorSchema);
