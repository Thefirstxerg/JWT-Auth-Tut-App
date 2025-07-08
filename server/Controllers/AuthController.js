/**
 * Authentication Controller
 * 
 * Handles all authentication-related business logic.
 * Functions:
 * - SignUp: Creates new user accounts with encrypted passwords
 * - Login: Authenticates existing users and generates JWT tokens
 */

const User = require('../Models/UserModel');
const { createSecretToken } = require('../util/SecretToken');
const bcrypt = require('bcryptjs');

/**
 * User Registration Handler
 * Creates a new user account with hashed password and JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.SignUp = async (req, res, next) => {
    try {
        const { email, password, username, createdAt } = req.body;

        // Check if user already exists with this email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user (password will be hashed by mongoose pre-save hook)
        const user = await User.create({
            email,
            password,
            username,
            createdAt: createdAt || Date.now(),
        });

        // Generate JWT token for the new user
        const token = createSecretToken(user._id);
        
        // Set token as HTTP-only cookie
        res.cookie('token', token, {
            withCredentials: true,
            httpOnly: true,
        });

        res.status(201)
        .json({ message: 'User created successfully', success: true, user});
    next();
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

/**
 * User Login Handler
 * Authenticates user credentials and generates JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Validate required fields
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }

    // Find user by email
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email' }) 
    }

    // Verify password using bcrypt
    const auth = await bcrypt.compare(password, user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }

    // Generate JWT token for authenticated user
    const token = createSecretToken(user._id);
    
    // Set token as cookie
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(201).json({ message: "User logged in successfully", success: true });
    next()
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
}
