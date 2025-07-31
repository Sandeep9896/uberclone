<<<<<<< HEAD
import mongoose from 'mongoose';

=======
const  mongoose = require('mongoose');
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
}
<<<<<<< HEAD
export default connectDB;
=======
module.exports = connectDB;
// This code connects to a MongoDB database using Mongoose. It exports the connectDB function, which can be called to establish the connection. The connection string is taken from the environment variable MONGO_URI, and it logs success or error messages accordingly.
// Make sure to set the MONGO_URI environment variable in your .env file or your environment before running this code. For example, you can set it to `mongodb://localhost:27017/uberclone` for a local MongoDB instance.
// You can also use a cloud MongoDB service like MongoDB Atlas by providing the appropriate connection
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
