<<<<<<< HEAD
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
    },
=======
const mongoose=require('mongoose');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({

    fullname: {
        firstname:{
            type:String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastname:{
            type:String,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
    }, 
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
    email: {
        type: String,
        required: true,
        unique: true,
    },
<<<<<<< HEAD
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    socketId: {
        type: String,
    }
});
=======
    password:{
        type: String,
        required: true,
        select: false, // Exclude password from queries by default
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    socketId:{
        type: String,
    
    }

})
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
}

userSchema.methods.comparePassword = async function (candidatePassword) {
    const user = this;
    const isMatch = await bcrypt.compare(candidatePassword, user.password);
    return isMatch;
}

userSchema.statics.hashPassword = async function (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

const userModel = mongoose.model('user', userSchema);
<<<<<<< HEAD
export default userModel;
=======
module.exports = userModel;
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
