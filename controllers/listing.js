const Listing = require("../models/listing");
const Review = require("../models/review");
const Category = require("../models/categories");
const { cloudinary } = require("../cloudConfig");

// Get All Listings
module.exports.index = async (req, res) => {
  const categories = await Category.find({});
  let selectedCategories = req.query.category;

  // Normalize to array
  if (!selectedCategories) {
    selectedCategories = [];
  } else if (!Array.isArray(selectedCategories)) {
    selectedCategories = [selectedCategories];
  }

  let filter = {};
  if (selectedCategories.length > 0) {
    // Find category ObjectIds based on selected names
    const matchedCategories = await Category.find({ name: { $in: selectedCategories } });
    const categoryIds = matchedCategories.map(cat => cat._id);
    filter.category = { $in: categoryIds };
  }

  const allListings = await Listing.find(filter).populate("category");

  res.render("listings/index.ejs", { allListings, categories, selectedCategories });
};


// New Listing Form
module.exports.renderNewForm = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.render("listings/new.ejs", { categories });
  } catch (err) {
    console.error("Failed to load categories:", err);
    req.flash("error", "Unable to load categories.");
    res.redirect("/listings");
  }
};

// Create Listing
module.exports.createListing = async (req, res) => {
  try {
    if (!req.file) {
      req.flash("error", "Image upload failed.");
      return res.redirect("/listings/new");
    }

    const { path: url, filename } = req.file;
    const newListing = new Listing(req.body.listings);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    // Save selected categories
    if (req.body.category) {
      newListing.category = Array.isArray(req.body.category) ? req.body.category : [req.body.category];
    }

    await newListing.save();
    req.flash("success", "Listing created successfully!");
    res.redirect(`/listings/${newListing._id}`);
  } catch (err) {
    console.error("Failed to create listing:", err);
    req.flash("error", "Failed to create listing.");
    res.redirect("/listings");
  }
};

// Show Listing
module.exports.showListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner")
    .populate("category");

  if (!listing) {
    req.flash("error", "Invalid listing ID. Listing not found.");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

// Render Edit Form
module.exports.renderEditForm = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    req.flash("error", "Invalid Listing!");
    return res.redirect("/listings");
  }

  const categories = await Category.find({});
  res.render("listings/update.ejs", { listing, categories });
};

// Update Listing
module.exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing not found.");
      return res.redirect("/listings");
    }

    // Sanitize input and merge non-image fields
    const updates = { ...req.body.listings };
    delete updates.image; // Prevent image string overwrite

    Object.assign(listing, updates);

    // Handle category update
    if (req.body.category) {
      listing.category = Array.isArray(req.body.category)
        ? req.body.category
        : [req.body.category];
    } else {
      listing.category = [];
    }

    if (req.file) {
      const { path: url, filename } = req.file;
      listing.image = { url, filename };
    }

    await listing.save();

    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    req.flash("error", "Something went wrong during update.");
    res.redirect("/listings");
  }
};


module.exports.deleteListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    req.flash("error", "Listing not found or already deleted.");
    return res.redirect("/listings");
  }

  try {
    // 1. Delete image from Cloudinary if exists
    if (listing.image && listing.image.filename) {
      await cloudinary.uploader.destroy(listing.image.filename);
      // .destroy() removes the image from Cloudinary permanently
    }

    // 2. Delete the listing document from DB
    await Listing.findByIdAndDelete(req.params.id);

    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
  } catch (err) {
    req.flash("error", "Could not delete listing. Try again.");
    res.redirect("/listings");
  }
};

