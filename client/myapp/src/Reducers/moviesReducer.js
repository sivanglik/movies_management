const movieReducer = (state = [] , action) =>{

    switch(action.type){
        case "ADD_ALL_MOVIES":{
            return action.payload;
        }
        case "ADD_MOVIE":{
            let movies = state;
            movies.push(action.payload)
            return movies;
        }
        case "DELETE_MOVIE":{
            let movies = state.filter(movie => movie._id !== action.payload)
            console.log(movies)
            return movies
        }
        default:
            return state;
    }
}

export default movieReducer
