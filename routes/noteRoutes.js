const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const verifyJWT = require('../middleware/verifyJWT');
// const setHeaders = require('../middleware/setHeaders');

router.use(verifyJWT);

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

router
    .route('/')
    .get(notesController.getAllNotes)
    .post(notesController.createNewNote)
    .patch(notesController.updateNote)
    .delete(notesController.deleteNote);

module.exports = router;
