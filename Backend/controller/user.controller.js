const userModel = require('../models/user.models');
const blacklistTokenModel = require('../models/blacklistToken.model');
const userService = require('../services/user.services');
const { validationResult } = require('express-validator');






module.exports.registerUser = async (req, res, next) => {

     console.log('Register request body:', req.body);
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
     }

     const { fullname, email, password } = req.body;
  const existingUser= await userModel.findOne({email}).select('+password');
     if (existingUser) {
          return res.status(400).json({ error: 'User already exists' });
     }


     const hashedPassword = await userModel.hashPassword(password);

     const user = await userService.createUser({
          fullname,
          email,
          password: hashedPassword
     });

     const token = await user.generateAuthToken();
     res.status(201).json({ user, token });

}

module.exports.loginUser = async (req, res, next) => {

     console.log('Login request body:', req.body);
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
     }

     const { email, password } = req.body;
     const user = await userModel.findOne({email}).select('+password');

     if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
     }

     const isMatch = await user.comparePassword(password);
     if (!isMatch) {
          return res.status(401).json({ error: 'Invalid credentials' });
     }

     const token = await user.generateAuthToken();

     // Set the token in a cookie
     res.cookie('token', token )


     res.status(200).json({ user, token });

}

module.exports.getUserProfile = async (req, res, next) => {
     return res.status(200).json({
          user: req.user,
          message: 'User profile retrieved successfully'
     });

}
module.exports.logoutUser = async (req, res, next) => {
     const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
     if (!token) {
          return res.status(401).json({ message: "Unauthorized access" });
     }

     // Add the token to the blacklist
     await blacklistTokenModel.create({ token });

     // Clear the cookie
     res.clearCookie('token');

     return res.status(200).json({ message: 'Logged out successfully' });
}