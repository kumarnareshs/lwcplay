// Simple Express server setup to serve the build output
const compression = require("compression");
const helmet = require("helmet");
const express = require("express");
const path = require("path");
const passport = require('passport');


const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;
const DIST_DIR = "./dist";


/* //passport
var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
  clientID: '6e2a9fedf66ea4fc3a5e',
  clientSecret: '5fded0367ece4217cf1576ab6383af93c0ea3c82',
  callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
},
  function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
)); */
/* passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
}); */
const app = express();
app.use(helmet());
app.use(compression());

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
/* app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
 */
// // Initialize Passport and restore authentication state, if any, from the
// // session.
// app.use(passport.initialize());
// app.use(passport.session());


// app.get('/login/github',
//   passport.authenticate('github'));

// app.get('/auth/github/callback',
//   passport.authenticate('github', { failureRedirect: '/login' }),
//   function (req, res) {
//     res.redirect('/header');
//   });

// app.get('/profile',
//   require('connect-ensure-login').ensureLoggedIn(),

/*   function (req, res) {
   // res.render('profile', { user: req.user });
    res.redirect('/header?'+req.user);
  }); */
app.use(express.static(DIST_DIR));
app.use("*", (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, "index.html"));
});

app.listen(PORT, () =>
  console.log(`✅  Server started: http://${HOST}:${PORT}`)
);
