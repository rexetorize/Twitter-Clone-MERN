class AuthVerification{

     ensureAuthenticated = (req, res, next) => {
        if(req.isAuthenticated()){
    
            return res.redirect(process.env.FRONTEND_URL);
        }
        next();
    }
    
     checkAuth = (req, res, next) => {
        if(!req.isAuthenticated()){
            return res.status(401).json({isAuth: false});
        }
        next();
    }
}

module.exports = new AuthVerification();