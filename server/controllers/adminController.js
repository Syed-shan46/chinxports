module.exports.passwordSubmit = (req, res) => {
    const { password } = req.body;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (password === ADMIN_PASSWORD) {
        req.session.adminAuthenticated = true;
        return res.status(200).json({
            success: true,
            message: "Login success"
        });
    } else {
        return res.status(401).json({
            success: false,
            message: "Incorrect password"
        });
    }
};
