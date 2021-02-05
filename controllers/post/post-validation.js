const Joi = require("joi");

exports.CreatePost = (data) => {
  const schema = Joi.object({
    titleUnit: Joi.string().min(6).max(127).required(),
    locationUnit: Joi.string().min(6).max(255).required(),
    descriptionUnit: Joi.string().min(100).max(1023).required(),
    categoryUnit: Joi.string().min(6).max(255).required(),
    guestsUnit: Joi.number().min(1).max(20).required(),
    bedroomsUnit: Joi.number().min(1).max(20).required(),
    bathroomsUnit: Joi.number().min(1).max(20).required(),
    amenitiesUnit: Joi.array().items(Joi.string()).max(8),
    rentalPriceUnit: Joi.number().min(1).max(1000).required(),
  });
  return schema.validate(data);
};
