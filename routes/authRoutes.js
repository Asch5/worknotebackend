const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const loginLimiter = require('../middleware/loginLimiter');
// const setHeaders = require('../middleware/setHeaders');

// router.use(setHeaders);

// router.options('*', (req, res) => {
//     console.log('preflight');
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header(
//         'Access-Control-Allow-Methods',
//         'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
//     );
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.sendStatus(204);
// });

router.route('/').post(loginLimiter, authController.login);

router.route('/refresh').get(authController.refresh);

router.route('/logout').post(authController.logout);

module.exports = router;
