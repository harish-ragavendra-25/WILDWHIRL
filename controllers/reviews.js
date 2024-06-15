const campgroundModel = require('../models/campground');
const reviewModel = require('../models/review');

module.exports.createReview = async(req,res) => {
    const campground = await campgroundModel.findById(req.params.id);
    const review = new reviewModel(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('sucess','review posted!!');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async(req,res) => {
    const { id,reviewId } = req.params;
    await campgroundModel.findByIdAndUpdate(id, { $pull: { reviews:reviewId }});
    await reviewModel.findByIdAndDelete(reviewId);
    req.flash('sucess','review deleted!!');
    res.redirect(`/campgrounds/${id}`);
}