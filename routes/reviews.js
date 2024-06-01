const express = require('express');
const router = express.Router({mergeParams:true});

const campgroundModel = require('../models/campground');
const reviewModel = require('../models/review');

const ExpressError = require('../utilities/ExpressError');
const catchAsync = require('../utilities/catchAsync');

const {validateReview} = require('../middleware');
const reviews = require('../controllers/reviews');

router.post('/',validateReview,catchAsync(reviews.createReview));
router.delete('/:reviewId',catchAsync(reviews.deleteReview));

module.exports = router;