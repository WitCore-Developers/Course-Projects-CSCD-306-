const verify = (req,res,next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/user/login") 
}


module.exports = verify;
