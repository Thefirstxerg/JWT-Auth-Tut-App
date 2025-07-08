const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: /.+\@.+\..+/ // Simple email validation
        },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
        },
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});    

userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model('User', userSchema);
