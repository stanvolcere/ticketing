// this file will change one option to poll file changes every 300 ms - this is in an effort to
// address the issue where sometimes file changes are not picked up by next.js
module.exports = {
    webpackDevMiddleware: config => {
        config.watchOptions.poll = 300;
        return config;
    }
}