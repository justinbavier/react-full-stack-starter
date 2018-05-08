const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");

const keys = require("./config/keys");
require("./models/User");

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

// Routes

if(process.env.NODE_ENV === 'production') {
  // Express will server up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));
  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
