var express = require('express');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const Thread = require('../models/threads');
const Comment = require('../models/comments');

router.get('/individualThread/:id',
    connectEnsureLogin.ensureLoggedIn(), function(req, res) {
        Thread.findById(req.params.id, function(err, result) {
            if(err) {res.send(err);}
            else{res.send(result);}
        })

    }
);

router.get('/threadPages/:id',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.redirect('/threadPagesActual?id=' + req.params.id)
);

router.get('/threads',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
        Thread.find({}, function(err, result) {
            if(err) {res.send(err);}
            else {res.send(result);}
        })
    });



//creates a thread
router.post('/createThread', function(req, res) {

    connectEnsureLogin.ensureLoggedIn()
    const newThread = new Thread({
        topic: req.body.topic,
        author: req.user.username,
        userID: req.user._id,
        body: req.body.text,
        posted: new Date()
    })



    //save thread to collection
    newThread.save(function (err, thread) {
        if(err) throw err;
        console.log(newThread.author + " created a thread about " + newThread.topic)
        res.redirect('/discussionBoard');
    })
})

//delete thread using obj id
router.post('/deleteThread/:id', function(req, res) {

    connectEnsureLogin.ensureLoggedIn()
    const comments = req.params.id;
    //When thread is deleted, so are all comments part of it
    Comment.deleteMany({threadID: comments})
        .exec()
        .then(doc => {
            if(!doc) {console.log('Something went wrong when deleting thread with no comments.')}
        });

    //delete thread
    Thread.findByIdAndRemove(req.params.id)
        .exec()
        .then(doc => {
            if (!doc) {return res.status(404).end(); }
            return res.status(204).redirect('/discussionBoard').end();
        })
        .catch(err => next(err));

})



module.exports = router;
