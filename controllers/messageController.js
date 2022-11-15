const { body, validationResult } = require('express-validator');
const Message = require('../models/Message');

exports.message_create_get = (req, res, next) => {
    if (req.user) {
        res.render('message_create', {
            title: 'Create a message',
            user: req.user,
        });
    } else {
        res.redirect('/');
    }
};

exports.message_create_post = [
    body('title', 'Message must have a title')
        .trim()
        .escape()
        .notEmpty()
        .isLength({ max: 20 })
        .withMessage('Message title must not exceed 20 characters'),
    body('message', 'Message text is mandatory')
        .trim()
        .escape()
        .notEmpty()
        .isLength({ max: 150 })
        .withMessage('Message text must not exceed 150 characters'),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('message_create', {
                title: 'Create a message',
                message: req.body,
                errors: errors.array(),
            });
            return;
        }

        const message = new Message({
            author: req.user,
            title: req.body.title,
            text: req.body.message,
            timestamp: new Date(),
        }).save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    },
];
