const mongoose = require('mongoose')


let MoviesSchema = new mongoose.Schema ({
    Name : String ,
    Genres : [String],
    Image : String,
    Premiered : String,
    Rating : Number,
    Language : String,
});




module.exports = mongoose.model('movies',MoviesSchema)
