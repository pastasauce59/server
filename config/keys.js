// figure out what set of credentials to return

if (process.env.NODE_ENV === 'production'){
    // in production - return prod set of keys
    module.exports = require('./prod')
} else {
    // in development - return dev keys
   module.exports = require('./dev')
} 