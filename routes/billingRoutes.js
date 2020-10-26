const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    /**
     * add in the middleware requireLogin to run it before forwarding the request to the callback
     * 
     * Note that, requireLogin is not invoked, just being passed in the reference to function for 
     * express to run whenever a request comes in
     * 
     * Actually app.get(), app.post() and the likes can takes an arbitrary amount of functions
     * as long as one of those functions has to process the request and send back the response.
     * 
     */
    app.post('/api/stripe', requireLogin, async (req, res) => {
        const token = req.body.id;

        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: token,
        });



        req.user.credits += 5;
        const user = await req.user.save();
        res.send(user);

    });
};