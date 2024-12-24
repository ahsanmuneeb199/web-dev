const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");
const reviewControler = require("../controlers/review.js");

//reviews
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewControler.createReview)
);

router.delete(
  "/:reviewid",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewControler.destroyReview)
);

module.exports = router;
