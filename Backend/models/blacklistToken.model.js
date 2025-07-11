const mongoose=require('mongoose');

const blacklistTokenSchema=new mongoose.Schema({
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
    const blacklistTokenmodel=mongoose.model('BlacklistToken', blacklistTokenSchema);
    module.exports=blacklistTokenmodel;