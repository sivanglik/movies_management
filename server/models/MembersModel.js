const mongoose = require('mongoose')


let MembersModel = new mongoose.Schema ({
    Name : String ,
    Email : String ,
    City : String,
    
});



module.exports = mongoose.model('members',MembersModel)
