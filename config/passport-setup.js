/* Creates by Akhitha Manjitha
   01/06/2020
   asmanjitha@gmail.com
   https://github.com/asmanjitha
 */
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../Mongoose_Schemas/UserSchema');
const AuthLogin = require('../Mongoose_Schemas/AuthLoginSchema');

passport.serializeUser((user, done) => {
    done(null, user.userID);
});

function generateUserID(userName){
    let currentTime  = new Date();
    console.log(currentTime.getMilliseconds());
    const userID = userName + currentTime.getTime().toString();
    return userID;
}

passport.use(
    new googleStrategy({
    //Options for strategy
        clientID : keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL : '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        //Check user already exists
        User.findOne({googleID : profile.id}).then((currentUser) =>{
            if(currentUser){
                //User already registered
                console.log("user is current user : ", currentUser);
                AuthLogin.findOne({});
                return done(null, currentUser);
            }else{
                //Create a new user
                const currentUser = new User({
                    userName : profile.name.givenName,
                    createdDate : new Date(),
                    firstName : profile.name.givenName,
                    lastName: profile.name.familyName,
                    email : "default email",
                    password : "default",
                    userID : generateUserID(profile.name.givenName),
                    googleID: profile.id
                }).save().then((newUser) => {
                    console.log("New user created : ",newUser);
                    return done(null, currentUser);
                });
            }
        });
    })
);


