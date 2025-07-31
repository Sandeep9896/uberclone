<<<<<<< HEAD
import userModel from '../models/user.models.js';
import blacklistTokenModel from '../models/blacklistToken.model.js';

export const createUser = async ({
=======
const userModel = require('../models/user.models');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.createUser = async ({
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
    fullname,
    email,
    password,
}) => {
    if (!fullname || !email || !password) {
        throw new Error('All fields are required');
    }
<<<<<<< HEAD
    const user = await userModel.create({
=======
    const user = await userModel.create({ // <-- add await here
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email,
        password,
    });
    return user;
<<<<<<< HEAD
};

export const blacklistToken = async (token) => {
    const blacklistToken = await blacklistTokenModel.create({ token });
    await blacklistToken.save();
    return blacklistToken;
};
=======
}

module.exports.blacklistToken = async (token) => {
    const blacklistToken = await blacklistTokenModel.create({ token });
    await blacklistToken.save();
    return blacklistToken;
}
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
