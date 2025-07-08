/**
 * Authentication Middleware
 * 
 * Middleware for verifying JWT tokens and user authentication.
 * Used to protect routes that require user authentication.
 */

const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

/**
 * JWT Token Verification Middleware
 * Verifies the JWT token from cookies and returns user authentication status
 * @param {Object} req - Express request object containing cookies
 * @param {Object} res - Express response object
 */
module.exports.userVerification = (req, res) => {
  const token = req.cookies.token
  
  // Return false status if no token is provided
  if (!token) {
    return res.json({ status: false })
  }
  
  // Verify the JWT token
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      // Find user by ID from token payload
      const user = await User.findById(data.id)
      if (user) {
        return res.json({ status: true, user: user.username })
      } else {
        return res.json({ status: false })
      }
    }
  })
}