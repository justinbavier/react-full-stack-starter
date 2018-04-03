const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');
require('./models/User');
require('./services/passport.js');

// Database Connection
mongoose.connect(keys.mongoURI);

const app = express();

// Middleware
app.use(
  cookieSession({
    // Cookie will last for 30 days before it automatically expires
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // Key used to encrypt cookie. Can provide multiple and cookie session
    // will pick one at random to use for encryption.
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
