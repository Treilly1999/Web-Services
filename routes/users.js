var express = require('express');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

router.get('/user',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.send({user: req.user})
);


module.exports = router;
