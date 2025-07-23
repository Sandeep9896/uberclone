import userModel from '../models/user.models.js';
import blacklistTokenModel from '../models/blacklistToken.model.js';

export const createUser = async ({
    fullname,
    email,
    password,
}) => {
    if (!fullname || !email || !password) {
        throw new Error('All fields are required');
    }
    const user = await userModel.create({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email,
        password,
    });
    return user;
};

export const blacklistToken = async (token) => {
    const blacklistToken = await blacklistTokenModel.create({ token });
    await blacklistToken.save();
    return blacklistToken;
};