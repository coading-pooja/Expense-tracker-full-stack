const User = require("../models/user")
const bcrypt = require("bcrypt")



const signup = async (req, res) => {
  try {
    const signupDetails = req.body;
    console.log(req.body)
    //const user = await User.create({ name:signupDetails.signupName, email:signupDetails.signupEmail, password:signupDetails.signupPassword });
    
    //res.status(201).json(user);

        //ecrypting algo
  const saltRounds = 10; // this decide the level of complexity of the hashcode to be generated. 
        bcrypt.hash(signupDetails.signupPassword, saltRounds, async (err, hash) => {
         await User.create({ name:signupDetails.signupName, email:signupDetails.signupEmail, password:hash});
             console.log(err)
            res.status(201).json("successfully created new user");
        })
      } catch (error) {
  
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
      }

};
const login = async (req, res) => {
  try {
    const loginDetails = req.body;
       console.log(req.body)
    
   

    const existingUser = await User.findOne({
      where: {
        email: loginDetails.loginEmail
      },
    });
  console.log('Login Password:', loginDetails.loginPassword);
console.log('Database Password:', existingUser.password);


    if (existingUser) {

    bcrypt.compare(loginDetails.loginPassword, existingUser.password, (err, result) => {



      if (result) {
          console.log('Credentials are valid');
          res.status(201).json({ message: 'Logged in Sucessfully' });
      }
      else {
          console.log('Credentials are not valid');
          res.status(401).json({ message: 'Password Does Not Match' });
      }
  })
}
else {
  console.log('User Not Found');
  res.status(404).json({ message: 'User Not Found' });
}
}
catch (err) {
//const error = err.parent.sqlMessage;
res.status(404).json({
  error: err
})
}
};

module.exports = {
  signup,
  login
}
