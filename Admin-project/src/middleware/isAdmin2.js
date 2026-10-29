exports.isAdmin2 = (req , res, next) => {

    if(req.user && req.user.role === "admin"){
        return next();
    }

    return res.status(403).json({
        success:false,
        message:"Acces denied.Admin only"
    })


}