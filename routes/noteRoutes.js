const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const verifyJWT = require('../middleware/verifyJWT');
//const setHeaders = require('../middleware/setHeaders');

router.use(verifyJWT);
//router.use(setHeaders);

router
    .route('/')
    .get(notesController.getAllNotes)
    .post(notesController.createNewNote)
    .patch(notesController.updateNote)
    .delete(notesController.deleteNote);

module.exports = router;
