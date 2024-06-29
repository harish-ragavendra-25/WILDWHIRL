const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const campgrounds = require('../controllers/campground');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const {isLoggedIn,isAuthor, validateCampground} = require('../middleware');

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.createCampground)
  );

router.get('/new',isLoggedIn,campgrounds.renderForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn,isAuthor,upload.array('image'),validateCampground,catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn,isAuthor,catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit',isLoggedIn,catchAsync(campgrounds.renderEditForm));

module.exports = router;