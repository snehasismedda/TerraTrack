const Joi = require('joi');

// For Create: Image required
module.exports.ListingSchema = Joi.object({
  listings: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.object({
      url: Joi.string().required(),
      filename: Joi.string().required(),
    }).required(),
  }).required(),
});

// For Update: Image optional
module.exports.UpdateSchema = Joi.object({
  listings: Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    location: Joi.string(),
    country: Joi.string(),
    price: Joi.number().min(0),
    image: Joi.object({
      url: Joi.string(),
      filename: Joi.string(),
    }).optional(),
  }),
});


module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required(),
})