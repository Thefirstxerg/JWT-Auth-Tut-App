const { SignUp } = require('../Controllers/AuthController');
const { userVerification } = require('../Middlewares/AuthMiddleware');
const router = require('express').Router();

router.post('/signup', SignUp);
router.post('/', userVerification)

module.exports = router;