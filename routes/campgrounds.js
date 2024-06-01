const express = require('express');
const router = express.Router();
const campgroundModel = require('../models/campground');
const catchAsync = require('../utilities/catchAsync');
const campgrounds = require('../controllers/campground');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(catchAsync(campgrounds.createCampground));

router.get('/new',campgrounds.renderForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(catchAsync(campgrounds.updateCampground))
    .delete(catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit',catchAsync(campgrounds.renderEditForm));

module.exports = router;