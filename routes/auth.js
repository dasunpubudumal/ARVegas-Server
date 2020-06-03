/* Creates by Akhitha Manjitha
   01/06/2020
   asmanjitha@gmail.com
   https://github.com/asmanjitha
 */
const router = require('express').Router();
const passport = require('passport');

const AuthLogin = require('../Mongoose_Schemas/AuthLoginSchema');

//check for authenticated users by app
router.post('/authdevice', (req,res) => {

});


//auth login
router.get('/login', (req,res) => {
    // res.send('login');
    res.render("index");
});

//Logout
router.get('/logout', (req,res) => {
    //Handle with passport
    res.send("Logging out");
});

//google login
router.post('/google', (req, res) => {
    authLogin = new AuthLogin({
        authLoginID: req.body.authLoginID,
        userID : null,
        deviceID : req.body.deviceID,
        createdDate : Date.now(),
        authenticated : 0,
        deviceIP : req.body.deviceIP
    });
    authLogin.save(function (err, auth){
        if (err){
            res.send({"status": 0, "msg":err});
            return console.error(err);
        }
        if(auth){
            res.send({"status": 1, "msg":auth});
            console.log(authLogin);
        }
    });
},
    passport.authenticate('google', {
    scope: ['profile']
}));

//Google login call back
router.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/login' }),
    function (req,res)
    {
        res.render('authenticated');
        // res.send({'status' : 1, 'msg' : 'Google authentication redirected', 'user' : req.user})
    }
);

//Skype Login
router.get('/skype', (req, res) => {
    //Handle with passport
    res.send("Skype Login");
});

//Facebook Login
router.get('/facebook', (req,res) => {
    //Handle with passport
    res.send("Facebook Login");
});


module.exports = router;