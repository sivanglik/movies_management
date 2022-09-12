const mongoose = require('mongoose')


let UsersSchema = new mongoose.Schema ({
    Username : String ,
    Password : String ,
    SessionTimeOut : String,
    Permissions : [String],
    
});




module.exports = mongoose.model('users',UsersSchema)
