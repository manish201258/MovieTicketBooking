const jwt = require('jsonwebtoken')
const user = require('../models/user-model')
const userMiddleware = async(req,res,next) =>{
    const token = req.header('Authorization');

    if(!token){
        return res
        .status(401)
        .json({mes:"Token not provided"})
    }
    
    

    try {
        const jwtToken = token.replace("Bearer","").trim()
        const isVerified = jwt.verify(jwtToken,process.env.SECRET_KEY)


                                                                    // its is projection
        const userData = await user.findOne({email:isVerified.email}).select({password:0})
        res.json({userData})
// these are custom properties.
        req.user = userData;
        req.token = token;
        req.userID = userData._id;
        
    } catch (error) {
        return res.status(401).json({msg:"invalid token"})
    }
    next()
};


module.exports = userMiddleware;