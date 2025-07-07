const userModel = require('../models/user.models');

module.exports.createUser = async ({
    fullname,
    email,
    password,
}) => {
    if (!fullname || !email || !password) {
        throw new Error('All fields are required');
    }
    const user = await userModel.create({ // <-- add await here
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email,
        password,
    });
    return user;
}