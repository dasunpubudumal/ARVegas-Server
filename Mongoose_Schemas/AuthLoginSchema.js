/* Creates by Akhitha Manjitha
   01/06/2020
   asmanjitha@gmail.com
   https://github.com/asmanjitha
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthLoginSchema = new Schema({
    authLoginID : {
        type : String,
        required : true,
    },
    userID : {
        type : String,
    },
    deviceID : {
        type: String,
        required:true,
    },
    createdDate : {
        type: Date,
        default: Date.now()
    },
    authenticated : {
        type: Number,
        required: true
    },
    deviceIP : {
        type : String
    }

});

module.exports = AuthLogin = mongoose.model('AuthLogin', AuthLoginSchema);