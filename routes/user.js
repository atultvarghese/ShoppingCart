var express = require('express');
var router = express.Router();
var csrf= require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile',isLogedIn, function (req, res, next) {
    res.render('user/profile');
});

router.get('/logout', isLogedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
});

router.use('/', notLogedIn, function (req, res, next) {
    next();
});

router.get('/signup',function (req,res,next) {
    const messages = req.flash('error');
    res.render('user/signup',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});

});

router.post('/signup', passport.authenticate('local.signup', {
    failureRedirect:'/user/signup',
    failureFlash:true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile')
    }
});

router.get('/signin',function (req,res,next) {
    var messages = req.flash('error');
    res.render('user/signin',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signin',passport.authenticate('local.signin',{
    failureRedirect:'/user/signin',
    failureFlash:true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile')
    }
});


module.exports = router;

function isLogedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')

}

function notLogedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')

}