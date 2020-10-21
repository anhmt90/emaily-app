const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
/**
 * BE AWARE: Order of require statements can result in errors
 */
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

/**
 * generate a single-app (can be a multiple-app project)
 * 
 * 2 major topics of express is: Middleware & Route Handlers
 */
const app = express();

/**
 * MIDDLEWARE
 * 
 * Set up cookie for auth by injecting 3 middlewarees for pre-processing incoming requests
 * To grasp more about wiring up middlewares into Express, watch vid 4.17 again
 * 
 * cookieSession will extract cookie data from incoming requests and attaches an 'session' object 
 * to req object (req.session). For auth, req.session contains the id of user model instance in
 * mongodb (the __id of mongo object). Next, passport will take req.session and pulls out this 
 * mongodb user id to feed it into the deserializeUser() function. After this being deserialized, 
 * we'll get back the user object attached to req object (req.user)
 */
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

/**
 * Run the routes defined in './routes/auth-routes'
 */
require('./routes/auth-routes')(app);

/**
 * 1. Listen to a dynamic port that Heroku will give us at runtime
 */
const PORT = process.env.PORT || 8080;
app.listen(PORT);

/**
 * 2. Tell Heroku to use a specific version of node (in package.json)
 */

/**
 * 3. Instruct Heorku what command to run to start our server ("start" script in package.json)
 */



