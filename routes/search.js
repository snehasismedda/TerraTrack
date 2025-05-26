const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");

router.get("/", async (req, res) => {
    const query = req.query.q?.trim();

    if (!query) {
        req.flash("error", "Invalid Search")
        return res.redirect("/listings"); // or show a message
    }

    try {
        const listings = await Listing.find({
            $or: [
                { title: new RegExp(query, 'i') },
                { location: new RegExp(query, 'i') },
                { country: new RegExp(query, 'i') }
            ]
        });

        res.render("listings/searchres", { allListings: listings, searchQuery: query });
    } catch (err) {
        console.error("Search error:", err);
        res.status(500).send("Server Error");
    }
});



module.exports = router;
