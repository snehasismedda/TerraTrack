const Listing = require("./models/listing");
const { listingSchema, reviewSchema, UpdateSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");
const Review = require("./models/review");

module.exports.isLoggedIn=(req, res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl= req.originalUrl;
        req.flash("error","You must be logged in!");
        return res.redirect("/login");
    }
    next();
}

module.exports. saveRedirectUrl=(req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }

    next();
}


module.exports.isOwner= async(req, res, next)=>{
    let{id}=req.params;
    let listing= await Listing.findById(id);

    if( res.locals.currUser && !listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "Unauthorized access!");
        return res.redirect(`/listings/${id}`);
    }

    next();
}


module.exports.isReviewAuthor= async(req, res, next)=>{
    let{reviewId, id}=req.params;
    let review= await Review.findById(reviewId);

    if( res.locals.currUser && !review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "Unauthorized access!");
        return res.redirect(`/listings/${id}`);
    }

    next();
}

module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(",");
        return next(new ExpressError(400, errMsg));
    }
    next();
};
module.exports.validateListingUpdate = (req, res, next) => {
    const { error } = UpdateSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(",");
        return next(new ExpressError(400, errMsg));
    }
    next();
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(e => e.message).join(",");
        return next(new ExpressError(400, msg));
    }
    next();
};