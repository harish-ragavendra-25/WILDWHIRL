const { campgroundSchema,reviewSchema } = require('./Schema');
const reviewModel = require('./models/review');
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

module.exports.reviewAuthor = async (req,res,next) => {
  const { id, reviewId } = req.params;
  const review = await reviewModel.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "dont have permission to do that!!");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

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

module.exports.isAuthor = async (req, res, next) => {
  const campground = await campgroundModel.findById(id);
  if (!campground.author.equal(req.user._id)) {
    req.flash("error", "Not authorized to do that!!");
    return res.redirect(`/campgrounds/${campground._id}`);
  }
  next();
}
