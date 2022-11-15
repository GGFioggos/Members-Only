var express = require('express');
var router = express.Router();

const signUpController = require('../controllers/signUpController');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/sign-up', function (req, res, next) {
    res.render('sign_up', { title: 'Sign Up' });
});

router.post('/sign-up', signUpController.sign_up);

module.exports = router;
