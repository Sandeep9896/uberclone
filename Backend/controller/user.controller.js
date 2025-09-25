import userModel from '../models/user.models.js';
import blacklistTokenModel from '../models/blacklistToken.model.js';
import { createUser } from '../services/user.services.js';
import { validationResult } from 'express-validator';





export const registerUser = async (req, res, next) => {

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

     const user = await createUser({
          fullname,
          email,
          password: hashedPassword
     });

     const token = await user.generateAuthToken();
     res.status(201).json({ user, token });

}

export const loginUser = async (req, res, next) => {

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


     res.status(200).json({ user, token });

}

export const getUserProfile = async (req, res, next) => {
     return res.status(200).json({
          user: req.user,
          message: 'User profile retrieved successfully'
     });

}
export const logoutUser = async (req, res, next) => {
     const token = req.headers.authorization?.split(' ')[1];
     if (!token) {
          return res.status(401).json({ message: "Unauthorized access" });
     }

     // Add the token to the blacklist
     await blacklistTokenModel.create({ token });

     // Clear the cookie
     res.clearCookie('token');

     return res.status(200).json({ message: 'Logged out successfully' });
}

export const auth = async (req, res, next) => {
     return res.status(200).json({
          message: 'User authenticated successfully'
     });
}