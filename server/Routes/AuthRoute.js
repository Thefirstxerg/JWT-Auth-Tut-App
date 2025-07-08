const { SignUp } = require('../Controllers/AuthController');
const router = require('express').Router();

router.post('/signup', SignUp);

module.exports = router;