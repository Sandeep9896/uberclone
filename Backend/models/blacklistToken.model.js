<<<<<<< HEAD
import mongoose from 'mongoose';

const blacklistTokenSchema = new mongoose.Schema({
=======
const mongoose=require('mongoose');

const blacklistTokenSchema=new mongoose.Schema({
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
    token: {
        type: String,
        required: true,
        unique: true // Ensure each token is unique
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1d' // Token will expire after 1 day
    }
});
<<<<<<< HEAD
const blacklistTokenmodel = mongoose.model('BlacklistToken', blacklistTokenSchema);
export default blacklistTokenmodel;
=======
    const blacklistTokenmodel=mongoose.model('BlacklistToken', blacklistTokenSchema);
    module.exports=blacklistTokenmodel;
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
