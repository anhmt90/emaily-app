module.exports = (req, res, next) => {
    /**
     * Guard against when user accesses the authorized routes without being logged in
     */
    if (!req.user) {
        return res.status(401).send({ error: 'You must login!' });
    }

    next();
}