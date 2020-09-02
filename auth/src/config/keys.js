// on heroku the NODE_ENV property will always be set to production
if (process.env.NODE_ENV === 'production') {
    //return prod keys
    module.exports = require('./prod');
} else {
    // return the dev keys
    module.exports = require('./dev');
}