const { campgroundSchema,reviewSchema } = require('./Schema');
const ExpressError = require('./utilities/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "Kindly Login...");
    res.redirect("/login");
  }
  else{
    next();
  }
}

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

module.exports.storeretrunTo = (req,res,next) => {
  if(req.session.returnTo){
    res.locals.returnTo = req.session.returnTo;
  }
  next();
}