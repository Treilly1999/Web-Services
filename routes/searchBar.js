const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const User = require('../models/users');
const Thread = require('../models/threads');
const Comment = require('../models/comments');

router.post('/searchPage', connectEnsureLogin.ensureLoggedIn(),
    function(req, res) {
        res.redirect('/search?search_param=' + req.body.searchParam)
    })

//dynamic search for threads/users/comments/feed status'/etc.

router.get('/users/:users',
    connectEnsureLogin.ensureLoggedIn(), function (req, res) {
        User.findOne({username: req.params.users}, function (err, result) {
            if (err) {
                res.send(err);
            }
            if(!result) {
                res.status(404).end();

            } else {
                res.send(result);
            }
        })
    });

router.get('/threads/:thread',
    connectEnsureLogin.ensureLoggedIn(), function (req, res) {
        Thread.findOne({topic: req.params.thread}, function (err, result) {
            if (err) {
                res.send(err);
            }
            if(!result) {
                res.status(404).end();

            } else {
                res.send(result);
            }
        })
    });

module.exports = router;