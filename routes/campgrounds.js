const express = require('express');
const router = express.Router();
const campgroundModel = require('../models/campground');
const catchAsync = require('../utilities/catchAsync');
const campgrounds = require('../controllers/campground');

const {isLoggedIn} = require('../middleware');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn,catchAsync(campgrounds.createCampground));

router.get('/new',isLoggedIn,campgrounds.renderForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn,catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn,catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit',isLoggedIn,catchAsync(campgrounds.renderEditForm));

module.exports = router;