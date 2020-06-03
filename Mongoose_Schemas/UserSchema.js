/* Creates by Akhitha Manjitha
   20/05/2020
   asmanjitha@gmail.com
   https://github.com/asmanjitha
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Schema

const UserSchema = new Schema({
    userID : {
        type : String,
        required : true,
    },
    userName : {
        type: String,
        required:true,
    },
    createdDate : {
        type: Date,
        default: Date.now()
    },
    firstName : {
        type: String
    },
    lastName : {
        type: String
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    googleID : {
        type : Number
    }

});

module.exports = User = mongoose.model('User', UserSchema);

