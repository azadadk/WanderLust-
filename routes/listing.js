const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingConrtoller = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({storage});

router
    .route("/")
    .get(wrapAsync(listingConrtoller.index))
    .post( 
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingConrtoller.createListing)
    );


    //NEW ROUTE

router.get("/new", isLoggedIn, listingConrtoller.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(listingConrtoller.showListing))
    .put(
            isLoggedIn,
            isOwner,
            upload.single("listing[image]"),
            validateListing,
        wrapAsync(listingConrtoller.updateListing)
        )
    .delete( 
            isLoggedIn,
        wrapAsync(listingConrtoller.destroyListing)
        );
        
//EDIT ROUTE

router.get("/:id/edit",
    isLoggedIn, 
    isOwner,
    wrapAsync(listingConrtoller.renderEditForm)
);

module.exports = router;