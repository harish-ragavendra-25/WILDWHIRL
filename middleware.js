const { campgroundSchema } = require('./Schema');
const ExpressError = require('./utilities/ExpressError');
const campgroundModel = require('./models/campground');

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