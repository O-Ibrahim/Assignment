const Joi = require("@hapi/joi");
const Movie = require("../models/Movie");
const movieRoutes = [
  {
    method: "GET",
    path: "/api/movies",

    handler: async (request, h) => {
      try {
        let res = await Movie.find({}).populate("actors");
        return h.response(res).code(200);
      } catch (err) {
        return h.response(err).code(500);
      }
    }
  },
  {
    method: "GET",
    path: "/api/movie/{id}",
    options: {
      validate: {
        params: Joi.object({
          id: Joi.required()
        }),
        failAction: (request, h, error) => {
          return error.isJoi
            ? h.response(error.details[0]).takeover()
            : h.response(error).takeover();
        }
      }
    },
    handler: async (request, h) => {
      try {
        let id = request.params.id;
        let res = await Movie.findById(id).select("-__v");
        return h.response(res).code(200);
      } catch (err) {
        return h.response(err).code(500);
      }
    }
  },
  {
    method: "DELETE",
    path: "/api/movie/{id}",
    options: {
      validate: {
        params: Joi.object({
          id: Joi.required()
        }),
        failAction: (request, h, error) => {
          return error.isJoi
            ? h.response(error.details[0]).takeover()
            : h.response(error).takeover();
        }
      }
    },
    handler: async (request, h) => {
      try {
        let id = request.params.id;
        let res = await Movie.deleteOne({ _id: id });
        return h.response("Deleted Successfuly").code(200);
      } catch (err) {
        return h.response(err).code(500);
      }
    }
  },
  {
    method: "POST",
    path: "/api/movie/",
    options: {
      validate: {
        payload: Joi.object({
          title: Joi.string()
            .trim()
            .min(1)
            .required(),
          duration: Joi.number()
            .min(0)
            .required(),
          gross: Joi.number()
            .min(0)
            .required(),
          genres: Joi.array().required(),
          num_voted_users: Joi.number()
            .min(0)
            .required(),
          cast_total_facebook_likes: Joi.number()
            .min(0)
            .required(),
          plot_keywords: Joi.array().required(),
          imdb_link: Joi.string()
            .trim()
            .min(1)
            .required(),
          num_user_for_reviews: Joi.number()
            .min(0)
            .required(),
          language: Joi.string()
            .trim()
            .min(1)
            .required(),
          country: Joi.string()
            .trim()
            .min(1)
            .required(),
          content_rating: Joi.string()
            .trim()
            .min(1)
            .required(),
          budget: Joi.number()
            .min(0)
            .required(),
          title_year: Joi.number()
            .min(0)
            .required(),
          imdb_score: Joi.number()
            .min(0)
            .required(),
          aspect_ratio: Joi.number()
            .min(0)
            .required(),
          movie_facebook_likes: Joi.number()
            .min(0)
            .required(),
          actors: Joi.array().required(),
          director: Joi.required(),
          color: Joi.string()
            .trim()
            .min(1)
            .required()
        }),
        failAction: (request, h, error) => {
          return error.isJoi
            ? h.response(error.details[0]).takeover()
            : h.response(error).takeover();
        }
      }
    },
    handler: async (request, h) => {
      try {
        let movie = new Movie(request.payload);
        await movie.save();
        return h.response(movie).code(200);
      } catch (err) {
        return h.response(err).code(500);
      }
    }
  },
  {
    method: "PUT",
    path: "/api/movie/",
    options: {
      validate: {
        payload: Joi.object({
          id: Joi.string()
            .trim()
            .min(1)
            .required(),
          title: Joi.string()
            .trim()
            .min(1)
            .required(),
          duration: Joi.number()
            .min(0)
            .required(),
          gross: Joi.number()
            .min(0)
            .required(),
          genres: Joi.array().required(),
          num_voted_users: Joi.number()
            .min(0)
            .required(),
          cast_total_facebook_likes: Joi.number()
            .min(0)
            .required(),
          plot_keywords: Joi.array().required(),
          imdb_link: Joi.string()
            .trim()
            .min(1)
            .required(),
          num_user_for_reviews: Joi.number()
            .min(0)
            .required(),
          language: Joi.string()
            .trim()
            .min(1)
            .required(),
          country: Joi.string()
            .trim()
            .min(1)
            .required(),
          content_rating: Joi.string()
            .trim()
            .min(1)
            .required(),
          budget: Joi.number()
            .min(0)
            .required(),
          title_year: Joi.number()
            .min(0)
            .required(),
          imdb_score: Joi.number()
            .min(0)
            .required(),
          aspect_ratio: Joi.number()
            .min(0)
            .required(),
          movie_facebook_likes: Joi.number()
            .min(0)
            .required(),
          actors: Joi.array().required(),
          director: Joi.required(),
          color: Joi.string()
            .trim()
            .min(1)
            .required()
        }),
        failAction: (request, h, error) => {
          return error.isJoi
            ? h.response(error.details[0]).takeover()
            : h.response(error).takeover();
        }
      }
    },
    handler: async (request, h) => {
      try {
        let movie = await Movie.findOneAndUpdate(
          { _id: request.payload.id },
          request.payload,
          { new: true }
        ).select("-__v");
        return h.response(movie).code(200);
      } catch (err) {
        return h.response(err).code(500);
      }
    }
  }
];
module.exports = movieRoutes;
