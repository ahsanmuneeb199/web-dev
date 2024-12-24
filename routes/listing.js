const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingControler = require("../controlers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//service side validation 1 joi 2 make function and 3 add this function as midleware

//1 index route
router
  .route("/")
  .get(wrapAsync(listingControler.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingControler.createListings)
  );

// 3 new route
router.get("/new", isLoggedIn, listingControler.renderNewForm);

// 4 create route in listings

//5 edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingControler.renderEditForm)
);

//6 update route //7 delete route
//2 show route
router
  .route("/:id")
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingControler.updateLitings)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingControler.destroyListings))
  .get(wrapAsync(listingControler.showListings));

module.exports = router;
