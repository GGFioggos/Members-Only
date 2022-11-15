var express = require('express');
var router = express.Router();

const authController = require('../controllers/authController');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Homepage', user: req.user });
});

router.get('/log-out', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/log-in', authController.log_in_get);

router.post('/log-in', authController.log_in_post);

router.get('/sign-up', authController.sign_up_get);

router.post('/sign-up', authController.sign_up_post);

module.exports = router;
