// figure out what set of credentials to return (development vs. production)
if (process.env.NODE_ENV === 'production') {
  // we are in production - return the production set of keys
  module.exports = require('./prod');
} else {
  // we are in development - return the development keys
  module.exports = require('./dev');
}
