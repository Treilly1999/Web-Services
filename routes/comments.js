var express = require('express');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const Comment = require('../models/comments');

//post comment
router.post('/postComment/:id', connectEnsureLogin.ensureLoggedIn(), function(req, res) {

    const newComment= new Comment({
        author: req.user.username,
        threadID: req.params.id,
        userID: req.user._id,
        text: req.body.text,
        posted: new Date()
    });

    newComment.save(function (err, thread) {
        if(err) throw err;
        console.log(newComment.author + " has commented about " + req.params.id)
        res.redirect('/threadPagesActual?id=' + req.params.id);
    })
})

//edit comment
router.post('/editComment/:threadID/:commentID', function(req, res) {
    connectEnsureLogin.ensureLoggedIn(),
        Comment.findByIdAndUpdate(req.params.commentID, {'text': req.body.text}, function(err, result) {
            if(err) throw err
            console.log(req.user.id + " edited comment " + req.body._id);
            res.redirect('/threadPagesActual?id=' + req.params.threadID);
        })
})

//retrieve all comments for a threadID
router.get('/comments/:id',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
        Comment.find({threadID: req.params.id}
            , function(err, result) {
                if(err) {res.send(err);}
                else {res.send(result);}
            })
    });

//Delete comment from thread using threadID to redirect back to thread page and comment id to delete
router.post('/deleteComment/:id/:threadID', connectEnsureLogin.ensureLoggedIn(), function(req, res) {
    Comment.findByIdAndRemove(req.params.id)
        .exec()
        .then(doc => {
            if (!doc) {return res.status(404).end(); }
            return res.status(204).redirect('/threadPagesActual?id=' + req.params.threadID).end();
        })
        .catch(err => next(err));

})



module.exports = router;
