const passport = require('passport');
const User = require('../models/users');
const express = require('express');
const router = express.Router();
const LocalStrategy = require('passport-local');
const connectEnsureLogin = require('connect-ensure-login');

//passport strategy auto created by mongoose plugin
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//-------Login/Registration----------

router.post('/login', (req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.redirect('/login?info=' + info);
            }

            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                //res.cookie(req.body.username, Math.random()*100, {maxAge: 600000000, httpOnly: true});
                return res.redirect('/home');
            });

        })(req, res, next);
});

router.post('/register', function(req, res) {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            birthday: req.body.birthday
        });
        User.register(newUser, req.body.password, function(err, user) {
            if(err) {
                console.log(err);
                res.redirect('/register');
            }
            passport.authenticate('local')(req, res, function(){
                res.redirect('/Home');
            })
        })
    }
)

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/')
})


//-------Login/Registration----------

//------Profile-Picture-Testing-----


const Image = require('../models/images');

const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: "treilly",
    api_key: "685531839867661",
    api_secret: "ezY_e8drqTB9a7w-HI_Hs_u1qzQ"
});
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "images",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage });

router.post('/api/images', parser.single("image"), (req, res) => {
    console.log(req.file) // to see what is returned to you
    const image = {};
    image.url = req.file.url;
    image.id = req.file.public_id;
    image.userID = req.user._id;
        
    Image.create(image) // save image information in database
        .then(res.redirect('/profile'))
        .catch(err => console.log(err));
});

router.get('/getImage/:userID', function(req, res) {
    Image.findOne({userID: req.params.userID}, function (err, result) {
        if (err) {
            res.send(err);
        }
        if(!result) {
            var info = "No image."
            res.redirect('/profile?info=' + info)
        } else {
            res.json(result);
        }


    })
} )

//----------------------------------

module.exports = router;