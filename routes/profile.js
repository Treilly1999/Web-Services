var express = require('express');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const User = require('../models/users');
const Thread = require('../models/threads');
const Comment = require('../models/comments');

router.get('/friendProfile/:id',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.redirect('/friendProfiles?id=' + req.params.id)
);

router.get('/getFriend/:id',
    connectEnsureLogin.ensureLoggedIn(), function(req, res) {
        User.findById(req.params.id, function(err, result) {
            if(err) {res.send(err);}
            else{res.send(result);}
        })

    }
);

router.get('/getFriendThreadHistory/:id',
    connectEnsureLogin.ensureLoggedIn(), function(req, res) {
        Thread.findOne({userID: req.params.id}, function (err, result) {
            if (err) {
                res.send(err);
            }
            if(!result) {
                res.status(404).end();

            } else {
                Thread.find({userID: req.params.id}, function(err, result2) {
                    if(err) {
                        res.send(err);
                    } else {
                        res.send(result2);
                    }
                })
            }
        })

    }
);

router.get('/getFriendCommentHistory/:id',
    connectEnsureLogin.ensureLoggedIn(), function(req, res) {

        Comment.findOne({userID: req.params.id}, function (err, result) {
            if (err) {
                res.send(err);
            }
            if(!result) {
                res.status(404).end();

            } else {
                Comment.find({userID: req.params.id}, function(err, result2) {
                    if(err) {
                        res.send(err);
                    } else {
                        res.send(result2);
                    }
                })
            }
        })

    }
);

router.post('/deleteAccount', connectEnsureLogin.ensureLoggedIn(), function(req, res) {

    console.log("Im so smart");

    User.findByIdAndRemove(req.user.id)
        .exec()
        .then(doc => {
            if (!doc) {return res.status(404).end(); }
            return res.status(204).redirect('/').end();
        })
        .catch(err => next(err));

})

router.post('/updateUsername', function(req, res) {
    connectEnsureLogin.ensureLoggedIn(),
        User.findByIdAndUpdate(req.user.id, {'username': req.body.username}, function(err, result) {
            if(err) throw err
            console.log(req.user.id + " updated.");
            res.redirect('/profile');
        })
})

router.post('/updateEmail', function(req, res) {
    connectEnsureLogin.ensureLoggedIn(),
        User.findByIdAndUpdate(req.user.id, {'email': req.body.email}, function(err, result) {
            if(err) throw err
            console.log(req.user.id + " updated.");
            res.redirect('/profile');
        })
})

router.post('/updatePassword', function(req, res) {
    connectEnsureLogin.ensureLoggedIn(),
        User.findById(req.user.id).then(function(sanitizedUser) {
            if(sanitizedUser) {
                sanitizedUser.setPassword(req.body.password, function(){
                    sanitizedUser.save();
                    res.redirect('/logout').status(200);
                });
            } else {
                console.log('User does not exist.')
                res.status(404);
            }
        }), function(err) {
        console.log(err);
    }
})



module.exports = router;
