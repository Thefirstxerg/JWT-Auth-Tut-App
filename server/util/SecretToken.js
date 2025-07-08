/**
 * JWT Secret Token Utility
 * 
 * Utility module for creating and managing JWT tokens.
 * Used for user authentication and session management.
 */

require("dotenv").config();
const jwt = require("jsonwebtoken");

/**
 * Creates a JWT token for user authentication
 * @param {string} id - User ID to encode in the token
 * @returns {string} - Signed JWT token
 */
module.exports.createSecretToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_KEY, {
        expiresIn: 3 * 24 * 60 * 60, // Token expiration time: 3 days in seconds
    });
};
