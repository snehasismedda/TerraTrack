const express = require("express");
const router = express.Router({ mergeParams: true });

const reviewController = require("../controllers/review");
const wrapAsync = require("../utils/wrapAsync");

const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware");

// CREATE Review
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// DELETE Review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;
