const Review = require("../models/review");
const Listing = require("../models/listing");
module.exports.createReview = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("sucess", "New Review Created");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewid } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
  await Review.findByIdAndDelete(reviewid);
  req.flash("sucess", "Review Deleted");
  res.redirect(`/listings/${id}`);
};