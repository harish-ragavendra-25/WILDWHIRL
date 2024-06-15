const express = require('express');
const router = express.Router({mergeParams:true});

const campgroundModel = require('../models/campground');
const reviewModel = require('../models/review');

const ExpressError = require('../utilities/ExpressError');
const catchAsync = require('../utilities/catchAsync');

const {validateReview, isLoggedIn, reviewAuthor} = require('../middleware');
const reviews = require('../controllers/reviews');

router.post('/',isLoggedIn,validateReview,catchAsync(reviews.createReview));
router.delete('/:reviewId',isLoggedIn,reviewAuthor,catchAsync(reviews.deleteReview));

module.exports = router;