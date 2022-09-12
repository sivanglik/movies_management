const watchedMoviesReducer = (state = [] , action) =>{

    switch(action.type){
        case "ADD_WATCHED_MOVIE":{
            let watched = state;
            watched.push(action.payload)
            return watched;
        }
        
        default:
            return state;
    }
}

export default watchedMoviesReducer