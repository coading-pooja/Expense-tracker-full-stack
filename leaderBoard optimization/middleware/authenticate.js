const jwt = require('jsonwebtoken');
const User = require('../models/user');
// this is a middleware that we have created to check who the user is. 
const authenticate = (req,res,next) =>{
    console.log(req.body,req.header)
    try{
        const token = req.header('Authorization');
        console.log(token);
        const user = jwt.verify(token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsIm5hbWUiOiJ2cml0dGkiLCJpYXQiOjE2OTU3MjQ1MjJ9.rd0kbNwNs6CBecUx20vDSfKMSA0rVYK8nPxhY3Mu-kc"); //decrpting the secret key
        console.log('id--> ',user);
        User.findByPk(user.id)
            .then(user=>{
                req.user = user; // we are attaching the user object to the request so that the next middle ware that  is the controller middle ware of expense will be able to know that whose expense to show in UI. 
                console.log("Authn is working ");
                next();
                
            })
            .catch(err => {
                console.log(err);
            })
    }
    catch(err){
        console.log(err);
        res.status(401);
    }
}

module.exports = {
    authenticate
}