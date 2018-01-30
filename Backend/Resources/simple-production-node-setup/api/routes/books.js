const express = require('express');

const passport = require('../config/passport');
const BooksController = require('../controllers/books');

/* If you would like to have access to the parent route parameters */
const router = express.Router({ mergeParams: true });

/* Use passport.authenticate to restrict route access */
router.post('/', passport.authenticate('jwt', { session: false }), BooksController.createBook);

module.exports = router;