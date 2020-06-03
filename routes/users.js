/* Creates by Akhitha Manjitha
   20/05/2020
   asmanjitha@gmail.com
   https://github.com/asmanjitha
 */
var express = require('express');
var router = express.Router();

const User = require("../Mongoose_Schemas/UserSchema");

const fileName = "routes/users.js";

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST users listing. */
router.post('/login', function(req, res, next) {

  loginUser = new User({
    userName : req.body.userName,
    password : req.body.password
  });

  console.log(fileName, " LN 26: User login req received : " , loginUser);
  User.findOne({userName : loginUser.userName, password : loginUser.password}, function (err, user) {
    if(user){
      const response = {
        "status" : 1,
        "msg": "User login successful",
        "user" : user,
        "data" : {
          "loginTime" : new Date()
        }
      };
      console.log(fileName + " : User successfully login response sent , response : ", response );
      res.json(response);
    }else{
      const response = {
        "status" : 2,
        "msg": "User login failed",
        "error" : "Wrong email or password",
        "data" : loginUser
      };
      console.log(fileName + " : User login failed response sent , response : ", response );
      res.json(response);
    }
  })
});

function generateUserID(userName){
  let currentTime  = new Date();
  console.log(currentTime.getMilliseconds());
  const userID = userName + currentTime.getTime().toString();
  return userID;
}

router.post('/signup', function (req,res) {
  user = new User({
    userName : req.body.userName,
    email : req.body.email,
    password : req.body.password,
    createdDate : new Date(),
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    userID : generateUserID(req.body.userName)
  });

  console.log(fileName, " LN 70: User registration req received : " , user);

  User.findOne({userName : req.body.userName}, function (err, userData) {
    if (userData) {
      const response = {
        "status" : 2,
        "msg" : "User registration failed",
        "error" : "User Name already used",
        "data" : userData
      };
      console.log(fileName + " : User  sign up failed response sent , response : ", response );
      res.json()
    }
    else if (err){
      const response = {
        "status" : 2,
        "msg" : "User search error",
        "data" : err
      };
      console.log(fileName + " : User  sign up failed response sent , response : ", response );
      res.json(response)
    }
    else {
      user.save(function (err, user) {
        if (err) {
          const response = {
            "status" : 2,
            "msg": "User registration failed",
            "error" : err
          };
          console.log(fileName + " : User  sign up failed response sent , response : ", response );
          res.json(response);
          return console.error(err);
        }
        if (user) {
          const response = {
            "status" : 1,
            "msg": "User saved",
            "user" : user
          };
          console.log(fileName + " : User  sign up success response sent , response : ", response );
          res.json(response)
        }
      });
    }
  });
});

module.exports = router;
