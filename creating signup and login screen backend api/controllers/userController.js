const User = require("../models/user")


const signup = async (req, res) => {
  try {
    const signupDetails = req.body;
    console.log(req.body)
    const user = await User.create({ name:signupDetails.signupName, email:signupDetails.signupEmail, password:signupDetails.signupPassword });
    
    res.status(201).json(user);
  } catch (error) {
  
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

const login  = async (req, res) => {
  try {
    const loginDetails = req.body;
    console.log(req.body)
     const existingUser = await User.findOne({
      where: {
          email: loginDetails.loginEmail, // Specify the condition to match the email field
      }
     })
     console.log(existingUser)
     res.status(201).json(existingUser);
  } catch (error) {
  
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
module.exports = {
  signup,
  login
}


