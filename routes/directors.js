const Joi = require("@hapi/joi");
const Director = require("../models/Director");
const _ = require("lodash");
const directorRoute = [
  {
    method: "GET",
    path: "/api/directors",

    handler: async (request, h) => {
      try {
        let res = await Director.find({}).select("-__v -password");
        return h.response(res).code(200);
      } catch (err) {
        return h.response(err).code(500);
      }
    }
  },
  {
    method: "GET",
    path: "/api/director/{id}",
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
        let res = await Director.findById(id);
        return h.response(res).code(200);
      } catch (err) {
        return h.response(err).code(500);
      }
    }
  },
  {
    method: "DELETE",
    path: "/api/director/{id}",
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
        let res = await Director.deleteOne({ _id: id });
        return h.response("Deleted Successfuly").code(200);
      } catch (err) {
        return h.response(err).code(500);
      }
    }
  },
  {
    method: "POST",
    path: "/api/director/",
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string()
            .trim()
            .min(1)
            .required(),
          facebook_likes: Joi.number()
            .min(0)
            .required(),
          age: Joi.number()
            .min(0)
            .required(),
          username: Joi.string()
            .trim()
            .min(1)
            .required(),
          password: Joi.string()
            .trim()
            .min(8)
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
        let director = new Director(request.payload);
        await director.save();
        return h.response(director).code(200);
      } catch (err) {
        return h.response(err).code(500);
      }
    }
  },
  {
    method: "PUT",
    path: "/api/director/",
    options: {
      validate: {
        payload: Joi.object({
          id: Joi.string()
            .trim()
            .min(1)
            .required(),
          name: Joi.string()
            .trim()
            .min(1)
            .required(),
          facebook_likes: Joi.number()
            .min(0)
            .required(),
          age: Joi.number()
            .min(0)
            .required(),
          username: Joi.string()
            .trim()
            .min(1)
            .required(),
          password: Joi.string()
            .trim()
            .min(8)
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
        let director = await Director.findOneAndUpdate(
          { _id: request.payload.id },
          _.omit(request.payload, "id"),
          { new: true }
        ).select("-__v -password");
        return h.response(director).code(200);
      } catch (err) {
        return h.response(err).code(500);
      }
    }
  }
];
module.exports = directorRoute;
