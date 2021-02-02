const Joi = require("joi");

exports.CreatePost = (data) => {
  const schema = Joi.object({
    postTitle: Joi.string().min(6).max(127).required(),
    postLocation: Joi.string().min(6).max(255).required(),
    postDescription: Joi.string().min(100).max(1023).required(),
    postCategory: Joi.string().min(6).max(255).required(),
    postGuests: Joi.number().min(1).max(20).required(),
    postBedrooms: Joi.number().min(1).max(20).required(),
    postBathrooms: Joi.number().min(1).max(20).required(),
    postAmenities: Joi.array().items(Joi.string()).max(8).required(),
  });
  return schema.validate(data);
};
