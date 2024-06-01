const joi = require('joi');

module.exports.campgroundSchema = joi.object({
    campground: joi.object({
        title: joi.string().required().max(30),
        price: joi.number().required().min(0),
        image: joi.string().required(),
        location: joi.string().required(),
        description: joi.string().required()
    }).required()
});