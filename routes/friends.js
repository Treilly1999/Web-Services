var express = require('express');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const User = require('../models/users');

router.post('/friendRequest', connectEnsureLogin.ensureLoggedIn(), function(req, res) {

    if(req.user.username == req.body.username)
    {
        var err = "Cannot add yourself as a friend."
        res.redirect('/friends?info=' + err);
    }
    else {
        User.findOne({username: req.body.username}, function (err, result) {
            if (err) {
                res.send(err);
            }
            if(!result) {
                var info = "That user does not exist."
                res.redirect('/friends?info=' + info)
            } else {
                User.requestFriend(req.user._id, result._id, function (err, friendships) {
                    res.redirect('/friends')
                })

            }
        })
    }


})

router.post('/friendAccept/:id', connectEnsureLogin.ensureLoggedIn(), function(req, res) {

    User.requestFriend(req.user._id, req.params.id, function(err, friendships) {
        res.redirect('/friends')
    })
})

router.post('/friendRemove/:id', connectEnsureLogin.ensureLoggedIn(), function(req, res) {

    User.findById(req.params.id, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            User.removeFriend(req.user, result, function (err, friendships) {
                res.redirect('/friends')
            })
        }
    })

})

router.get('/getFriendStatus', connectEnsureLogin.ensureLoggedIn(), function(req, res) {

    User.getFriends(req.user, function(err, result) {
        if(err) {
            res.send(err);
        }
        else{
            res.send(result);
        }
    })

})


module.exports = router;
