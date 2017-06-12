const express = require('express');
const app = express();
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const secret = process.env.SECRET;

router.get('/check-state', auth.verifyToken, (req, res) => {

  let content = {
    success: true,
    message: 'Successfully logged in'
  }
  res.send(content);

});

router.post('/register', (req, res) => {

  var reqUser = req.body;

  process.nextTick( () => {
    User.findOne({ 'name': reqUser.name }, (err, user) => {
      if(err)
        return done(err);
      if(user){
        let content = {
          success: false,
          message: 'user already exists'
        };
        res.send(content);
        return;
      } else {
        var newUser = new User();
        newUser.name = reqUser.name;
        newUser.password = newUser.generateHash(reqUser.password);
        newUser.save( (err) => {
            if( err )
                throw err;

            let token = jwt.sign(newUser, secret, {
              expiresIn : 60*60*24
            });
            let content = {
              user: newUser,
              success: true,
              message: 'You created a new user',
              token: token
            };
            res.send(content);
            return;
        })
      }
    })
  })
});

router.post('/login', (req, res) => {

  var reqUser = req.body;

  User.findOne({'name' : reqUser.name}, (err, user) => {

    if( err )
      return done(err);

    if( !user ) {
      let content = {
        success: false,
        message: 'User does not exists'
      };
      res.send(content);
      return;
    }

    if( !user.validPassword(reqUser.password) ){
      let content = {
        success: false,
        message: 'Incorrect password'
      };
      res.send(content);
      return;
    }

    let token = jwt.sign(user, secret, {
      expiresIn : 60*60*24
    });
    let content = {
      user: user,
      success: true,
      message: 'You logged in',
      token: token
    };
    res.send(content);

  })

});

module.exports = router;