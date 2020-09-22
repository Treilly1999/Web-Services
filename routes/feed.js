var express = require('express');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const User = require('../models/users');
const Feed = require('../models/mainFeed');


router.get('/feed/:id',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
               Feed.find({userID: req.params.id}, function(err, result) {
                   if(err) {res.send(err);}
                   if(!result) {res.end()}
                   else {res.send(result);}
               })
    });

router.get('/feed/',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
        Feed.find({userID: req.user._id}, function(err, result) {
            if(err) {res.send(err);}
            if(!result) {res.end()}
            else {res.send(result);}
        })
    });

//creates a thread
router.post('/createFeed', function(req, res) {

    connectEnsureLogin.ensureLoggedIn()
    const newFeed = new Feed({
        author: req.user.username,
        userID: req.user._id,
        body: req.body.body,
        posted: new Date()
    })



    //save thread to collection
    newFeed.save(function (err, thread) {
        if(err) throw err;
        console.log(newFeed.author + " created a feed about " + newFeed.topic)
        res.redirect('/home');
    })
})

//delete thread using obj id
router.post('/deleteFeed/:id', function(req, res) {

    connectEnsureLogin.ensureLoggedIn();
    // const comments = req.params.id;
    //When thread is deleted, so are all comments part of it
    // Comment.deleteMany({threadID: comments})
    //     .exec()
    //     .then(doc => {
    //         if(!doc) {console.log('Something went wrong when deleting thread with no comments.')}
    //     });

    //delete feed
    Feed.findByIdAndRemove(req.params.id)
    .exec()
    .then(doc => {
        if (!doc) {return res.status(404).end(); }
        return res.status(204).redirect('/home').end();
    })
    .catch(err => next(err));





})


module.exports = router;
