const Joi = require("@hapi/joi");
const Actor = require("../models/Actor");
const actorRoutes = [
  {
    method: "GET",
    path: "/api/actors",

    handler: async (request, h) => {
      try {
        let res = await Actor.find({});
        return h.response(res).code(200);
      } catch (err) {
        return h.response(err).code(500);
      }
    }
  },
  {
    method: "GET",
    path: "/api/actor/{id}",
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
        let res = await Actor.findById(id).select("-__v");
        return h.response(res).code(200);
      } catch (err) {
        return h.response(err).code(500);
      }
    }
  },
  {
    method: "DELETE",
    path: "/api/actor/{id}",
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
        let res = await Actor.deleteOne({ _id: id });
        return h.response("Deleted Successfuly").code(200);
      } catch (err) {
        return h.response(err).code(500);
      }
    }
  },
  {
    method: "POST",
    path: "/api/actor/",
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
          facebook_page_link: Joi.string()
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
        let actor = new Actor(request.payload).select("-__v");
        await actor.save();
        return h.response(actor).code(200);
      } catch (err) {
        return h.response(err).code(500);
      }
    }
  },
  {
    method: "PUT",
    path: "/api/actor/",
    options: {
      validate: {
        payload: Joi.object({
          id: Joi.required(),
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
          facebook_page_link: Joi.string()
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
        let actor = await Actor.findOneAndUpdate(
          { _id: request.payload.id },
          request.payload,
          { new: true }
        ).select("-__v");
        return h.response(actor).code(200);
      } catch (err) {
        return h.response(err).code(500);
      }
    }
  }
];
module.exports = actorRoutes;
