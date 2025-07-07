const userModel = require('../models/user.models');
const userService = require('../services/user.services');
const { validationResult } = require('express-validator');





module.exports.registerUser = async (req, res, next) => {

     console.log('Register request body:', req.body);
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
     }

     const { fullname, email, password } = req.body;
     const hashedPassword = await userModel.hashPassword(password);

     const user = await userService.createUser({
          fullname,
          email,
          password: hashedPassword
     });

     const token = await user.generateAuthToken();
     res.status(201).json({ user, token });

}
