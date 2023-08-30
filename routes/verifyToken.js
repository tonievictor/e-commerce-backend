const jwt = require("jsonwebtoken");
const response = require("../utility/response.js");

//UPDATE USER INFORMATION
const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token
    if(authHeader) {
         const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
            if(err) res.status(403).json("Invalid Token!");
            req.user = user;
            next();
        })
    } else{
        return response(res, 401, false, "You are not allowed to do this");
    }
};


const verifyTokenAndAuthorization = (req,res,next) => {
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }else{
            response(res, 403, false, "You are not allowed to do this");
        }
    });
};


const verifyTokenAndAdmin = (req,res,next) => {
    verifyToken(req,res,()=>{
        if(req.user.isAdmin) {
            next();
        } else{
            response(res, 403, false, "You are not allowed to do this");
        }
    });
};

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
