const { campgroundSchema,reviewSchema } = require('./Schema');
const ExpressError = require('./utilities/ExpressError');
const campgroundModel = require('./models/campground');
const reviewModel = require('./models/review');

module.exports.validateCampground = (req,res,next) => {
    const { error } = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg,400);
    }
    else{
        next();
    }
}

module.exports.validateReview = (req,res,next) => {
    const { error } = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg,400);
    }
    else
    {
        next();
    }
}