const mongoose = require('mongoose');

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    email: String,
    password: String
}));
// Delete all documents in the User collection
async function deleteAllUsers() {
    try {
        const deleteResult = await User.deleteMany({});
        console.log(`${deleteResult.deletedCount} documents deleted`);
    } catch (error) {
        console.error('Error deleting documents:', error);
    } finally {
        mongoose.connection.close();
    }
}

deleteAllUsers();
