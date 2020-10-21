const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email'],
    }));

    app.get('/auth/google/callback', passport.authenticate('google'));

    /**
     * Beside user property, passport also attaches a couple of other functions to req object,
     * one of them is logout()
     */
    app.get('/api/logout', (req, res) => {
        /**
         * purges the user id in req, so passport no longer knows who is the user anymore
         */
        req.logout();
        res.send(req.user);
    });
    /**
     * Thanks to cookieSession and passport, req is now attached with a user propterty, which 
     * is the user deserialized from the cookies
     */
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};