const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

//SIGN UP CODE

router
    .route("/signup")
    .get(userController.renderSignupFrom)
    .post(wrapAsync(userController.signup));

//LOG IN CODE

router.route("/login")
.get(userController.renderLoginFrom)
.post(
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login", 
        failureFlash : true,
    }), 
    userController.login
);

//LOG OUT CODE

router.get("/logout", userController.logout)

module.exports = router;