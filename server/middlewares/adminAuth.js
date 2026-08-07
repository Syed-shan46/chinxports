// middlewares/adminAuth.js
module.exports = (req, res, next) => {
    // TEMPORARILY DISABLED FOR TESTING
    return next();

    /* 
    if (req.session && req.session.adminAuthenticated) {
        return next();
    }
    return res.status(401).json({ message: "Unauthorized: Admin access required" });
    */
};
