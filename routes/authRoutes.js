const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email'],
    }));

    /**
     * Redirect the request to GoogleStrategy for authentication, however, when the auth is 
     * finished, the passport.authenticate() middleware still has no idea what to do next with
     * the request, that's why we get a "Cannot GET /auth/google/callback" error message after 
     * being logged in. 
     * Solution: chain on another route handler to the /auth/google/callback here
     */
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    // app.get('/surveys', (req, res) => {
    //     res.redirect('/surveys');
    // });

    /**
     * Beside user property, passport also attaches a couple of other functions to req object,
     * one of them is logout()
     */
    app.get('/api/logout', (req, res) => {
        /**
         * purges the user id in req, so passport no longer knows who is the user anymore
         */
        req.logout();
        res.redirect('/');
    });
    /**
     * Thanks to cookieSession and passport, req is now attached with a user propterty, which 
     * is the user deserialized from the cookies
     */
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};