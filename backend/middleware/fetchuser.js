let jwt = require('jsonwebtoken');
let     JWT_SECRET = 'dhruvangisgood';

const fetchuser = async (req, res, next)=>{

    //Get the userfrom the jwt token and add id to request.
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error : "Please authenticate using valid token"});
    }
    try{
        const verified =await jwt.verify(token, JWT_SECRET);
        req.user = verified.user;
        next();
    }
    catch (e) {
        res.status(401).send({error : "Please authenticate using valid token...",message: e.message});
    }
}

module.exports = fetchuser;