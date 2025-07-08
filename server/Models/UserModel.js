/**
 * User Model - MongoDB Schema
 * 
 * Defines the user data structure and validation rules for MongoDB.
 * Features:
 * - Email validation and uniqueness
 * - Password length validation and automatic hashing
 * - Username requirement
 * - Automatic timestamp creation
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User schema definition with validation rules
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: /.+\@.+\..+/ // Simple email validation regex
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

/**
 * Pre-save middleware to hash password before storing in database
 * Automatically encrypts the password using bcrypt before saving
 */
userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model('User', userSchema);
