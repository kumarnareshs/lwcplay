// Simple Express server setup to serve for local testing/dev API server

const express = require("express");
const request = require("axios");
const { parse } = require('querystring');
var passport = require('passport');
//passport
var GitHubStrategy = require('passport-github').Strategy;

const app = express();
app.use(require("helmet")());
app.use(require("compression")());
app.use(require('morgan')('dev'));

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

/* var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
} */
app.use(require('cors')());

const HOST = process.env.API_HOST || "localhost";
const PORT = process.env.API_PORT || 3002;

app.get("/api/v1/endpoint", (req, res) => {
  res.json({ success: true });
});
app.get("/api/auth", (req, res) => {
  if (!req.query.code)
    res.send("Code is not present");

  getAccessToken(req, res, req.query.code);
});



passport.use(new GitHubStrategy({
  clientID: '6e2a9fedf66ea4fc3a5e',
  clientSecret: '5fded0367ece4217cf1576ab6383af93c0ea3c82',
  callbackURL: 'http://localhost:3002/callback'
},
  function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

async function getAccessToken(req, res, code) {
  let params = toQuery({
    client_id: '6e2a9fedf66ea4fc3a5e',
    client_secret: '5fded0367ece4217cf1576ab6383af93c0ea3c82',
    code: code
  })
  const response = request.post(`https://github.com/login/oauth/access_token?${params}`).then(response => {
    if (response.data) {
      let data = parse(response.data);
      getUserEmail(data.access_token);
    }
  }).catch(error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  })

  console.log()
}

function getUserEmail(token) {
  let headers = {
    'Authorization': 'token ' + token
  };

  request.get('https://api.github.com/user', { headers: headers }).then(response => {
    if (response.data) {
      console.log(response.data);
    }
  }).catch(error => {
    console.log(error);
  });
}

function toQuery(params, delimiter = '&') {
  const keys = Object.keys(params);

  return keys.reduce((str, key, index) => {
    let query = `${str}${key}=${params[key]}`;

    if (index < (keys.length - 1)) {
      query += delimiter;
    }

    return query;
  }, '');
}


app.listen(PORT, () =>
  console.log(`✅  API Server started: http://${HOST}:${PORT}/api/v1/endpoint`)
);