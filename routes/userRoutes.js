const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const verifyJWT = require('../middleware/verifyJWT');
const setHeaders = require('../middleware/setHeaders');

router.use(verifyJWT);
router.use(setHeaders);

router.options('*', (req, res) => {
    console.log('preflight users');
    res.header('Access-Control-Allow-Origin', 'https://worknotes.onrender.com');
    res.header(
        'Access-Control-Allow-Methods',
        'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
    );
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(204);
});

router
    .route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser);

module.exports = router;
