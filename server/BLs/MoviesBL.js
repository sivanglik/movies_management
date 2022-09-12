const MoviesModel = require('../models/MoviesModel')
const DALs = require('../DALs/DALs')


const getMoviesFromWS =  () => {
   let movies = [];
   
   return new Promise ( (resolve,reject)=>{

        MoviesModel.find({},async function(err,data){
            if(err) 
                reject(err)
            else 
            {
                if(data.length == 0){
                    let resp = await DALs.moviesData();                      
                    resp.data.slice(0,20).map(  movie => {
                         let obj = {};
                             obj.Name = movie.name 
                             obj.Genres = movie.genres
                             obj.Image = movie.image.medium
                             obj.Premiered = movie.premiered
                             obj.Rating = movie.rating.average
                             obj.Language = movie.language
                             movies.push(obj)
                     })
                     let response  = await MoviesModel.insertMany(movies)
                     resolve(response)
                 }
                 
                 resolve(data)
            } 
            
             
             
        
    })
    
})
}


const getMovieById =  (movieId) =>{
    
  return new Promise ((resolve,reject)=>{

         MoviesModel.find({"_id" : movieId},function(err,data){
            if(err)
            reject(err)
            else
             resolve(data)
     })
    })
}

const deleteMovieById = async (movieId) =>{

    return new Promise((reject,resolve)=>{
        MoviesModel.findByIdAndDelete(movieId , async function(err){
            if(err)
                reject(err)
            
        })
    })

}
const updateMovieById = (movieId , obj) =>{

    return new Promise((reject,resolve)=>{
        MoviesModel.findByIdAndUpdate(movieId ,obj , function(err){
            if(err)
                reject(err)
            
        })
    })

}

const addNewMovie = async (obj) =>{

    return new Promise( (reject,resolve)=>{

        let newMovie = new MoviesModel({
            Name : obj.Name,
            Image : obj.Imageurl,
            Premiered : obj.Premiered,
            Rating:obj.Rating,
            Language: obj.Language,
        })
        try{
            newMovie.save(  function(err){
                if(err)
                    reject(err)
                
            })
        }
            catch{
                resolve("movie added")
            }
        
    })

}  

module.exports = {getMoviesFromWS , getMovieById , deleteMovieById , updateMovieById , addNewMovie}