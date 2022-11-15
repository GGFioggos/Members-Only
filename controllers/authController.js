const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

exports.log_in_get = (req, res, next) => {
    if (!req.user) {
        res.render('log_in', {
            title: 'Log in',
        });
    } else {
        res.redirect('/');
    }
};

exports.log_in_post = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
});

exports.sign_up_get = (req, res, next) => {
    res.render('sign_up', { title: 'Sign Up' });
};

exports.sign_up_post = [
    body('first_name')
        .trim()
        .escape()
        .isLength({ min: 3 })
        .withMessage('First name must be at least 3 characters long.')
        .isLength({ max: 15 })
        .withMessage('First name must be max 15 characters long.'),
    body('last_name', 'Last name must be provided.')
        .trim()
        .escape()
        .isLength({ min: 3 })
        .withMessage('Last name must be at least 3 characters long.')
        .isLength({ max: 15 })
        .withMessage('Last name must be max 15 characters long.'),
    body('user_name', 'Username must be provided.')
        .trim()
        .escape()
        .isLength({ min: 5 })
        .withMessage('User name must be at least 5 characters long.')
        .isLength({ max: 20 })
        .withMessage('User name must be max 20 characters long.'),
    body('password', 'password must be provided.')
        .trim()
        .escape()
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters long.')
        .isLength({ max: 20 })
        .withMessage('Last name must be max 20 characters long.'),
    body(
        'password_confirm',
        'Password confirm must have the same vlaue as the password field.'
    )
        .exists()
        .custom((value, { req }) => value === req.body.password),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('sign_up', {
                title: 'Sign up',
                user: req.body,
                errors: errors.array(),
            });
            return;
        }

        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) {
                return next(err);
            }

            const user = new User({
                firstname: req.body.first_name,
                lastname: req.body.last_name,
                username: req.body.user_name,
                password: hashedPassword,
            }).save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    },
];
