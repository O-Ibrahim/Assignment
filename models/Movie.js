const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");
const { elasticSearchURI } = require("../config");

const MovieModel = mongoose.Schema({
  title: { type: String, es_type: "string" },
  duration: { type: Number, default: 0, es_type: "double" },
  gross: { type: Number, default: 0, es_type: "double" },
  genres: [{ type: String, es_type: "string" }],
  num_voted_users: {
    type: Number,
    default: 0,
    es_type: "integer"
  },
  cast_total_facebook_likes: {
    type: Number,
    default: 0,
    es_type: "integer"
  },
  plot_keywords: [{ type: String, es_type: "string" }],
  imdb_link: { type: String, default: "#", es_type: "string" },
  num_user_for_reviews: { type: Number, es_type: "integer" },
  language: { type: String, es_type: "string" },
  country: { type: String, es_type: "string" },
  content_rating: { type: String, es_type: "string" },
  budget: { type: Number, es_type: "integer" },
  title_year: { type: Number, es_type: "integer" },
  imdb_score: { type: Number, es_type: "double" },
  aspect_ratio: { type: Number, es_type: "double" },
  movie_facebook_likes: { type: Number, es_type: "integer" },
  actors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "actor",
      es_schema: mongoose.Schema.Types.ObjectId,
      es_indexed: true
    }
  ],
  director: {
    type: String,
    ref: "director",
    es_type: "nested",
    es_include_in_parent: true
  },
  color: { type: String, es_type: "string" }
});
MovieModel.plugin(mongoosastic, {
  hosts: [`localhost:${elasticSearchURI}`]
});
module.exports = mongoose.model("movie", MovieModel);
