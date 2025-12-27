
const { validateToken } = require("../services/authentication");

function checkForAuthentication(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue=req.cookies[cookieName];
        if(!tokenCookieValue) {
           return next()
        }
        try {
            const Userpayload=validateToken(tokenCookieValue);
            req.user=Userpayload;
        } catch (error) {}
  
       return next();
    }
}

module.exports={
    checkForAuthentication,
}