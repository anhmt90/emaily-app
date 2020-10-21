/**
 * PROD.JS - production keys stored in here!!!
 */

module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOLGE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY, /** 'someRandomStringThatWeCanMAkeUP__ForProduction' */
}