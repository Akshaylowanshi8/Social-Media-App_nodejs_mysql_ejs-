// Middleware to check if the user is logged in
const isAuthenticated = (req, res, next) => {
    if (req.session.loggedIn) {
        return next(); 
    } else {
        res.redirect('/home'); // User is not authenticated, redirect to login page
    }
};

module.exports = {
    isAuthenticated
};
