const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new User({
      email,
      username,
    });
    let registerUser = await User.register(newUser, password);
    console.log(registerUser);
    req.login(registerUser, (err) => {
      if (err) {
        next(err);
      }
      req.flash("sucess", `${registerUser.username} wellcome to our page `);
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message), res.redirect("/singup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("sucess", "wellcome back to wanderlust");
  let redirecturl = res.locals.redirectUrl || "/listings";
  res.redirect(redirecturl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("sucess", "your logged out!");
    res.redirect("/listings");
  });
};
