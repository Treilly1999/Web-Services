const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const app = express();

//routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const friendRouter = require('./routes/friends');
const commentRouter = require('./routes/comments');
const threadRouter = require('./routes/threads');
const profileRouter = require('./routes/profile');
const feedRouter = require('./routes/feed');
const searchRouter = require('./routes/searchBar');


//middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'SecureAF'}));

//Authentication
app.use(passport.initialize());
app.use(passport.session());

//use routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);
app.use('/threads', threadRouter);
app.use('/comments', commentRouter);
app.use('/friends', friendRouter);
app.use('/feed', feedRouter);
app.use('/search', searchRouter);
app.use('/', authRouter);

//Connecting to MongoDB database and binding error event
const mongoose = require('mongoose');
const mURL = 'mongodb://localhost:27017/projectDB';
mongoose.connect(mURL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//Connect ensure login makes it so you must be logged in before accessing certain routes. Uses session.
const connectEnsureLogin = require('connect-ensure-login');

app.get('/login',
    (req, res) => res.sendFile('/public/client/login.html', { root: __dirname })
);
app.get('/register',
    (req, res) => res.sendFile('/public/client/register.html', { root: __dirname })
);

app.get('/home',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.sendFile('/public/client/home.html', {root: __dirname})
);

app.get('/discussionBoard',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.sendFile('/public/client/board/discussionBoard.html', {root: __dirname})
);

app.get('/search',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.sendFile('/public/client/search.html', {root: __dirname})
);

app.get('/admin',
    connectEnsureLogin.ensureLoggedIn(),
    function(req, res) {
        if (req.user.userLevel == 2) {
            res.sendFile('/public/client/admin.html', {root: __dirname})
        } else {
            res.redirect('/home');
        }
    }
);

app.get('/threadPagesActual',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.sendFile('/public/client/board/threadPages.html', {root: __dirname})
);

app.get('/threadCreationPage',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.sendFile('/public/client/board/threadCreationPage.html', {root: __dirname})
);

app.get('/friends',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.sendFile('/public/client/profile/friends.html', {root: __dirname})
);

app.get('/friendProfiles',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.sendFile('/public/client/profile/friendProfile.html', {root: __dirname})
);

app.get('/profile',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.sendFile('/public/client/profile/profile.html', {root: __dirname})
);

app.get('/delete',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.sendFile('/public/client/profile/delete.html', {root: __dirname})
);


app.get('/game',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.sendFile('/public/client/game.html', {root: __dirname})
);


app.listen(8080);

module.exports = app;
