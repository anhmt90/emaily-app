module.exports = (req, res, next) => {
    /**
     * Guard against when user doesn't have the minimum credits to access this route
     */
    if (req.user.credits < 1) {
        return res.status(403).send({ error: 'Not enough credits!' });
    }

    next();
}