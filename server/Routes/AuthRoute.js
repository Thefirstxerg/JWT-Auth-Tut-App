/**
 * Authentication Routes
 * 
 * Defines all authentication-related routes for the application.
 * Routes:
 * - POST /signup - User registration
 * - POST /login - User authentication  
 * - POST / - JWT token verification
 */

const { SignUp, Login } = require('../Controllers/AuthController');
const { userVerification } = require('../Middlewares/AuthMiddleware');
const router = require('express').Router();

// User registration route
router.post('/signup', SignUp);

// User login route
router.post('/login', Login);

// Token verification route
router.post('/', userVerification);

module.exports = router;