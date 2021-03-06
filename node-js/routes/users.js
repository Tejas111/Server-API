var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
router.use(bodyParser.json());
var authenticate = require('../authenticate');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//for the signup route


router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if(req.body.firstname)
       user.firstname = req.body.firstname;
      if(req.body.lastname)
       user.lastname = req.body.lastname;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
  });
};
    });
  });
//passing back the token once authenticated
router.post('/login', passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({_id:req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true,token:token,status: 'You are successfully logged in!'});
});

module.exports = router;
