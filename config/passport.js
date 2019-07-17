var passport = require('passport');
var User = require('../models/user')
var LocalStratergy = require('passport-local').Strategy;


passport.serializeUser(function (user, done) {
    done(null,user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


passport.use('local-signup',new LocalStratergy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    },function (req, email, password, done) {
    req.checkBody('email', 'invalid Email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid Password').notEmpty().isLength({min:4});
    const errors = req.validationErrors();
    if (errors) {
        let messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email':email},function (err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, {message:'Email has already taken'});
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function (err, result) {
            if (err) {
                done(err);
            }
            return done(null, newUser);
        });
    });
    }));