const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const loginLimiter = require('../middleware/loginLimiter');
//const setHeaders = require('../middleware/setHeaders');

//router.use(setHeaders);

router.route('/').post(loginLimiter, authController.login);

router.route('/refresh').get(authController.refresh);

router.route('/logout').post(authController.logout);

module.exports = router;
