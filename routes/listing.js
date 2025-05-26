const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listing");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing, validateListingUpdate } = require("../middleware");
const multer  = require('multer');
const{storage}=require("../cloudConfig");
const upload = multer({ storage });

// INDEX
router.get("/", wrapAsync(listingController.index));

// NEW FORM
router.get("/new", isLoggedIn, listingController.renderNewForm);

// CREATE
router.post("/", isLoggedIn, upload.single('listings[image]'),  wrapAsync(listingController.createListing));

// SHOW
router.get("/:id", wrapAsync(listingController.showListing));

// EDIT FORM
router.get("/update/:id", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// UPDATE
router.patch("/:id", isLoggedIn, isOwner, upload.single('listings[image]'), wrapAsync(listingController.updateListing));

// DELETE
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;
