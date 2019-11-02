var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var User = require('../models/user');
var csrfProtection = csrf();
router.use(csrfProtection);


router.get('/profile', isLoggedIn, function(req, res, next){
    res.render('user/profile');
    User.find({user: req.user});
    
  });

  router.get('/logout', isLoggedIn, function(req,res,next){
    req.logout();
    res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next){
    next();
});

router.get('/signup', function(req, res, next) {
    var messages = req.flash('error');
    res.render('./user/signup', { csrfToken: req.csrfToken(), messages:messages, hasErrors: messages.length > 0});
  })
  
  router.post('/signup',passport.authenticate('local',{
    successRedirect: './profile',
    failureRedirect: './signin',
    failureFlash: true
  }));
  

  
  router.get('/signin', function(req, res, next){
    var messages = req.flash('error');
    
    res.render('./user/signin',  { csrfToken: req.csrfToken(), messages:messages,  hasErrors: messages.length > 0});
  });
  
  router.post('/signin', passport.authenticate('localIn',{
    successRedirect: './profile',
    failureRedirect: './signin',
    failureFlash: true
  }));




  module.exports = router;

  function isLoggedIn(req, res, next){
      if(req.isAuthenticated()){
          return next()
      }
      res.redirect('/');
  }

  function notLoggedIn(req, res, next){
    if(!req.isAuthenticated()){
        return next()
    }
    res.redirect('/');
}