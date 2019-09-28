const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");
const ActorModel = mongoose.Schema({
  name: {
    type: String,
    es_type: "string"
  },
  facebook_likes: {
    type: Number,
    default: 0,
    es_type: "integer"
  },
  age: {
    type: Number,
    default: 0,
    es_type: "integer"
  },
  facebook_page_link: {
    type: String,
    default: "",
    es_type: "string"
  }
});
ActorModel.plugin(mongoosastic, {
  hosts: ["localhost:9200"]
});

module.exports = mongoose.model("actor", ActorModel);
