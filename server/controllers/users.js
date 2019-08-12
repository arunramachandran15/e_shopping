const User = require('../models/user');
const PasswordHash = require('password-hash');
const jwt = require('jwt-simple');
const Queue = require('queue-fifo');
const config = require('../config');
const friendsUtil = require('./utils/friendsUtil');
const _ = require('underscore');
const promise = require('promise');
const nextLevel = 'end';

const self = module.exports = {

  signup : (req, res) => {
      let request = req.body;
      let name = request.name;
      let password = request.password;
      let hashedPassword = PasswordHash.generate(password);
      
      User.createUser(name,hashedPassword)
      .then((user)=>{
        if(user){
          delete user.password; 
          res.json({'status':200, 'message':'ok','data':user});
        }else{
          res.json({'status':401,'error':'User not saved'});
        }
        
      }).catch((err)=>{
        res.json({"status":405, "error" : err});
      });
  },

  

  login : (req, res) => {
      let token = '';
      let valid = false;
      let loggedInUser = null;
      User.getUser(req.body.name).then((user) => {
        if(!user)
           res.json({'status':401,'error': "User not found"});
        else{
           loggedInUser = user;
           valid = PasswordHash.verify(req.body.password, user.password);   //verify password
           if(!valid){
               res.json({'status':400,'error': "Username or password wrong"});
            }else{
               delete user.password;
               token = jwt.encode(user, config.JWT_token, 'HS512');
               return User.getFriends(user.id);   //Fetch friend ist from DB and chain the promise
            }
        }
      }).then((friends) => {  //Promise from getFriends DB function
          loggedInUser.friends = friends;
          loggedInUser.token = token;
          res.json({
              'status':200,
              'message':'ok',
              'user': loggedInUser
          });

      }).catch((err) =>{
          res.json({'status':405,'error':err});
      });
  },



  listUsers : (req, res) => {
      //req.params.challenge_id;
      User.listUsers().then((users) => {
        if(!users)
          res.json({'status':401,'error': "Users not found"});
        else{
             res.json({
               'status':200,
                'message':'ok',
                'user': users
              });
        }
      }).catch((err) =>{
          res.json({'status':405,'error':err});
      });
  },

  getUserById : (req, res) => {
      let user = null;
      User.getUserById(req.params.user_id).then((dbuser) => {
        if(!dbuser)
          res.json({'status':401,'error': "User not found"});
        else{
          user = dbuser;
          return User.getFriends(user.id);  
        }
      }).then((friends)=>{
          user.friends = friends;
          console.log(user);
          res.json({
             'status':200,
             'message':'ok',
             'user': user
           });
      }).catch((err) =>{
          res.json({'status':405,'error':err});
      });
  }
};


